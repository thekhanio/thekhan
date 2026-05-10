# Round 6 Patch — Nav, /contractors flow, animation timing, /portfolio C&G stats (2026-05-09)

**Source:** Discussion-session review of round-5 build output
**Status:** 6 fixes. Mix of nav polish, /contractors section flow + readability, animation timing, and /portfolio column balance.
**Last updated:** 2026-05-09 night

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Fix 1 — Nav: re-align "DEERFIELD, IL" to baseline of KHAN wordmark

**File:** `src/components/Layout.tsx` (or wherever nav renders the logo + location tag)

**Problem:** "DEERFIELD, IL" currently floats at the TOP of the wordmark zone (aligned roughly to "THE"). Reads as a category tag floating above the brand instead of an attribution line. Wrong vertical anchor.

**Fix:** Vertically baseline-align "DEERFIELD, IL" to the bottom of "KHAN" (the lower line of the wordmark). Convention used by Patagonia ("Ventura, CA"), Levi's, REI — location tag sits at the baseline of the brand mark, signaling "based in," not "categorized as."

**Implementation hint:** Likely a flex/grid alignment change on the nav container — change vertical alignment from `items-start` (or top) to `items-end` (or baseline) for the location tag specifically. Keep horizontal position unchanged.

**Result:** location tag visually grounds at the bottom of the brand mark.

---

## Fix 2 — /contractors: flip "Sound familiar?" section to LIGHT background

**File:** `src/pages/ContractorsPage.tsx`

**Problem:** Right now the page flow is:
- Hero (light) → micro-strips (light) → marquee (DARK) → "Sound familiar?" (DARK)

The marquee and "Sound familiar?" share the same dark tone. The marquee loses its visual distinction.

**Fix:** Change the "Sound familiar?" / pain grid section background from `section-deep` to `section-base` (light).

**Result:** flow becomes light → dark → light → continuing the alternating pattern down the page. Marquee stands out as the only dark band in this zone.

**Verification:** also check the section AFTER "Sound familiar?" — make sure the alternation continues. Adjust subsequent sections if needed so no two adjacent sections share the same tone.

---

## Fix 3 — /contractors: tighten micro-strip vertical padding

**File:** `src/pages/ContractorsPage.tsx` (HERO MICRO-STRIPS section, around line 213-227)

**Problem:** The 3 micro-strips ("I work with a handful... / Before TheKhan... / Serving Chicagoland...") sit in dead space between the hero CTAs and the marquee. Reads as floating, not anchored.

**Fix:** Tighten the vertical padding around the micro-strips so they sit visually closer to the hero CTAs above them, with a clearer separation from the marquee below.

**Specific changes:**
- Reduce top padding on the micro-strips section (or increase bottom padding on the hero section so the strips feel like a continuation)
- Keep some bottom padding so the marquee has breathing room

**Result:** strips feel anchored to the hero, not floating in dead space.

---

## Fix 4 — /contractors: bump micro-strip font size for readability

**File:** `src/pages/ContractorsPage.tsx` (micro-strips section)

**Problem:** Micro-strips currently render at ~12-14px JetBrains Mono in a muted color. Contractor audience skews 35-65 — older readers will struggle with the small text.

**Fix:** Bump font size up by 1-2 size steps. Target: ~14-16px (or whatever the next size step in the design system is).

**Sitewide check:** if this same micro-strip styling is used elsewhere on the site (e.g., on /about or /websites mini-strips), apply the same size bump for consistency.

**Result:** strips remain editorial in style but readable for the target audience.

---

## Fix 5 — Slow hero ClipReveal animations to 1000ms

**Files:**
- `src/pages/WebsitesPage.tsx` (hero H1 ClipReveal)
- `src/pages/ContractorsPage.tsx` (hero H1 ClipReveal — added in round 5)
- `src/pages/PortfolioPage.tsx` (hero H1 ClipReveal — added in round 5)
- Possibly the shared ClipReveal component in `src/components/ui/`

**Problem:** Current ClipReveal animations fire at 600ms duration. That's too fast — feels like a glitch on fast machines instead of an intentional editorial reveal.

**Fix:** Change duration from 600ms to **1000ms**. Same easing (ease-out), same trigger (page load, fires once), just slower.

**Optional polish:** if the easing curve needs adjustment to feel more deliberate, consider `cubic-bezier(0.16, 1, 0.3, 1)` (a smoother editorial curve) instead of plain `ease-out`. Builder's call — flag if changed.

**Result:** hero text reveals feel intentional and premium instead of flickery.

---

## Fix 6 — /portfolio: add 3-stat block to C&G column

**File:** `src/pages/PortfolioPage.tsx` (paired Premier+C&G section, C&G column)

**Problem:** Even with the expanded caption from round 5, the C&G column still ends WAY before Premier (which has a 6-card brand grid). C&G column has lots of empty void below the Visit link. The two columns are visually unbalanced.

**Fix:** Add a 3-stat editorial block UNDER the caption and ABOVE the Visit link. Mirrors the editorial data-moment feel of /about.

**New C&G column structure (after this fix):**

```
CLEAN & GREEN

[hub screenshot]

My old company. Founded June 2024, scaled to 84 clients on the
North Shore before I closed it March 2026. The phone still rings
from the SEO work I did — and those calls now go to the contractors
I work with.

┌──────────────┬──────────────┬──────────────┐
│ FOUNDED      │ PEAK         │ CLOSED       │
│ June 2024    │ 84 clients   │ March 2026   │
└──────────────┴──────────────┴──────────────┘

Visit →
```

**Style:**
- 3-column CSS grid inside the C&G column (full column width)
- Eyebrow labels (FOUNDED / PEAK / CLOSED) in JetBrains Mono small caps, sage accent
- Values (June 2024 / 84 clients / March 2026) in display type (Anton or larger Manrope, cream)
- Subtle horizontal divider lines between columns OR no dividers (clean editorial look) — builder's call, pick what reads cleanest
- Top + bottom padding so the block feels like its own beat

**Result:** C&G column gets a structured editorial moment that fills the void with substance. Won't visually match Premier's 6-card grid (different content type) but feels intentional and balanced.

---

## Acceptance criteria

After all 6 fixes:

- [ ] Nav: "DEERFIELD, IL" sits at the baseline of "KHAN" (bottom-aligned)
- [ ] /contractors: "Sound familiar?" section background is LIGHT (section-base) — visible alternation light → dark → light around the marquee
- [ ] /contractors: micro-strips sit close to the hero CTAs above them (not floating in dead space)
- [ ] /contractors: micro-strip font size is readable (14-16px range)
- [ ] /websites + /contractors + /portfolio: hero ClipReveal animations fire at 1000ms (slower, more deliberate)
- [ ] /portfolio: C&G column has a 3-stat block (Founded / Peak / Closed) between the caption and the Visit link
- [ ] All previous fixes (rounds 1-5) preserved
- [ ] Screenshots taken for review

---

## Screenshots

Save round-6 screenshots to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round6/`:
- Nav close-up (verify DEERFIELD baseline alignment)
- /contractors hero through marquee through "Sound familiar?" — full vertical capture showing the new alternating tone
- /contractors hero close-up (showing micro-strips placement + new font size)
- /portfolio paired section close-up (showing new C&G stats block — should look balanced against Premier)
- Optional: short video / screen-record of the slowed hero animation if technically possible

Ping back when ready.

---

**End of brief.**
