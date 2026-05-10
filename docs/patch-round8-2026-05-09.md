# Round 8 Patch — Final copy fixes (2026-05-09)

**Source:** Discussion-session review of round-7 build
**Status:** 2 small copy fixes. Final round before potential deploy review.
**Last updated:** 2026-05-09 night

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Fix 1 — /websites: replace "1 to 6 weeks" with "about 30 days" everywhere

**File:** `src/pages/WebsitesPage.tsx`

**Decision:** Locked on **"about 30 days"** — sharper than "1 to 6 weeks" without creating a hard promise. Soft "about" gives wiggle room if a project slides to 5-6 weeks.

**4 specific places to change:**

**Line ~137 (subhead):**
- Current: `Live in <MonoNum>1</MonoNum> to <MonoNum>6</MonoNum> weeks. The site is yours — move it anywhere you want. No monthly fees.`
- New: `Live in about <MonoNum>30</MonoNum> days. The site is yours — move it anywhere you want. No monthly fees.`

**Line ~142 (TLDR bullet 1):**
- Current: `<>A site built just for you, ready in 1 to 6 weeks</>,`
- New: `<>A site built just for you, ready in about 30 days</>,`

**Line ~290 (payment block):**
- Current: `50% paid Day 1 to start the build, 50% on launch. Live in 1 to 6 weeks. One-time project — no monthly fee, no cancellation fee.`
- New: `50% paid Day 1 to start the build, 50% on launch. Live in about 30 days. One-time project — no monthly fee, no cancellation fee.`

**Line ~382 (process step 03):**
- Current: `{ n: "03", title: "Build — 1 to 6 weeks", body: "You see progress along the way..."`
- New: `{ n: "03", title: "Build — about 30 days", body: "You see progress along the way..."`

**Also check meta description (line ~24):**
- Current: `"Custom websites built from scratch in 1–6 weeks. You own every file, the domain, the logins. No retainer, no lock-in. Deerfield, IL."`
- New: `"Custom websites built from scratch in about 30 days. You own every file, the domain, the logins. No retainer, no lock-in. Deerfield, IL."`

**Result:** Single consistent timeline phrase across the page + meta + schema. Sharper than the range, soft enough not to break trust if a project slides.

---

## Fix 2 — /contractors: add C&G lead-forwarding clause to the 84-clients micro-strip

**File:** `src/pages/ContractorsPage.tsx`, line ~237

**Current:**
```
&mdash; Before TheKhan, I built my own home service company to <CountUp to={84} className="font-mono text-accent-light" /> clients. Closed it in March &mdash; the phone still rings from the SEO work I did. &mdash;
```

**New:**
```
&mdash; Before TheKhan, I built my own home service company to <CountUp to={84} className="font-mono text-accent-light" /> clients. Closed it in March &mdash; the phone still rings from the SEO work I did, and those calls now go to the contractors I work with. &mdash;
```

**Why:** Sitewide consistency. /about and /portfolio both include the lead-forwarding clause. /contractors is the page where this matters MOST — visitors are potential clients who might GET those forwarded leads. Currently a missed selling point.

**Don't change:** the `<CountUp>` element or any styling. Just append the clause to the existing sentence.

---

## Acceptance criteria

- [ ] /websites: all 4 timeline references on the page now say "about 30 days"
- [ ] /websites: meta description also updated
- [ ] /contractors: 84-clients micro-strip ends with "...and those calls now go to the contractors I work with."
- [ ] CountUp element on 84 still works
- [ ] All previous fixes (rounds 1-7) preserved
- [ ] tsc -b clean

**Skip the screenshot pass this time.** Discussion session has already reviewed everything. Just make the 2 copy edits, verify tsc compiles, and report back.

---

**End of brief.**
