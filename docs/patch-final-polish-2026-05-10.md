# Final Polish Patch — 2026-05-10

**Source:** Discussion-session review of /local-services live build
**Status:** 4 small fixes. All copy/structural. No new components.
**Last updated:** 2026-05-10

---

## CRITICAL — Production Safety Rule

**This patch IS scoped to deploy after Omair confirms.** Make the changes, take screenshots, ping back for review, then deploy with explicit go-ahead.

- Localhost first (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT deploy until Omair confirms after seeing the changes

---

## Fix 1 — Drop "DEERFIELD, IL" from nav entirely

**File:** `src/components/Layout.tsx` (or wherever the nav renders the logo + location tag)

**Action:** Remove the "DEERFIELD, IL" location tag from the nav entirely. Just `TK | THE KHAN` logo + nav links + "Let's talk" CTA.

**Why:** Nav is busy. Location info already lives on /about + footer. Premium reference brands (Klim, Aesop, A24, Hook Agency, van Schneider) all run masthead-only with no location tag.

**Implementation:** delete the `<span>DEERFIELD, IL</span>` (or equivalent) element. Adjust spacing/gap between logo and nav links if needed so the nav looks balanced after removal.

**Verification:** logo + nav + CTA only. No location tag visible on desktop OR mobile.

---

## Fix 2 — Micro-strips: em-dash before only (no closing dash)

**Files:**
- `src/pages/ContractorsPage.tsx`
- `src/pages/LocalServicesPage.tsx`

**Both pages have the same 3-strip pattern in the hero. Change BOTH.**

**Current pattern (em-dash on both sides):**
```
— I work with a handful of contractors at a time. —
— Before TheKhan, I built my own home service company to 84 clients. Closed it in March — the phone still rings from the SEO work I did, and those calls now go to the contractors I work with. —
— Serving contractors across Chicagoland — Deerfield, Highland Park... Remote clients welcome anywhere in the US. —
```

**New pattern (em-dash before only — NYT/Atlantic editorial pattern):**
```
— I work with a handful of contractors at a time.
— Before TheKhan, I built my own home service company to 84 clients. Closed it in March — the phone still rings from the SEO work I did, and those calls now go to the contractors I work with.
— Serving contractors across Chicagoland — Deerfield, Highland Park... Remote clients welcome anywhere in the US.
```

**Action:** Remove the trailing `—` from each of the 3 micro-strips. Keep the leading `—`. Keep the inner em-dashes (they're doing real grammatical work — clause breaks).

**Apply to BOTH /contractors and /local-services.** Same fix, same pattern.

---

## Fix 3 — "Google only" → "Google Search ads only" (both pages)

**Files:**
- `src/pages/ContractorsPage.tsx` (around line 492)
- `src/pages/LocalServicesPage.tsx` (same Add-ons section)

**Current ad management bullet list:**
```
• Bundled (Google Search + LSA) — $600/mo
• Google only — $500/mo                    ← change this
• LSA only — $150/mo
• Partnership rate (bundled + first landing page included) — $500/mo
• Ad spend goes on your card direct — zero markup
```

**Change "Google only" → "Google Search ads only".**

**New bullet:**
```
• Google Search ads only — $500/mo
```

**Why:** "Google only" was ambiguous — could mean "Google as a platform (which includes LSA)" or "Google Search ads only." Adding "Search ads" makes the parallel clean: Bundled is BOTH, "Google Search ads only" is one, "LSA only" is the other.

---

## Fix 4 — Custom landing pages strikethrough cleanup (both pages)

**Files:**
- `src/pages/ContractorsPage.tsx` (in the Add-ons section, after the ad management bullets)
- `src/pages/LocalServicesPage.tsx` (same section)

**Current (with strikethrough display, awkward parenthetical):**
> Custom landing pages — $300 each (~~$750~~ — Spring 2026 launch pricing through June 30, 2026). Partnership ads bundle includes the first one free; add'l pages run $250 each (~~$500~~ after June 30) at the Partnership rate.

**New (drop strikethrough, plain parenthetical):**
> Custom landing pages — $300 each through June 30, 2026 ($750 after). Partnership ads bundle includes the first one free; add'l pages run $250 each through June 30, 2026 ($500 after) at the Partnership rate.

**Action:**
- Remove the `<s>` / strikethrough styling on the $750 and $500 prices
- Restructure so the parenthetical is just future-price info, not a strikethrough display
- "$300 each through June 30, 2026 ($750 after)" — two beats: current price with date + future price in passing
- Apply identically to both /contractors and /local-services

**Why:** Strikethrough discount display reads retail-y / sale-y. Off-brand for the editorial premium voice. Plain "current price now, future price after [date]" is cleaner and avoids the defensive "look at the discount!" energy.

---

## Acceptance criteria

- [ ] Nav has no DEERFIELD, IL — desktop + mobile
- [ ] /contractors hero micro-strips: em-dash before only, no trailing em-dashes
- [ ] /local-services hero micro-strips: em-dash before only, no trailing em-dashes
- [ ] /contractors ad bullets show "Google Search ads only — $500/mo"
- [ ] /local-services ad bullets show "Google Search ads only — $500/mo"
- [ ] /contractors custom landing pages line cleaned up (no strikethrough, plain "($750 after)" parenthetical)
- [ ] /local-services custom landing pages line cleaned up (no strikethrough, plain "($500 after)" parenthetical)
- [ ] tsc -b clean
- [ ] All previous fixes preserved (rounds 1-7 + Foundation rename + OG images + /local-services build)

**Skip the screenshot pass on this one** — these are pure copy edits, discussion session has already approved each. Just take ONE screenshot of the nav (post-DEERFIELD removal) so Omair can verify the final masthead spacing looks balanced.

Save to `~/Projects/sites/thekhan/docs/screenshots-final-polish-2026-05-10/01-nav-no-deerfield.png`.

---

## Deploy steps (after Omair confirms screenshots)

When Omair gives explicit "deploy" approval after reviewing:

1. `bun run build`
2. `wrangler deploy`
3. `git add` specific files (NOT `git add -A`):
   - `src/components/Layout.tsx`
   - `src/pages/ContractorsPage.tsx`
   - `src/pages/LocalServicesPage.tsx`
   - `worker/index.js` (if any worker references to these were touched)
   - `docs/patch-final-polish-2026-05-10.md`
   - `docs/screenshots-final-polish-2026-05-10/*`
4. `git commit` with HEREDOC message:

```
Final polish: nav cleanup, micro-strip em-dashes, add-on copy, strikethrough fix

- Drop DEERFIELD, IL from nav (already on /about + footer; premium
  brands run masthead-only)
- Micro-strips on /contractors + /local-services: em-dash before only
  (NYT editorial pattern), drop trailing em-dashes that doubled with
  inner clause-break em-dashes
- "Google only — $500/mo" → "Google Search ads only — $500/mo" (both
  pages) — fixes ambiguity vs "Google as a platform"
- Custom landing pages: drop strikethrough display, use plain
  parenthetical "($750 after)" — matches editorial voice instead
  of retail-discount energy

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live: `curl -sI https://thekhan.io/local-services` returns 200; check nav renders without location tag.

---

**End of brief.**
