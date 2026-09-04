# SOP — service, cleaning and health checks

## Reactive service

| # | Step | Owner | Target | AI |
|---|---|---|---|---|
| 1 | Fault reported, or monitoring alert received | — | — | `service-watch` catches both |
| 2 | Graded P1–P4 | Jess | Within 1 hour of arrival | `service-watch` proposes the grade |
| 3 | Ticket raised, linked to contact + original deal | Jess | Same day | `service-watch` |
| 4 | Customer contacted | Jess | P1 immediately by phone · P2 same day · P3 within 2 days | Draft prepared |
| 5 | Visit booked | Jess | P1 immediately · P2 within 2 working days · P3 within 10 | `scheduler` |
| 6 | Attended and diagnosed | Dave/engineer | As booked | — |
| 7 | Warranty position established before any promise | Dave | Before quoting | `service-watch` flags install age |
| 8 | Fixed, or parts ordered with a date given to the customer | Dave | — | — |
| 9 | Ticket closed with the cause recorded | Jess | Same day | — |
| 10 | Follow-up: is it working properly? | Jess | 1 week later | Task created |

### Grades

| Grade | Meaning | Contact | Attend |
|---|---|---|---|
| **P1** | Safety — burning, scorching, water ingress, arcing, repeated RCD trips, storm damage | Phone immediately. Tell them to isolate at the AC isolator | Same day |
| **P2** | Total loss of generation | Same day | Within 2 working days |
| **P3** | Degraded — one string, reduced output, battery not cycling, optimiser fault | Within 2 working days | Within 10 |
| **P4** | Cosmetic — app issues, comms dropouts that self-clear, questions about readings | Explanatory reply | Only if it recurs |

**A comms dropout is not a dead inverter.** SolisCloud sends offline warnings for wifi
dropouts routinely. Check whether it cleared before alarming anyone — but three dropouts in a
month is a real fault, usually the router or the dongle.

## Cleaning

| # | Step | Owner | AI |
|---|---|---|---|
| 1 | Recall date reached (6–12 months by site) | — | `scheduler` surfaces it |
| 2 | Recall email drafted with a site-specific reason | Jess | `clean-recall.md` template |
| 3 | Booked, grouped with others in the same area | Jess | `scheduler` routes |
| 4 | Generation reading recorded **before** | Engineer | — |
| 5 | Cleaned — pole-fed, deionised, no detergents | Engineer | — |
| 6 | Generation reading recorded **after** | Engineer | — |
| 7 | Photos taken before and after | Engineer | Feeds `content-studio` |
| 8 | Job logged, next recall dated | Jess | `scheduler` |

Steps 4 and 6 are two numbers and thirty seconds. Within a year they become the only honest
answer to "does cleaning actually make a difference?" — and the best marketing the business
has.

## Annual health check

Scope is defined in `brand/services.md`. Non-negotiables:

- It produces a **written report with photos**. That is what makes it a product rather than a
  favour, and what justifies the price.
- Faults found are quoted separately and honestly — the check is not a pretext for finding
  work.
- If the system is fine, say so plainly. "Everything's grand, see you next year" is what
  earns the next booking.
- The next recall is dated before leaving site.
