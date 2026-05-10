# Round 5 Patch — Hero polish + tint uniformity (2026-05-09)

**Source:** Discussion-session review of round-4 build output
**Status:** 5 fixes. Mix of /portfolio polish + sitewide hero animation/tint consistency.
**Last updated:** 2026-05-09 night

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Fix 1 — C&G column: expand caption to a full paragraph

**File:** `src/pages/PortfolioPage.tsx` (paired Premier+C&G section, C&G column)

**Problem:** C&G column has H2 → screenshot → 1-line caption → Visit link → then a HUGE empty void below. Premier column is much taller (has the 6-brand grid). The two columns are visually off-balance.

**Fix:** Replace the current 1-line caption with a full paragraph that tells the story and naturally fills the column.

**Current caption:**
> "My old company. The phone still rings — and those calls go to the contractors I work with."

**New caption (replace with):**
> "My old company. Founded June 2024, scaled to 84 clients on the North Shore before I closed it March 2026. The phone still rings from the SEO work I did — and those calls now go to the contractors I work with."

**Style:** Same Manrope body type as before, same column width, just longer text. Keep the Visit → link directly below the new paragraph.

**Result:** C&G column now has more vertical content, balances better against Premier's tall column.

---

## Fix 2 — /portfolio hero: add text reveal motion

**File:** `src/pages/PortfolioPage.tsx` (hero section)

**Problem:** /portfolio hero is the only page with NO hero animation. Hero text "WHO I'VE BUILT FOR." sits static on page load. Other pages have:
- Homepage: gradient drift
- /websites: ClipReveal H1 wipe
- /contractors: gradient drift + count-up on 84
- /about: WordStagger

**Fix:** Add ClipReveal H1 wipe to "WHO I'VE BUILT FOR." — same animation type as /websites. Fires once on page load, ~600ms ease-out.

Keeps hero motion consistent across the site without being repetitive (each page still has its own combination of motions).

---

## Fix 3 — Add gradient drift to /websites hero

**File:** `src/pages/WebsitesPage.tsx` (hero section)

**Problem:** /websites hero is missing the atmospheric gradient drift that /contractors and homepage have. Inconsistent across conversion pages.

**Fix:** Apply the SAME gradient drift component used on /contractors hero to /websites hero. Same animation, same opacity, same loop duration.

**CRITICAL — visibility level:** match /contractors exactly. Use the same CSS class / component / opacity values. Do NOT make it more subtle "for variety." Buyers should feel the SAME atmospheric warmth on all 3 conversion pages.

---

## Fix 4 — Add ClipReveal H1 wipe to /contractors hero

**File:** `src/pages/ContractorsPage.tsx` (hero section)

**Problem:** /contractors hero has gradient drift + count-up on 84 (mid-page) but the H1 itself ("YOU DO THE WORK. / I MAKE SURE PEOPLE FIND YOU.") is static. /websites has a ClipReveal wipe on its H1. /contractors should match for cross-page consistency on conversion pages.

**Fix:** Add ClipReveal wipe to the H1 on /contractors. Same animation specs as /websites:
- Clip-path or mask wipe, ~600ms duration
- ease-out timing
- Fires once on page load
- Reveals the H1 from one side (left-to-right is consistent with reading direction)

**Note on the two-line H1:** /contractors H1 is "YOU DO THE WORK." (cream) on line 1 + "I MAKE SURE PEOPLE FIND YOU." (sage) on line 2. Wipe should reveal both lines — either as one wipe across both, or staggered (line 1 first, line 2 200ms later). Builder's choice — pick the one that reads cleanest. Flag which approach you took.

---

## Fix 5 — Equalize gradient drift TINT visibility across all 3 conversion pages

**Files:** `src/pages/HomePage.tsx`, `src/pages/WebsitesPage.tsx`, `src/pages/ContractorsPage.tsx` (and/or shared gradient drift component / index.css)

**Problem:** Right now the green tint from gradient drift is most visible on /contractors and barely noticeable on homepage. Per Omair's review, the /contractors tint is the desired intensity — that's the visual benchmark.

**Required outcome:** **Homepage, /websites, and /contractors heroes must have visually identical gradient drift tint visibility.** Same opacity, same color stops, same animation timing.

**Action:**
1. Inspect the gradient drift implementation. Find where opacity / color stops are defined.
2. Identify why /contractors tint is more visible than homepage. Possibilities: different opacity values per page, different blend modes, different background base colors, layered animations, etc.
3. Standardize all 3 conversion pages to match /contractors. If using a shared component, just apply it identically. If pages have per-page overrides, remove them.
4. After fix: visually compare all 3 hero screenshots side-by-side. Tint should look identical.

**Verification:** Take screenshots of all 3 hero sections AT THE SAME SCROLL POSITION (top of page, 1440px wide desktop) and compare. Tint visibility should match.

---

## Acceptance criteria

After all 5 fixes:

- [ ] /portfolio C&G column: caption expanded to full paragraph, column balances better against Premier
- [ ] /portfolio hero: H1 "WHO I'VE BUILT FOR." has ClipReveal wipe on page load
- [ ] /websites hero: gradient drift visible at same intensity as /contractors
- [ ] /contractors hero: H1 "YOU DO THE WORK. / I MAKE SURE PEOPLE FIND YOU." has ClipReveal wipe on page load
- [ ] Homepage hero: gradient drift visible at same intensity as /contractors (may require opacity bump)
- [ ] Side-by-side comparison: all 3 conversion-page hero tints look identical
- [ ] Each page still has its OWN signature motion combination (variety preserved while consistency improves)
- [ ] No regression on round-1 through round-4 fixes
- [ ] Screenshots taken for review

---

## Screenshots

Save round-5 screenshots to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round5/`:
- /portfolio paired section close-up desktop (verify C&G column balanced against Premier)
- /portfolio hero close-up desktop (verify H1 wipe rendered position)
- Hero close-ups of all 3 conversion pages side-by-side (homepage, /websites, /contractors) — same scroll position, same viewport, for tint comparison
- Full-page desktop screenshots of all 5 pages (regression check)

Ping back when ready.

---

**End of brief.**
