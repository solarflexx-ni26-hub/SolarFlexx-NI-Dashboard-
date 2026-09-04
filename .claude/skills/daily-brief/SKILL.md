---
name: daily-brief
description: Run the SolarFlexx morning routine — triage the inbox, check service alerts, review the diary, and produce the daily brief for Dave and Jess. Use each weekday morning, or when someone asks "what's on today" / "run the morning routine".
---

# Daily brief

The whole morning routine in one command. Takes a few minutes and replaces about an hour of
Jess picking through the inbox.

## Order of operations

Run these in sequence. Later steps use what earlier ones found.

1. **`service-watch`** — first, always. A safety fault found at 08:05 matters more than
   anything else in this list. If it returns a P1, stop and surface it immediately before
   doing anything else.

2. **`inbox-triage`** — sort overnight mail, draft the replies, create CRM records for new
   enquiries.

3. **`scheduler`** — today's jobs and tomorrow's, gaps in the week, confirmations to send,
   recalls due.

4. **`quote-chaser`** — only on Mondays and Thursdays. Skip other days; chasing the same
   customer daily is worse than not chasing at all.

5. **`analyst`** — assemble the brief from the above plus HubSpot and Xero, and refresh the
   dashboard.

## Then

- Post the brief. Keep it to one screen on a phone.
- Refresh `dashboard/data.json`, run `node dashboard/build.mjs`, and republish the dashboard
  Artifact if one exists.
- Append the run to `docs/activity-log.md`.

## What "done" means

Jess opens the inbox and finds: drafts written and waiting, everything filed, and a list of
the four or five things that actually need a human today. Dave gets one message on his phone
that tells him the state of the business.

## Rules

- Never send an email. Drafts only.
- If a connector fails (HubSpot, Gmail, Xero, Calendar), say so in the brief and mark that
  section unavailable. Never fill a gap with yesterday's number.
- If there is genuinely nothing to report in a section, say "nothing" — do not pad it.
