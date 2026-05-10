# Follow-up Patch — 2026-05-09 (Round 2)

**Source:** Discussion-session review of round-1 build output
**Status:** 5 fixes needed before deploy. All are small. No new components.
**Last updated:** 2026-05-09 evening

---

## CRITICAL — Production Safety Rule (still in force)

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`
- Strip all deploy commands from any patches you write

---

## Fix 1 — /about hero composition BROKEN, must restore

**File:** `src/pages/AboutPage.tsx` (hero section, lines ~73-95)

**Problem:** The WordStagger implementation restructured the markup. Now "DOING THE WORK" and "GETTING THE WORK" are stacked CENTERED on top of each other, with a sage vertical line floating orphaned on the left. The original locked design was a TWO-AXIS COMPOSITION — these two labels MUST sit SIDE BY SIDE in a two-column layout, separated by a vertical sage divider.

**Locked design rule (from `~/Obsidian Vaults/TheKhan/Strategy/site-redesign-continuation.md`):**
> "The /about 'handshake section' — the existing two-axis hero composition ('Every business has two jobs / Doing — Getting / The second one is all I do now') is the strongest single block. Don't touch it."

**Required structure (restore):**

```
              EVERY BUSINESS HAS TWO JOBS.        ← centered H1, full width

   DOING THE WORK    │    GETTING THE WORK         ← TWO COLUMNS, vertical sage divider between
   (cream)           │    (sage)

         THE SECOND ONE IS ALL I DO NOW.           ← centered, full width below

      You keep doing the work. ...                 ← centered subhead
```

**Action:**

1. Restructure the hero markup so "DOING THE WORK" and "GETTING THE WORK" sit in a 2-column flex/grid layout
2. The vertical sage line is the DIVIDER between those two columns — must be POSITIONED between them, not floating on the left
3. Keep the WordStagger animation but adapt it to the restored layout:
   - "DOING THE WORK" word reveals first (in left column)
   - "GETTING THE WORK" reveals 200ms later (in right column)
   - "THE SECOND ONE IS ALL I DO NOW." reveals 400ms after that (below, full width)
4. The animation should NOT require restructuring the markup — animate the existing elements in their original two-axis positions

**Acceptance:** Visually compare /about hero to the original production thekhan.io (which still has the correct two-axis layout). New version must match the original visual composition.

---

## Fix 2 — /about orphan-phrase line under the hero

**File:** `src/pages/AboutPage.tsx`, hero subhead

**Current:**
> "You keep doing the work. **I'll help you bring more in.**"

**Problem:** "Bring more in" has no clear referent — bring more WHAT in? Same orphan-phrase issue Omair flagged earlier when reviewing the /about TLDR draft. Now this line sits directly above the TLDR which DOES have a clear thought, making the inconsistency worse.

**Fix — replace with one of these (recommended order):**

**Option A (simplest fix — drop the orphan clause):**
> "You keep doing the work. I'll handle the marketing."

**Option B (more specific):**
> "You keep doing the work. I'll handle the marketing that brings in customers."

**Use Option A.** Tightest, plainest, no orphan. Echoes the /about hero promise without restating the TLDR's third bullet.

---

## Fix 3 — /websites date contradiction

**File:** `src/pages/WebsitesPage.tsx`, hero section

**Problem:**
- TLDR bullet 1 says: *"A site built just for you, **ready in 30 days**"*
- Subhead directly above TLDR says: *"Live in **1 to 6 weeks**. The site is yours — move it anywhere you want. No monthly fees."*
- 30 days vs 1-6 weeks = visible contradiction in the same view

**Fix:** Update the subhead to match the TLDR.

**Current subhead:**
> "Live in 1 to 6 weeks. The site is yours — move it anywhere you want. No monthly fees."

**New subhead:**
> "Live in 30 days. The site is yours — move it anywhere you want. No monthly fees."

Keep TLDR bullet 1 as-is ("A site built just for you, ready in 30 days"). 30 days is the locked Marketing Bundle setup window.

---

## Fix 4 — /portfolio subhead count

**File:** `src/pages/PortfolioPage.tsx`, hero section

**Problem:** Subhead says *"10 sites, all live right now"* — but we added C&G to the marquee, making it 11 logos.

**Fix:**

**Current:** "10 sites, all live right now. Click any of them to see for yourself."

**New:** "11 sites, all live right now. Click any of them to see for yourself."

---

## Fix 5 — /portfolio spacing (gap between hero and logo marquee)

**File:** `src/pages/PortfolioPage.tsx`

**Problem:** Visible gap between the hero subhead and the start of the logo marquee. Reads as a void instead of natural visual flow.

**Fix:** Tighten the spacing between hero section bottom and marquee section top. Likely needs to reduce padding-bottom on the hero section AND/OR padding-top on the marquee section.

**Target:** marquee should sit visually closer to the hero, like the /websites and /contractors text marquees do (which sit immediately under the hero with minimal gap).

**Verification:** Take a screenshot after the fix and compare hero-to-marquee gap to the same gap on /websites and /contractors. Should look comparable.

---

## Acceptance criteria for round 2

After all 5 fixes:

- [ ] /about hero: "DOING THE WORK" and "GETTING THE WORK" sit SIDE BY SIDE in two columns with a vertical sage divider between them (matches original production composition)
- [ ] /about hero: WordStagger animation still works (DOING → GETTING → THE SECOND ONE) without breaking the two-column layout
- [ ] /about hero subhead: "You keep doing the work. I'll handle the marketing." (no orphan phrase)
- [ ] /websites hero subhead: "Live in 30 days..." (matches TLDR bullet 1)
- [ ] /portfolio hero subhead: "11 sites..." (was 10)
- [ ] /portfolio: gap between hero subhead and logo marquee tightened to match /websites/contractors marquee placement
- [ ] All 5 pages render cleanly on mobile + desktop
- [ ] Screenshots taken of each fix for review

---

## Screenshot review

After all fixes, take updated screenshots of:
- /about hero (desktop + mobile) — must show two-axis composition restored
- /websites hero (desktop) — must show 30-days subhead
- /portfolio hero (desktop) — must show 11 sites + tightened spacing

Save to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round2/` and ping back to discussion session.

---

## NOT in this brief (still parked)

- MarioScape logo compression below 100KB (needs pngquant install)
- Replace synthesized /websites pull-quote testimonial with a real attributed one
- OG images, /local-businesses page, Worker sync, DOM double-injection, CMD sync, agreements

---

**End of brief.**
