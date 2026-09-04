---
name: new-enquiry
description: Process a new customer enquiry end to end — create the CRM records, draft the reply, and get a survey in the diary. Use when a lead comes in by email, phone, web form or social.
---

# New enquiry

The single most important process in the business. Speed of response is the biggest
predictor of winning a domestic solar job — the installer who replies within the hour
usually gets the survey.

**Target: first response within one working hour.**

## What you need

Name, contact details, address/postcode, what they are asking for, and where they came from.
If the enquiry is a phone message, take these from Jess's note. If anything is missing, the
reply asks for it — do not stall the whole process waiting.

## Steps

1. **Check for duplicates.** Search HubSpot contacts by email, then by surname, then by
   postcode. Existing customer? This is an upsell or a service job, not a new lead — say so.

2. **Create the CONTACT.** Name, email, phone, address, postcode. `lifecyclestage` = `lead`.
   Record the **source** — web form, Facebook, referral, Google, repeat, sign, van. We are
   currently not tracking source, and it means nobody knows which marketing works. Start.

3. **Create the DEAL.** Pipeline `default`, stage `5050248404` (Pre Qualified Before Survey).
   - Name: `Surname, First — Postcode — Service` e.g. `McCreesh, James — BT35 — PV + Battery`
   - `amount`: only if there is a real basis. Otherwise blank, not a guess.
   - `closedate`: 30 days out for domestic, 60 for commercial. **Never a past date.**
   - Associate to the contact.

4. **Add a NOTE** with the enquiry in their own words, plus anything Jess picked up on the
   phone. Future-you will want this.

5. **Draft the reply** from `brand/templates/email/new-enquiry-reply.md`. Answer their actual
   question, give an indicative band from `brand/services.md`, and offer **two specific
   survey slots** checked against the real calendar. Save as a Gmail draft — never send.

6. **Create a TASK** for Jess: "Call {name} — new enquiry", due today or next working day.
   Email gets you on the list; the phone call gets you the survey.

7. **Pencil the survey** if the customer has already said yes to a time — `scheduler` books
   it properly with the address and phone in the description.

## Qualifying — ask these at first contact

- Do they own the property? (Tenants and pending sales are not leads yet.)
- Roof: type, age, orientation, shading, any known issues.
- Rough electricity spend per month, and when they use it — day or evening. This decides the
  battery.
- Any EV, or planning one?
- Timescale, and whether anything is driving it (a roof job, a bill, a house move).
- Have they had other quotes? Not to price against — to know where we are in the process.

## Red flags to surface, not ignore

Rental property with no landlord contact. A roof that needs replacing first. Someone
shopping purely on price with three quotes in hand. Unrealistic timescale. A property outside
our service area. Better to qualify out in week one than lose a survey day in week three.
