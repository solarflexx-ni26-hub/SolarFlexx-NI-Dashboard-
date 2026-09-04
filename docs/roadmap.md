# Roadmap

Ordered by return, not by effort.

## Now — stop the leak

- Work the £45,245 of June proposals to a yes or a recorded no.
- Re-date every open deal.
- Run `/daily-brief` every morning until it is habit.
- Record lost reasons from here on. Every one.

## Next — make the recurring business real

This is the strategic move. Installation revenue is lumpy, competitive and dependent on
constant lead generation. Cleaning and health checks are predictable, high margin, and they
keep us in front of the customer — which is where battery retrofits, EV chargers and
referrals come from.

**Add a second HubSpot pipeline: `Maintenance & Aftercare`**

| Stage | Meaning |
|---|---|
| Due | Recall date reached |
| Contacted | Customer approached |
| Booked | In the diary |
| Completed | Job done, report issued |
| Declined | Said no — with a reason |

Then:

1. **Backfill every past install** as a customer record with an install date, system spec and
   inverter serial. Without this the recall engine has nothing to work from.
2. **Create a recall task at handover** on every new install — clean at 12 months, health
   check at 12 months. `scheduler` already does this for jobs it books.
3. **Route cleans geographically.** A day of six cleans in one town beats three scattered
   across the province. `scheduler` flags zig-zag days.
4. **Sell the health check as a product**, not a favour — see the defined scope in
   `brand/services.md`. A written report with photos is what makes it worth paying for.

Target worth measuring: recurring revenue as a share of total, tracked monthly in
`/weekly-review`. If it is not growing, the strategy is not happening.

## Then — measurement worth trusting

- Lead source on every contact, and enquiries-by-source in the weekly review.
- Time-to-first-response on enquiries. In domestic solar this predicts win rate more than
  almost anything else. Target: under one working hour.
- Conversion at each stage: enquiry→survey, survey→proposal, proposal→won.
- Generation data before and after cleans.
- Referral tracking — several current deals came from referrals (`R Crooks`, `DQuinn`), which
  suggests word of mouth is already the strongest channel. It is completely unmanaged. A
  deliberate referral ask after every install is close to free revenue.

## Later — worth considering, not yet

- **Web form → HubSpot → agent** so enquiries arrive structured instead of as prose.
- **Photo intake from the van.** Install photos into Drive against the deal, feeding
  `content-studio` and the health check record.
- **Customer portal or scheduled report** — an annual "here's what your system did" email.
  Enormous retention value, cheap to produce once generation data is being kept.
- **Xero ↔ HubSpot reconciliation** on a schedule, so won-but-uninvoiced cannot happen.
- **WhatsApp**, if that is where customers actually are in NI. Worth checking before building
  anything for it.

## Deliberately not doing

- Auto-sending customer email. The cost of one bad automated reply outweighs the time saved.
- Auto-publishing social or newsletters. Same reason.
- AI-written testimonials or case studies without the customer's written permission.
- Chasing volume in the CRM for its own sake. Ten accurate deals beat a hundred stale ones.
