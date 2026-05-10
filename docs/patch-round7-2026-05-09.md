# Round 7 Patch — Nav spacing, /contractors micro-strip placement, ClipReveal calibration (2026-05-09)

**Source:** Discussion-session review of round-6 build output
**Status:** 3 fixes. Nav polish + section flow + animation calibration.
**Last updated:** 2026-05-09 night

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- Localhost only (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy`

---

## Fix 1 — Nav: tighten horizontal gap on DEERFIELD, IL + verify baseline alignment with N

**File:** `src/components/Layout.tsx` (or wherever nav renders the logo + location tag)

**Round-6 change (vertical baseline alignment) is mostly correct** — but the location tag still sits TOO FAR HORIZONTALLY from the end of "KHAN." There's currently a large empty gap between the N and "DEERFIELD, IL."

**Required result:**
- **Horizontal:** DEERFIELD, IL should sit RIGHT next to the end of "N" in KHAN, with only ~16–24px of padding between them. Should feel like a continuous masthead unit, not two separate elements floating apart.
- **Vertical:** baseline of "DEERFIELD, IL" should align with the baseline of the N in KHAN. (The round-6 fix moved it to the bottom — verify it's actually at the N baseline, not just somewhere lower.)

**Implementation hint:** Likely a margin-left / gap value that's currently too big. Reduce it. Also verify the flex/grid `items-baseline` alignment so it's pinned to the typographic baseline of KHAN, not the bottom of the bounding box.

**Verification:** Take a close-up nav screenshot. The "DEERFIELD, IL" text should sit visually next to the N — like the brand and location are part of one unit. Reference: Patagonia "Ventura, CA", Levi's location tags — they sit close to the wordmark, not floating at a distance.

---

## Fix 2 — /contractors: move micro-strips INTO the hero's light section

**File:** `src/pages/ContractorsPage.tsx`

**Problem:** The 3 micro-strips ("I work with a handful of contractors at a time" / "Before TheKhan, I built my own home service company..." / "Serving Chicagoland — Deerfield, Highland Park...") are currently in their own DARK background section between the hero (light) and the marquee (dark). This creates an awkward dark-then-dark sequence AND requires extra padding to separate from the hero.

**Fix:** Move the micro-strips OUT of their separate dark section and INTO the hero section's light background. So the flow becomes:

```
HERO SECTION (light, single continuous zone)
  - Eyebrow
  - H1
  - Subhead
  - TLDR strip
  - Skip-to anchors
  - CTAs
  - Micro-strips (NEW: moved here, inside the light hero zone)

MARQUEE SECTION (dark — only dark band in this zone)

SOUND FAMILIAR? SECTION (light)
```

**Result:**
- Light → dark → light alternation is preserved cleanly
- No need to add padding between hero and micro-strips — they're now part of the same section
- Marquee stands out as the only dark band between the hero and "Sound familiar?"

**Implementation notes:**
- The micro-strips themselves keep their existing styling (just relocated)
- Add appropriate spacing INSIDE the hero section between the CTAs and the micro-strips so they breathe naturally — not crammed against the buttons
- Verify mobile rendering — micro-strips should still stack cleanly and read at the bumped font size from round 6

---

## Fix 3 — Recalibrate ClipReveal: 1600ms duration + smoother easing

**Files:**
- `src/components/ui/clip-reveal.tsx` (the shared component)
- Any per-page overrides in `src/pages/WebsitesPage.tsx`, `src/pages/ContractorsPage.tsx`, `src/pages/PortfolioPage.tsx`

**Problem:** ClipReveal at 1000ms still feels too fast on the big H1 reveals. The wipe races across the text. Issue is BOTH the duration AND the easing curve (current `cubic-bezier(0.16, 1, 0.3, 1)` ease-out has an aggressive snap at the end).

**Decision context:** Don't replace ClipReveal — keep it as the H1 reveal type for /websites, /contractors, /portfolio. The variety per page (homepage = fade, /about = WordStagger, others = ClipReveal) is intentional. Just calibrate it correctly.

**Required changes to ClipReveal default:**
- **`durationMs` default:** change from `1000` to **`1600`**
- **Easing:** change from `cubic-bezier(0.16, 1, 0.3, 1)` to **`cubic-bezier(0.4, 0, 0.2, 1)`** (Material Design "standard" — gradual through the middle, no end-snap)

**Apply both changes inside the shared component (`clip-reveal.tsx`)** so all pages using ClipReveal pick them up automatically. Don't add per-page overrides — the default IS the new spec.

**Per-page check:** /websites, /contractors, /portfolio H1s should now feel like a deliberate unveiling — slow enough to register as intentional, smooth enough to not snap at the end.

**Leave alone:**
- /about ClipReveal on the portrait (already at `durationMs={900}` — keeping the explicit override is fine, it's a smaller visual element so faster timing is appropriate)
- /about WordStagger (signature animation, no change)
- Homepage fade + slide (signature animation, no change)

**Result:** /websites, /contractors, /portfolio hero text reveals feel calm and editorial, matching the deliberate pacing of /about and homepage even though they use a different animation type.

---

## Acceptance criteria

After all 3 fixes:

- [ ] Nav: "DEERFIELD, IL" sits visually next to the end of "KHAN" with only ~16-24px gap — reads as one masthead unit
- [ ] Nav: DEERFIELD, IL baseline aligned to the baseline of N in KHAN
- [ ] /contractors: micro-strips are inside the hero's light section (no separate dark micro-strip band between hero and marquee)
- [ ] /contractors flow visible: hero (light, includes micro-strips) → marquee (dark) → "Sound familiar?" (light) — clean alternation
- [ ] Micro-strips have natural breathing room from the CTAs above (not crammed)
- [ ] /websites, /contractors, /portfolio hero ClipReveal: now 1600ms with `cubic-bezier(0.4, 0, 0.2, 1)` easing
- [ ] Reveals feel deliberate and unhurried — no snappy end
- [ ] /about and homepage hero animations untouched
- [ ] All previous fixes (rounds 1-6) preserved
- [ ] Screenshots taken for review

---

## Screenshots

Save round-7 screenshots to `~/Projects/sites/thekhan/docs/screenshots-2026-05-09-round7/`:
- Nav close-up (verify DEERFIELD horizontal proximity + baseline alignment)
- /contractors hero through marquee through "Sound familiar?" — full vertical capture showing the new flow without the dark micro-strip band
- /websites hero, /contractors hero, /portfolio hero — three close-ups for visual reference (the slowed wipes won't show in stills but verify no layout regression)

Ping back when ready.

---

**End of brief.**
