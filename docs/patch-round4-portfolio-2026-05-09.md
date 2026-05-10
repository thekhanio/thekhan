# Round 4 Patch — /portfolio paired section polish (2026-05-09)

**Source:** Discussion-session review of round-3 build output
**Status:** 2 fixes to the Premier+C&G paired section. Both small.
**Last updated:** 2026-05-09 evening

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Fix 1 — Drop the giant C&G logo card from the C&G column

**File:** `src/pages/PortfolioPage.tsx` (paired section, C&G column)

**Problem:** The C&G logo is currently rendered in a square-ish card that takes up roughly the same vertical space as the screenshot below it. It's enormous and dominates the column. The C&G logo is ALREADY in the logo marquee at the top of the page — repeating it at full size in the paired section is visually redundant and wastes space.

**Fix:** Remove the standalone C&G logo card entirely from the C&G column. New structure for the C&G column should be:

```
CLEAN & GREEN     ← H2 title (Anton, cream — matches "Premier Partners" H2 styling)

[hub screenshot]  ← cleangreen-screenshot.jpg, full column width

Caption: "My old company. The phone still rings — and those
calls go to the contractors I work with."

Visit →           ← link to https://cleangreenproperty.com
```

**Why drop the logo entirely instead of shrinking it:** Premier doesn't have a "Premier Partners" logo card — it has the H2 title only, then the 6-brand grid. C&G should match that pattern: H2 title only, then the visual content. Logo lives in the top-of-page marquee where it does its job once. Repeating it = noise.

**Result:** symmetry between the two columns:
- **Premier column:** H2 → (NEW: hub screenshot, see Fix 2) → description → 6-brand grid
- **C&G column:** H2 → hub screenshot → caption → Visit link

Both columns lead with H2 + screenshot. Same visual rhythm.

---

## Fix 2 — Add Premier hub screenshot to the Premier column

**File:** `src/pages/PortfolioPage.tsx` (paired section, Premier column)

**Problem:** Premier Partners column currently goes: H2 → description → 6-brand grid. There's NO screenshot of the Premier Partners hub site (servicesfrompremier.com). Every other client on /portfolio shows a screenshot. C&G shows one. Premier should too — the 6 brand logos are logos, not the actual website.

**The screenshot file already exists:** `~/Projects/sites/thekhan/public/portfolio/premier-hub-screenshot.jpg` (168KB). Just needs to be referenced.

**Fix:** Add the Premier hub screenshot ABOVE the 6-brand grid, in the same place C&G's screenshot sits in its column.

**New Premier column structure:**

```
PREMIER PARTNERS  ← H2 (existing)

[hub screenshot]  ← NEW: premier-hub-screenshot.jpg, full column width

Multi-brand home service company serving Cook County, Lake County,
and McHenry County  ← description (existing)

[6-brand grid]    ← 2 cols mobile / 3 cols desktop (existing)

Visit hub site →  ← OPTIONAL: small link to https://servicesfrompremier.com
                    (matches C&G's "Visit →" link for symmetry)
```

**Implementation notes:**

- Screenshot should match the visual treatment of C&G's screenshot in the same row (same border-radius, same aspect ratio handling, same hover behavior if any)
- Place between the H2 and the description
- On mobile: stacks naturally as part of the column flow

---

## Acceptance criteria

After both fixes:

- [ ] C&G column no longer shows a giant standalone logo card at the top
- [ ] C&G column structure: H2 → screenshot → caption → Visit link
- [ ] Premier column structure: H2 → hub screenshot → description → 6-brand grid → (optional Visit hub link)
- [ ] Both columns lead with H2 + screenshot — visual rhythm matches
- [ ] Premier hub screenshot uses existing file at `/portfolio/premier-hub-screenshot.jpg`
- [ ] Section still uses the 60/40 split + sage divider from round 3
- [ ] Section background still alternates correctly (section-base after the dark marquee per round 3)
- [ ] Mobile: both columns stack and read cleanly
- [ ] Screenshots taken for review

---

## Screenshots

Save round-4 screenshots to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round4/`:
- /portfolio paired section close-up desktop (shows symmetric H2 → screenshot → words structure on both sides)
- /portfolio paired section close-up mobile (Premier and C&G stacked)
- /portfolio full-page desktop (verify the section flow + tone alternation still works)

Ping back when ready.

---

**End of brief.**
