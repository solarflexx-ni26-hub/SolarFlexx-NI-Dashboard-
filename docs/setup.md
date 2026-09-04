# Setup — what a human needs to do

The agents work now, but several things need a person. Roughly in order of value.

## Do first (today)

**1. Phone the three June proposals.** Alamuskin Community Centre (£27,995), Jamesy McCreesh
(£8,750), Steven Hamill (£8,500). Sixty-four days is a long time but not always fatal, and a
call beats the email drafts. Whatever the outcome, **record it** — including a loss, with a
reason.

**2. Fix the calendar timezone.** Google Calendar → Settings → Time zone → **(GMT+00:00)
Dublin, Edinburgh, Lisbon, London**. It is currently UTC, which is an hour out for most of
the year. Until it is changed, `scheduler` passes `Europe/London` explicitly on every call.

**3. Re-date the six open deals.** They all say 30/06/2026. Give each a date you would
actually bet on.

## Do this week

**4. Give Jess a HubSpot seat** and set her as owner on new leads. Right now every record
belongs to Dave, which makes workload invisible.

**5. Decide the email split.** `solarflexgroup26@gmail.com` is carrying personal and business
mail together. Options, best first:

- **Separate business address** (`info@solarflexx…` on the existing domain) for all customer
  contact, and let the AI team work only on that. Cleanest, and it looks more professional
  on a quote.
- **Keep one inbox** and let `inbox-triage` label everything. Workable, but every agent sees
  personal mail, and the `SF/Personal` rule is a policy rather than a wall.

Recommend the first. It costs nothing and it is the single biggest improvement to how the
whole system behaves.

**6. Unsubscribe from the worst offenders.** Uber Eats, TikTok, Google Pixel, KFC, Amazon
promotions. `inbox-triage` will file them, but not receiving them is better than filing them.
An agent will not unsubscribe on your behalf — that is your call.

**7. Fill in the `CONFIRM` gaps** in `brand/services.md` and `brand/faq.md`. Cleaning prices,
health check price, call-out charge, travel policy, warranty terms, accreditations, insurance,
export options, current VAT position. **Until these are filled in, agents will not quote them
— they will write "Dave will confirm", which is correct but slow.** This is an hour of work
that pays back every day.

## Do this month

**8. Add a maintenance pipeline in HubSpot.** See `docs/roadmap.md` — this is how recurring
revenue becomes visible.

**9. Turn on lost reasons.** Make `closed_lost_reason` required on the Closed Lost stage.

**10. Add a lead source property** and make it required at contact creation. Web, Facebook,
referral, Google, repeat, van, sign, other.

**11. Add an inverter serial + monitoring platform field** to deals, and backfill the won
ones. This is what lets `service-watch` match an alert to a customer.

**12. Record generation figures before and after a clean.** Two numbers per job. Within a
year it becomes the most persuasive marketing asset the business has, and the only honest
answer to "does cleaning actually do anything?"

## Running it

```bash
claude
> /daily-brief        # morning
> /weekly-review      # Friday
> /new-enquiry        # a lead comes in
```

To have the daily brief run itself, ask Claude to set up a scheduled routine — weekday
mornings around 07:30.

## Safety

`.claude/settings.json` **denies** Gmail send, reply and forward outright. Agents create
drafts. If someone later decides a particular template is safe to send automatically, that
decision gets written into `docs/autosend-approvals.md` with Dave's sign-off, and the
permission is changed deliberately. Do not loosen it casually — one wrong automated email to
a customer costs more than every hour this saves.
