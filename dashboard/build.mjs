#!/usr/bin/env node
// Regenerates dashboard/index.html from dashboard/data.json.
// Run:  node dashboard/build.mjs
// The analyst agent refreshes data.json, then runs this.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const d = JSON.parse(readFileSync(join(here, "data.json"), "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const gbp = (n) => "£" + Number(n).toLocaleString("en-GB");

/* ---------- alerts ---------- */
const alerts = d.alerts
  .map(
    (a) => `
      <article class="alert alert--${esc(a.level)}">
        <p class="alert__tag">${a.level === "critical" ? "Critical" : "Watch"}</p>
        <div class="alert__body">
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.detail)}</p>
          <p class="alert__do"><span aria-hidden="true">→</span> ${esc(a.action)}</p>
        </div>
      </article>`
  )
  .join("");

/* ---------- kpis ---------- */
const kpis = d.kpis
  .map(
    (k) => `
      <div class="kpi">
        <p class="kpi__label">${esc(k.label)}</p>
        <p class="kpi__value kpi__value--${esc(k.tone)}">${k.format === "gbp" ? gbp(k.value) : esc(k.value)}</p>
        <p class="kpi__sub">${esc(k.sub)}</p>
      </div>`
  )
  .join("");

/* ---------- pipeline funnel: single-hue sequential, stage order is ordinal ---------- */
const openTotal = d.pipeline.reduce((s, p) => s + p.value, 0);
const maxStage = Math.max(...d.pipeline.map((p) => p.value), 1);
const funnel = d.pipeline
  .map((p, i) => {
    const pct = openTotal ? Math.round((p.value / openTotal) * 100) : 0;
    return `
      <div class="bar" tabindex="0"
           data-tip="${esc(p.stage)} — ${p.count} deal${p.count === 1 ? "" : "s"}, ${gbp(p.value)}${openTotal ? ` · ${pct}% of open pipeline` : ""}">
        <div class="bar__head">
          <span class="bar__name">${esc(p.stage)}</span>
          <span class="bar__num">${p.count === 0 ? "—" : `${p.count} · ${gbp(p.value)}`}</span>
        </div>
        <div class="bar__track">
          <div class="bar__fill bar__fill--${i}" style="width:${Math.max((p.value / maxStage) * 100, p.value ? 1.5 : 0)}%"></div>
        </div>
      </div>`;
  })
  .join("");

/* ---------- deals ---------- */
const ageClass = (n) => (n >= 90 ? "stale" : n >= 30 ? "ageing" : "fresh");
const ageWord = (n) => (n >= 90 ? "Stale" : n >= 30 ? "Ageing" : "Fresh");
const deals = d.deals
  .map(
    (x) => `
      <tr>
        <td class="t-name">${esc(x.name)}</td>
        <td class="t-num">${gbp(x.value)}</td>
        <td>${esc(x.stage)}</td>
        <td class="t-num">${esc(x.created)}</td>
        <td><span class="chip chip--${ageClass(x.age_days)}">${ageWord(x.age_days)} · ${x.age_days}d</span></td>
      </tr>`
  )
  .join("");

/* ---------- data health ---------- */
const health = d.data_health
  .map(
    (h) => `
      <tr>
        <td class="t-name">${esc(h.item)}</td>
        <td><span class="chip chip--${h.status === "broken" ? "stale" : h.status === "missing" ? "ageing" : "fresh"}">${esc(h.status)}</span></td>
        <td>${esc(h.detail)}</td>
      </tr>`
  )
  .join("");

/* ---------- team ---------- */
const team = d.team
  .map(
    (t) => `
      <article class="agent">
        <p class="agent__name">${esc(t.name)}</p>
        <p class="agent__role">${esc(t.role)}</p>
        <p class="agent__meta"><span class="agent__cadence">${esc(t.cadence)}</span><span>${esc(t.handles)}</span></p>
      </article>`
  )
  .join("");

