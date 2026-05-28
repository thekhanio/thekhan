# Intake Funnel Redesign — 2026-05-28

> **SHIPPED (final, supersedes the original plan below):** The design evolved during the build. Final state:
> - **`/intake`** — gated + branched (pick what you're looking for → tailored questions), with a **conditional ad-budget question** (only shows for Not-sure / Paid ads / Both — never for fixed-price work). Current-website field on every path; site-platform on website paths; grow-type on marketing paths.
> - **`/start`** — two scope-locked links: **`/start/website`** (Websites) and **`/start/marketing`** (full site + marketing — a marketing client always gets a new build). **Bare `/start` and any unrecognized link = dead-end "incomplete link" message, not a form.** The scope chooser was *removed* entirely; there is **no marketing-only path**.
> - **Contact-form triage select** — NOT built (left the website contact form as-is).
> Canonical spec lives in the vault: `Operations/Sales Flow/intake-form-spec.md` + `onboarding-intake-form-spec.md`. Cloudflare version `a600f071`.

---


## Problem
Four forms with overlapping jobs: website contact form, `/intake`, (proposed) deeper pre-call form, `/start`. The website contact form and the old `/intake` were ~90% the same (name/email/phone + freeform "tell me about your business"), so a website lead who then got sent `/intake` answered the same basics twice.

## Decision — three-form funnel, three distinct jobs

| Stage | Form | Job | Who |
|-------|------|-----|-----|
| First touch | **Website contact form** (`ContactForm.tsx`) | "I'm interested" — basic capture | Inbound from site |
| Pre-call | **`/intake`** (rebuilt) | Prep the call — factual depth, opt-in | Everyone, after first contact |
| Post-sign | **`/start`** (unchanged) | Onboarding — production data | Signed clients |

- Old heavy `/intake` is **replaced** at the same route by the deeper pre-call form.
- Omair sends `/intake` to all leads after first contact: "fill this out before we talk, saves 10–15 min — or we cover it live." Cold reach-outs also get pointed at `/marketing` + `/why-intent` first.
- `/intake` must stand alone (cold reach-outs never touched the site) → includes contact fields.
- Pain-dig + 90-day vision deliberately stay OFF the form (they die in a text box; rapport/close live on the call). Form = factual half only.

## Changes

### 1. `ContactForm.tsx` — add optional triage select
Add one tap/select: **"What are you after? — Websites · Marketing · Both · Not sure"** shown site-wide (new `showServiceType` prop, default on). Lets Omair triage the instant a lead lands. Everything else stays — freeform message already covers business type / issue.

### 2. `/intake` (`IntakePage.tsx`) — replace with deeper pre-call form
Reuse existing design (dark cards, motion, tap-cards). Fields:

**Identity (required, enforced):** Name · Email · Phone · Business name

**Substance (factual half of discovery, mostly taps):**
1. Exactly what you're after — multi-select: New site · Rebuild/fix my site · Get found on Google (SEO) · Google Business Profile · Google Ads · Reviews · Not sure *(coarse direction required)*
2. How long in business + main services — short text
3. Where do most of your jobs come from now? — multi-select: Referrals · Google · Maps/GBP · Facebook/social · Repeat customers · Trucks/signs · Other
4. Roughly how many calls/leads a week — and is that enough? — short text + yes/no tap
5. Areas you serve, and any you want to grow into — short text
6. Timeline — tap: ASAP · Soon (next month or so) · Long game, no rush
7. Decision-maker — tap: Just me · Me + a partner/spouse

**Optional:** Ever run marketing before? If so, what? *(factual only — "why it didn't work" is for the call)* · Anything else I should know?

Validation: enforce Name/Email/Phone + coarse "what you're after" (fixes the old gap). Website URL field removed entirely (kills the old required-url bug). Same `leads-api.thekhan.io` endpoint, `form_id: thekhan-intake`, richer payload.

### 3. `/start` — no change.

## Follow-ups (after build)
- Update vault specs: `Operations/Sales Flow/intake-form-spec.md` (now the deeper pre-call form), note contact form = first touch.
- CMD call script: add two variants — *prepped* (intake filled → short call) vs *cold*.
- robots.txt already lists `/intake` — no change.
