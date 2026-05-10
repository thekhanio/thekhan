# Round 3 Patch — /portfolio Restructure (2026-05-09)

**Source:** Discussion-session review
**Status:** 2 changes to /portfolio. Wait until round-2 is done before starting this — they touch the same file.
**Last updated:** 2026-05-09 evening

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Sequencing

**Wait until round-2 fixes are complete before starting this brief.** Round 2 touches /portfolio for fixes 4 + 5 (subhead count + spacing). This brief restructures the same page. Doing them sequentially avoids merge headaches.

---

## Fix 1 — Alternate section background tones on /portfolio

**File:** `src/pages/PortfolioPage.tsx`

**Problem:** Right now the logo marquee (section-deep, dark) is followed by Premier Partners (also section-deep, dark) — they blend visually and the trust strip loses its purpose.

**Required pattern:** alternate light → dark → light → dark down the page so each section earns its space.

**New section background assignments (after round-2 + round-3 are complete):**

| # | Section | Background |
|---|---|---|
| 1 | Hero | `section-base` (light) |
| 2 | Logo marquee | `section-deep` (dark) |
| 3 | Premier + C&G PAIRED (NEW per Fix 2 below) | `section-base` (light) |
| 4 | Other Clients (2×2 grid) | `section-deep` (dark) |
| 5 | Contact | `section-raised` (light/different) |

**Verification:** screenshot the full page after change. Visual rhythm should be light → dark → light → dark → light. No two adjacent sections share the same background tone.

---

## Fix 2 — Pair Premier Partners + C&G into ONE side-by-side section

**File:** `src/pages/PortfolioPage.tsx`

**Problem:** Currently Premier Partners has its own dedicated section AND C&G (added in round-1) has its own separate dedicated section. Two huge sections back-to-back makes the page feel stretched. Both deserve depth — but pairing them visually solves this without losing either one.

**Required structure:**

Replace the two separate sections (Premier Partners + C&G dedicated) with ONE paired section using a 60/40 split.

**Desktop layout (CSS grid `60% 40%` or `3fr 2fr`):**

```
┌──────────────────────────────────────┬──────────────────────────┐
│  PREMIER PARTNERS    (60% width)     │  CLEAN & GREEN  (40%)    │
│                                      │                          │
│  Multi-brand home service company    │  [C&G logo]              │
│  serving Cook County, Lake County,   │                          │
│  and McHenry County                  │  [C&G screenshot]        │
│                                      │                          │
│  [6-brand logo grid: 3 columns × 2   │  My old company.         │
│   rows of brand logos, each card     │  The phone still rings   │
│   with hover-lift]                   │  — and those calls go    │
│                                      │  to the contractors I    │
│  Premier Partners                    │  work with.              │
│  Premier Power Washing               │                          │
│  Premier Holiday Lighting            │  Visit →                 │
│  Premier Auto Spa                    │                          │
│  Premier Plowing                     │                          │
│  Premier Paver Restoration           │                          │
└──────────────────────────────────────┴──────────────────────────┘
```

**Mobile layout (single column, stacked):**

```
PREMIER PARTNERS  (full width)
[description]
[6-brand grid: 2 columns × 3 rows on mobile]

CLEAN & GREEN  (full width, below Premier)
[logo]
[screenshot]
[description]
[Visit link]
```

**Implementation notes:**

- Wrap both blocks in a single `<section>` element with the section-base background (per Fix 1)
- Use CSS grid: `grid-template-columns: 3fr 2fr` on desktop (md+ breakpoint), `1fr` (single column) on mobile
- Add a vertical sage divider line between Premier and C&G on desktop only (consistent with the editorial brand language)
- C&G content is the same as the current dedicated section: logo + cleangreen-screenshot.jpg + caption "My old company. The phone still rings — and those calls go to the contractors I work with." + "Visit →" link to https://cleangreenproperty.com
- Premier content is the same as the current section: H2, description, 6-brand grid

**Result:** /portfolio goes from 5 sections (hero, marquee, Premier, C&G, Other Clients, Contact) → **4 sections** (hero, marquee, Premier+C&G paired, Other Clients, Contact). Tighter page, both stories still get depth, neither is squeezed into a 2×2 grid card.

---

## Acceptance criteria

After both fixes:

- [ ] /portfolio section backgrounds alternate light → dark → light → dark → light (no two adjacent same-tone sections)
- [ ] Premier Partners + C&G now share one paired section (60/40 split desktop, stacked on mobile)
- [ ] Vertical sage divider visible between Premier and C&G on desktop (not mobile)
- [ ] Premier 6-brand grid still renders correctly inside its 60% column
- [ ] C&G logo + screenshot + caption + Visit link all present in 40% column
- [ ] Page feels tighter — total sections went from 5 to 4 (excluding hero + marquee + contact = 5 → 4 means eliminating one mid-page section)
- [ ] Mobile: Premier stacks first, C&G below
- [ ] All existing content preserved (no Premier brands dropped, no C&G content lost)
- [ ] Screenshots taken for review (desktop + mobile, full page + close-up of paired section)

---

## Screenshots

Save round-3 screenshots to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round3/`:
- /portfolio full-page desktop
- /portfolio full-page mobile
- Close-up of Premier + C&G paired section desktop (shows the 60/40 split + divider)
- Close-up of Premier + C&G stacked on mobile

Ping back to discussion session when ready.

---

**End of brief.**
