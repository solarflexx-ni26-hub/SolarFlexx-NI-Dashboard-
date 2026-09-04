# SolarFlexx NI — AI Operations Team

An AI team that supports Jess in the SolarFlexx NI office: it sorts the inbox, drafts every
reply, keeps HubSpot honest, books the diary, catches system faults before customers notice,
writes the newsletter and social content, and reports the numbers each morning and each
Friday.

**It drafts. Humans send.** That is enforced in `.claude/settings.json`, not just promised —
Gmail's send, reply and forward tools are denied outright, so an agent physically cannot
email a customer.

## Quick start

```bash
claude                 # in this directory
> /daily-brief         # the whole morning routine
> /weekly-review       # Friday afternoon
> /new-enquiry         # process a lead end to end
```

Or call an agent directly: *"use quote-chaser to work the pipeline"*.

## What's here

```
CLAUDE.md                  Business context — loaded automatically every session
.claude/agents/            The six agents
.claude/skills/            The three routines (/daily-brief, /weekly-review, /new-enquiry)
.claude/settings.json      Permissions — what agents may and may not do
brand/                     Voice, service catalogue, FAQ, email/social/newsletter templates
dashboard/                 The operations dashboard (data.json → build.mjs → index.html)
docs/                      Setup, findings, SOPs, roadmap, activity log
```

## The team

| Agent | What it does | When |
|---|---|---|
| `inbox-triage` | Sorts the inbox, drafts replies, creates CRM records from enquiries | 3× daily |
| `quote-chaser` | Chases proposals on a 2/7/14/21-day ladder; fixes CRM data | Mon & Thu |
| `scheduler` | Books surveys, installs, cleans, health checks; confirmations and recalls | Daily |
| `service-watch` | Catches inverter faults from monitoring alerts; grades P1–P4 | Daily |
| `content-studio` | Newsletter, blog, social — drafted, never auto-published | Monthly / fortnightly |
| `analyst` | Daily brief, weekly review, sales tracking, dashboard | Daily & Friday |

## Connected

HubSpot (portal 147795922) · Gmail (`solarflexgroup26@gmail.com`) · Google Calendar ·
Google Drive · Xero.

## The dashboard

```bash
node dashboard/build.mjs      # regenerates index.html from data.json
```

`dashboard/data.json` holds the figures; `analyst` refreshes it from live HubSpot, Xero and
Calendar queries. `dashboard/index.html` is generated output and is not committed — run the
build once, then open it locally or publish it as an Artifact so Dave and Jess can pull it
up on a phone.

## Start here

Read **`docs/findings.md`** first. It is the state of the business as the data actually
showed it on 22/08/2026, and it is why the agents are built the way they are.

Then **`docs/setup.md`** — the handful of things a human has to do before the team can work
at full strength.
