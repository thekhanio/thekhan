# Patch — Active Nav Link Sage Text (2026-05-10)

**Source:** Discussion-session UX nit
**Goal:** Active nav link text becomes sage (matches the existing sage underline) so the current page is unmistakable at a glance.

---

## CRITICAL — Production Safety Rule

- Localhost first
- One-line CSS/className change. Skip screenshots. Visual verify in browser → deploy.

---

## Fix

**File:** `src/components/Layout.tsx` (or wherever the active nav link state is rendered/styled — likely uses `aria-current="page"` from react-router-dom or a className conditional)

**Current active state:**
- Underline: sage (#9BC4A8) ✅ keep
- Text color: cream (default nav link color) ← change this

**New active state:**
- Underline: sage (#9BC4A8) ✅ unchanged
- Text color: **sage (#9BC4A8)** — match the underline

**Inactive nav links:** unchanged (cream/muted text, no underline).

---

## Implementation hint

Look for where the active nav item gets its differentiating treatment. Could be:
- A conditional className: `className={isActive ? "text-ink underline decoration-accent-light" : "text-ink-muted"}` → change `text-ink` to `text-accent-light` on the active branch
- An `aria-current="page"` attribute + a CSS selector: `[aria-current="page"]` → add `color: #9BC4A8` (or `@apply text-accent-light`) to that selector
- A NavLink `className` prop that React Router calls with `{isActive}`

Whichever pattern is in use — just swap the active-state text color from cream to sage. Don't touch the underline.

**Tailwind class to use:** `text-accent-light` (same class used for sage accent on H1 second lines + the new homepage button audience words — sitewide consistency).

---

## Acceptance criteria

- [ ] On every page, the active nav link (matching current URL) renders in sage text + sage underline
- [ ] Inactive nav links stay cream/muted (no change)
- [ ] Mobile nav menu shows same active-state treatment if applicable
- [ ] tsc -b clean

---

## Deploy steps

1. `bun run build`
2. `wrangler deploy`
3. `git add` specific files:
   - `src/components/Layout.tsx` (or wherever the nav active state lives)
   - `docs/patch-nav-active-sage-2026-05-10.md`
4. `git commit` with HEREDOC:

```
Active nav link: sage text to match the sage underline

Active page's nav link was cream text + sage underline — relied entirely
on the small underline to signal which page you're on. Bumping the text
color to sage too so the active state is unmistakable at a glance.
Reinforces sitewide "sage = important/active" pattern (homepage button
audience words, /local-services row-2 specifics, etc.).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live: visit https://thekhan.io/, navigate through pages, confirm active link is fully sage on each page.

---

**End of brief.**
