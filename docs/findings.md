# What the data showed — 22/08/2026

Read this before anything else. It is the baseline the AI team was designed around, taken
from live HubSpot, Gmail and Google Calendar queries on the day of setup. Nothing here is
estimated.

## The headline

**£45,245 of proposals had been sitting unanswered for 64 days.**

Three proposals went out on 19 June 2026 — Alamuskin Community Centre (£27,995), Jamesy
McCreesh (£8,750) and Steven Hamill (£8,500). There is no follow-up recorded against any of
them. That is not a sales problem, it is a process problem, and it is the most recoverable
money in the business. Some of it is probably gone. Some of it is almost certainly still
winnable with a phone call.

This single fact justifies the whole exercise.

## The pipeline

| Stage | Deals | Value |
|---|---|---|
| Pre Qualified Before Survey | 2 | £18,500 |
| Qualified To Buy | 0 | £0 |
| Survey Visit Scheduled | 1 | £10,450 |
| Proposal Sent | 3 | £45,245 |
| **Open total** | **6** | **£74,195** |
| Won | 4 | £45,795 |
| Closed Lost | 0 | £0 |

Ten deals ever. Eight contacts. Average deal £11,999. Every deal owned by Dave.

## Six things that are wrong

**1. Every open deal is overdue.** All six carry a close date of 30/06/2026, already in the
past. When everything is overdue, the pipeline stops working as a forecast and people stop
looking at it — which is exactly what appears to have happened.

**2. Nothing has been created since 19 June.** No deal, no contact, in 64 days. Either
enquiries genuinely stopped over the summer, or work is happening outside the CRM and is
invisible. These need completely different responses, and nobody can currently tell which it
is. **This is the first question to answer.**

**3. Nothing is ever marked Closed Lost.** Four won, zero lost. That makes the win rate read
as 100%, which is false, and it means we have no record of *why* we lose. Price? Timing? A
competitor? No response? Without lost reasons there is no way to improve the quote or the
follow-up, and any conversion reporting is fiction. The `analyst` agent is instructed to
report win rate as *unmeasurable* until this is fixed.

**4. Two deals have been open since 5 April** — 139 days. One is a survey that was scheduled
and either never happened or never turned into a quote. That is a process failure, not a
customer who went quiet.

**5. The inbox has 333 unread messages out of 452.** It is a mixed personal and business
Gmail, and the overwhelming majority of the volume is retail promotion — Uber Eats, TikTok,
Google Pixel, KFC. Buried in it: **SolisCloud "Device abnormal offline" alerts** (a customer
system that has stopped reporting) and an outstanding IONOS invoice reminder. Real signal is
being lost in noise, which is precisely the failure mode that costs customers.

**6. Recurring revenue is invisible.** Cleaning, annual health checks and maintenance — the
services described as the strategic differentiator — have no pipeline, no object and no
records in HubSpot at all. The highest-margin, most defensible part of the business is the
part nobody can measure.

## Smaller things worth fixing

- **Calendar timezone is UTC**, should be Europe/London. Bookings will drift an hour through
  British Summer Time.
- **Deal names are free text** and one is blank. Reporting on them is unreliable.
- **Lead source is not recorded anywhere.** Nobody can say which marketing works, so nobody
  can say where to spend the next £500.
- **Inverter serial numbers are not on deals**, so a monitoring alert cannot be matched to
  the customer it belongs to.
- **Jess has no HubSpot seat.** Every record is owned by Dave.

## What this means for the design

The agents are not built to be impressive. They are built against these six failures:

| Failure | Agent |
|---|---|
| Forgotten proposals, dead pipeline data | `quote-chaser` |
| Signal buried in a 333-message inbox | `inbox-triage` |
| Monitoring alerts nobody reads | `service-watch` |
| Recurring revenue with no process | `scheduler` (recalls) |
| Nobody in front of past customers | `content-studio` |
| Numbers nobody can trust | `analyst` |

## The honest caveat

Ten deals is a very small sample. Do not read trends into it, and be sceptical of any
percentage calculated on it. The correct response to this data is not a dashboard full of
confident graphs — it is to start recording things properly so that in three months there is
something real to measure. The `analyst` agent is instructed to keep saying so until that
changes.