const html = `<title>SolarFlexx NI Operations</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=IBM+Plex+Mono:wght@500;600&family=Source+Sans+3:wght@400;600&display=swap">
<style>
:root{
  --ground:#EEF0F2; --surface:#FFFFFF; --surface-2:#F7F8FA; --line:#DCE1E6;
  --ink:#161A1E; --ink-2:#525D68; --ink-3:#7C8792;
  --accent:#B4600F; --accent-soft:#F6E7D6;
  --good:#008A78; --good-soft:#DDF0EC;
  --crit:#A8322A; --crit-soft:#F7E1DF;
  --seq-0:#EBC79B; --seq-1:#DCA365; --seq-2:#C9822F; --seq-3:#B4600F;
  --shadow:0 1px 2px rgba(20,26,32,.06), 0 6px 16px -10px rgba(20,26,32,.22);
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --ground:#0E1114; --surface:#171B20; --surface-2:#1D2228; --line:#282F36;
    --ink:#E8ECEF; --ink-2:#9BA6B0; --ink-3:#6E7982;
    --accent:#C87B2B; --accent-soft:#3A2713;
    --good:#22A797; --good-soft:#0D2B27;
    --crit:#D8635A; --crit-soft:#33191A;
    --seq-0:#6B4A22; --seq-1:#96662A; --seq-2:#B4772E; --seq-3:#D89347;
    --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 20px -12px rgba(0,0,0,.7);
  }
}
:root[data-theme="dark"]{
  --ground:#0E1114; --surface:#171B20; --surface-2:#1D2228; --line:#282F36;
  --ink:#E8ECEF; --ink-2:#9BA6B0; --ink-3:#6E7982;
  --accent:#C87B2B; --accent-soft:#3A2713;
  --good:#22A797; --good-soft:#0D2B27;
  --crit:#D8635A; --crit-soft:#33191A;
  --seq-0:#6B4A22; --seq-1:#96662A; --seq-2:#B4772E; --seq-3:#D89347;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 20px -12px rgba(0,0,0,.7);
}

*{box-sizing:border-box}
body{
  margin:0; background:var(--ground); color:var(--ink);
  font-family:"Source Sans 3",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
  font-size:16px; line-height:1.55; -webkit-font-smoothing:antialiased;
}
.wrap{max-width:1120px; margin:0 auto; padding:28px 20px 72px; display:flex; flex-direction:column; gap:34px}
h1,h2,h3{font-family:Archivo,ui-sans-serif,system-ui,sans-serif; margin:0; text-wrap:balance; letter-spacing:-.012em}
.mono{font-family:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace; font-variant-numeric:tabular-nums}

/* header */
.head{display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:16px;
      border-bottom:2px solid var(--ink); padding-bottom:14px}
.head h1{font-size:clamp(1.5rem,1.1rem + 1.6vw,2rem); font-weight:700; line-height:1.1}
.head h1 span{color:var(--accent)}
.head__sub{margin:5px 0 0; color:var(--ink-2); font-size:.94rem}
.head__meta{text-align:right; font-size:.76rem; color:var(--ink-3); font-family:"IBM Plex Mono",ui-monospace,monospace}
.head__meta b{display:block; color:var(--ink-2); font-weight:600; letter-spacing:.02em}

.sec{display:flex; flex-direction:column; gap:14px}
.sec__title{display:flex; align-items:baseline; gap:12px}
.sec__title h2{font-size:.78rem; font-weight:700; text-transform:uppercase; letter-spacing:.11em; color:var(--ink-2)}
.sec__title .rule{flex:1; height:1px; background:var(--line)}
.sec__note{margin:0; font-size:.86rem; color:var(--ink-3); max-width:68ch}

/* alerts */
.alerts{display:flex; flex-direction:column; gap:10px}
.alert{display:flex; gap:14px; background:var(--surface); border:1px solid var(--line);
       border-left:4px solid var(--accent); border-radius:3px; padding:14px 16px; box-shadow:var(--shadow)}
.alert--critical{border-left-color:var(--crit)}
.alert__tag{margin:2px 0 0; flex:0 0 66px; font-family:"IBM Plex Mono",ui-monospace,monospace;
            font-size:.68rem; font-weight:600; text-transform:uppercase; letter-spacing:.09em; color:var(--accent)}
.alert--critical .alert__tag{color:var(--crit)}
.alert__body{flex:1; min-width:0}
.alert__body h3{font-size:1.02rem; font-weight:600; line-height:1.3}
.alert__body p{margin:5px 0 0; font-size:.91rem; color:var(--ink-2)}
.alert__do{color:var(--ink)!important; font-weight:600}
.alert__do span{color:var(--accent)}

/* kpis */
.kpis{display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px}
.kpi{background:var(--surface); border:1px solid var(--line); border-radius:3px; padding:16px 18px; box-shadow:var(--shadow)}
.kpi__label{margin:0; font-size:.72rem; font-weight:600; text-transform:uppercase; letter-spacing:.09em; color:var(--ink-3)}
.kpi__value{margin:8px 0 0; font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums;
            font-size:clamp(1.55rem,1.2rem + 1.3vw,2.05rem); font-weight:600; line-height:1; letter-spacing:-.02em}
.kpi__value--critical{color:var(--crit)}
.kpi__value--good{color:var(--good)}
.kpi__sub{margin:7px 0 0; font-size:.83rem; color:var(--ink-2)}

/* two column */
.cols{display:grid; grid-template-columns:1.55fr 1fr; gap:22px; align-items:start}
@media (max-width:860px){.cols{grid-template-columns:1fr}}
.col{display:flex; flex-direction:column; gap:22px; min-width:0}

.card{background:var(--surface); border:1px solid var(--line); border-radius:3px; padding:18px; box-shadow:var(--shadow)}
.card h3{font-size:.95rem; font-weight:600; margin-bottom:4px}
.card__note{margin:8px 0 0; font-size:.84rem; color:var(--ink-3)}

/* funnel */
.bars{display:flex; flex-direction:column; gap:13px; margin-top:14px}
.bar{cursor:default; outline:none}
.bar:focus-visible{outline:2px solid var(--accent); outline-offset:3px; border-radius:2px}
.bar__head{display:flex; justify-content:space-between; align-items:baseline; gap:10px; margin-bottom:5px}
.bar__name{font-size:.88rem; color:var(--ink-2)}
.bar__num{font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums;
          font-size:.83rem; font-weight:600; color:var(--ink); white-space:nowrap}
.bar__track{height:11px; background:var(--surface-2); border:1px solid var(--line); border-radius:2px; overflow:hidden}
.bar__fill{height:100%; border-radius:0 3px 3px 0; transition:opacity .12s}
.bar__fill--0{background:var(--seq-0)} .bar__fill--1{background:var(--seq-1)}
.bar__fill--2{background:var(--seq-2)} .bar__fill--3{background:var(--seq-3)}
.bar:hover .bar__fill,.bar:focus-visible .bar__fill{opacity:.78}

/* tables */
.scroll{overflow-x:auto; margin-top:12px; -webkit-overflow-scrolling:touch}
table{width:100%; border-collapse:collapse; font-size:.87rem; min-width:520px}
th{text-align:left; font-family:"IBM Plex Mono",ui-monospace,monospace; font-size:.68rem; font-weight:600;
   text-transform:uppercase; letter-spacing:.08em; color:var(--ink-3);
   padding:0 10px 7px 0; border-bottom:1px solid var(--line); white-space:nowrap}
td{padding:9px 10px 9px 0; border-bottom:1px solid var(--line); color:var(--ink-2); vertical-align:top}
tr:last-child td{border-bottom:none}
.t-name{color:var(--ink); font-weight:600}
.t-num{font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums; white-space:nowrap; color:var(--ink)}

.chip{display:inline-block; font-family:"IBM Plex Mono",ui-monospace,monospace; font-size:.68rem; font-weight:600;
      padding:2px 7px; border-radius:2px; white-space:nowrap; text-transform:capitalize; border:1px solid transparent}
.chip--fresh{background:var(--good-soft); color:var(--good); border-color:var(--good)}
.chip--ageing{background:var(--accent-soft); color:var(--accent); border-color:var(--accent)}
.chip--stale{background:var(--crit-soft); color:var(--crit); border-color:var(--crit)}

/* stat rows */
.rows{display:flex; flex-direction:column; gap:0; margin-top:10px}
.row{display:flex; justify-content:space-between; align-items:baseline; gap:12px; padding:8px 0; border-bottom:1px solid var(--line)}
.row:last-child{border-bottom:none}
.row span:first-child{font-size:.87rem; color:var(--ink-2)}
.row b{font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums; font-weight:600; font-size:.95rem}
.row b.crit{color:var(--crit)} .row b.good{color:var(--good)}

/* team */
.agents{display:grid; grid-template-columns:repeat(auto-fit,minmax(258px,1fr)); gap:12px}
.agent{background:var(--surface); border:1px solid var(--line); border-radius:3px; padding:15px 16px; box-shadow:var(--shadow)}
.agent__name{margin:0; font-family:"IBM Plex Mono",ui-monospace,monospace; font-size:.88rem; font-weight:600; color:var(--accent)}
.agent__role{margin:7px 0 0; font-size:.87rem; color:var(--ink-2)}
.agent__meta{margin:11px 0 0; display:flex; flex-wrap:wrap; gap:8px; font-size:.72rem; color:var(--ink-3);
             font-family:"IBM Plex Mono",ui-monospace,monospace}
.agent__cadence{border:1px solid var(--line); border-radius:2px; padding:1px 6px; color:var(--ink-2)}

/* tooltip */
#tip{position:fixed; z-index:50; pointer-events:none; opacity:0; transition:opacity .1s;
     background:var(--ink); color:var(--ground); font-size:.78rem; padding:6px 9px; border-radius:3px;
     max-width:280px; box-shadow:0 4px 14px rgba(0,0,0,.3)}
#tip.on{opacity:1}

footer{border-top:1px solid var(--line); padding-top:16px; font-size:.83rem; color:var(--ink-3)}
footer code{font-family:"IBM Plex Mono",ui-monospace,monospace; background:var(--surface-2);
            border:1px solid var(--line); border-radius:2px; padding:1px 5px; font-size:.9em; color:var(--ink-2)}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>

<div class="wrap">

  <header class="head">
    <div>
      <h1>SolarFlexx <span>NI</span> Operations</h1>
      <p class="head__sub">What the AI team is watching — pipeline, inbox, service and the diary.</p>
    </div>
    <div class="head__meta">
      <b>Refreshed ${esc(d.meta.generated_label)}</b>
      ${d.meta.sources.map(esc).join(" · ")}
    </div>
  </header>

  <section class="sec">
    <div class="sec__title"><h2>Needs attention</h2><div class="rule"></div></div>
    <div class="alerts">${alerts}</div>
  </section>

  <section class="sec">
    <div class="sec__title"><h2>Sales</h2><div class="rule"></div></div>
    <div class="kpis">${kpis}</div>
  </section>

  <div class="cols">
    <div class="col">
      <section class="card">
        <h3>Open pipeline by stage</h3>
        <p class="card__note">Shaded by stage progression. ${gbp(openTotal)} open in total.</p>
        <div class="bars">${funnel}</div>
      </section>

      <section class="card">
        <h3>Open deals</h3>
        <p class="card__note">Age is days since the deal was created. Nothing here has moved since June.</p>
        <div class="scroll">
          <table>
            <thead><tr><th>Deal</th><th>Value</th><th>Stage</th><th>Created</th><th>Age</th></tr></thead>
            <tbody>${deals}</tbody>
          </table>
        </div>
      </section>
    </div>

    <div class="col">
      <section class="card">
        <h3>Inbox</h3>
        <div class="rows">
          <div class="row"><span>Total in inbox</span><b>${d.inbox.total}</b></div>
          <div class="row"><span>Unread</span><b class="crit">${d.inbox.unread}</b></div>
          <div class="row"><span>Unread &amp; flagged important</span><b>${d.inbox.important_unread}</b></div>
          <div class="row"><span>Drafts waiting to send</span><b>${d.inbox.drafts_waiting}</b></div>
        </div>
        <p class="card__note">${d.inbox.labelled ? "Triage labels in place." : "No triage labels yet — run inbox-triage to sort and draft."}</p>
      </section>

      <section class="card">
        <h3>Service</h3>
        <div class="rows">
          <div class="row"><span>Open tickets</span><b>${d.service.open_tickets}</b></div>
          <div class="row"><span>Monitoring alerts, 7 days</span><b>${d.service.monitoring_alerts_7d}</b></div>
          <div class="row"><span>Systems offline</span><b>${esc(d.service.systems_offline)}</b></div>
        </div>
        <p class="card__note">${esc(d.service.note)}</p>
      </section>

      <section class="card">
        <h3>Recurring revenue</h3>
        <div class="rows">
          <div class="row"><span>Cleans, 12 months</span><b>${d.recurring.cleans_12m}</b></div>
          <div class="row"><span>Health checks, 12 months</span><b>${d.recurring.health_checks_12m}</b></div>
          <div class="row"><span>Recalls due</span><b>${d.recurring.recalls_due}</b></div>
        </div>
        <p class="card__note">${esc(d.recurring.note)}</p>
      </section>
    </div>
  </div>

  <section class="sec">
    <div class="sec__title"><h2>Data health</h2><div class="rule"></div></div>
    <p class="sec__note">Numbers are only worth as much as what feeds them. These are the gaps that make the
      figures above less trustworthy than they look — fixing them is the fastest win available.</p>
    <div class="card">
      <div class="scroll">
        <table>
          <thead><tr><th>What</th><th>State</th><th>Why it matters</th></tr></thead>
          <tbody>${health}</tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec__title"><h2>The AI team</h2><div class="rule"></div></div>
    <p class="sec__note">Six agents supporting Jess in the office. Every one of them drafts and proposes —
      none of them sends an email, publishes a post or closes a deal without a human pressing the button.</p>
    <div class="agents">${team}</div>
  </section>

  <footer>
    ${esc(d.meta.note)} Refresh with <code>node dashboard/build.mjs</code> after the analyst agent
    updates <code>dashboard/data.json</code>.
  </footer>
</div>

<div id="tip" role="status"></div>
<script>
(function(){
  var tip=document.getElementById("tip");
  function show(e,t){tip.textContent=t;tip.classList.add("on");move(e);}
  function move(e){
    var x=(e.clientX||0)+14, y=(e.clientY||0)+16, r=tip.getBoundingClientRect();
    if(x+r.width>innerWidth-8)x=innerWidth-r.width-8;
    if(y+r.height>innerHeight-8)y=(e.clientY||0)-r.height-10;
    tip.style.left=x+"px";tip.style.top=y+"px";
  }
  function hide(){tip.classList.remove("on");}
  document.querySelectorAll("[data-tip]").forEach(function(el){
    el.addEventListener("mouseenter",function(e){show(e,el.dataset.tip);});
    el.addEventListener("mousemove",move);
    el.addEventListener("mouseleave",hide);
    el.addEventListener("focus",function(){
      var r=el.getBoundingClientRect();
      show({clientX:r.left+r.width/2,clientY:r.top},el.dataset.tip);
    });
    el.addEventListener("blur",hide);
  });
})();
</script>
`;

writeFileSync(join(here, "index.html"), html);
console.log("dashboard/index.html written — " + html.length + " bytes");
