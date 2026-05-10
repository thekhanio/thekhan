# Patch — Homepage Button Audience Word Emphasis (2026-05-10)

**Source:** Discussion-session UX iteration
**Goal:** Make the audience word ("home service" / "local services") visually dominant in the two outlined "grow" buttons by combining bold weight + sage color + muted surrounding text.

---

## CRITICAL — Production Safety Rule

- Localhost first
- Visual verify in browser, then deploy

---

## Fix — Bold + sage on audience word, mute surrounding text

**File:** `src/pages/HomePage.tsx` (3-button hero, around lines 121-122)

**Current state:**
- Cream surrounding text: "I want to grow my" + "business →"
- Sage audience word span: "home service" / "local services"
- Problem: sage is dimmer than cream, so the audience word RECEDES instead of standing out

**New state:**
- **Muted gray** surrounding text: "I want to grow my" + "business →" (recedes visually)
- **Bold sage** audience word: "home service" / "local services" (becomes the brightest, heaviest part)

---

## JSX implementation

**Button 2 (home services):**

```tsx
<Link to="/home-services" className="btn-outline-accent">
  <span className="text-ink-muted">I want to grow my </span>
  <span className="text-accent-light font-semibold">home service</span>
  <span className="text-ink-muted"> business &rarr;</span>
</Link>
```

**Button 3 (local services):**

```tsx
<Link to="/local-services" className="btn-outline-accent">
  <span className="text-ink-muted">I want to grow my </span>
  <span className="text-accent-light font-semibold">local services</span>
  <span className="text-ink-muted"> business &rarr;</span>
</Link>
```

**Primary button "I need a website →" — UNCHANGED.** Stays filled green primary with no internal spans.

---

## Notes

- **Use `text-ink-muted`** (the muted text color already used elsewhere in the design system — same class used for muted body copy and lede subheads). If a slightly different muted class fits better (`text-ink-quiet` or `text-ink-faint`), pick whichever feels right next to the bold sage audience word.
- **Use `font-semibold`** on the audience word (not `font-bold`) — `semibold` gives weight without making the word feel oversized. Bump to `font-bold` if semibold doesn't pop enough in browser.
- **Whitespace handled via in-span spaces** — note the trailing space inside "I want to grow my " and the leading space inside " business →". Same pattern works without needing `{" "}` siblings since each span has the space inside its text content.
- **Hover state**: the existing CSS rule `.btn-outline-accent:hover span { color: inherit; }` already handles the hover sage-fill case. All three spans will inherit the hover text color on button hover. No new CSS needed.

---

## Acceptance criteria

- [ ] Resting state on button 2: "I want to grow my" + "business →" render in muted gray; "home service" renders in bold sage
- [ ] Same for button 3 with "local services"
- [ ] Primary green button "I need a website →" unchanged
- [ ] Hover state: button fills sage, ALL text (including muted parts and audience word) becomes the dark hover text color — fully visible
- [ ] Spaces between words preserved (no "myhome" or "servicebusiness")
- [ ] Mobile rendering preserved
- [ ] tsc -b clean

---

## Deploy steps

1. `bun run build`
2. `wrangler deploy`
3. `git add src/pages/HomePage.tsx docs/patch-button-emphasis-2026-05-10.md`
4. `git commit` with HEREDOC:

```
Homepage button emphasis: bold sage audience word + muted surrounding text

Previous sage-color-only approach didn't pop because sage is dimmer than
cream — the audience word receded instead of standing out. Fixed by:
- Bold weight (font-semibold) on the audience word spans
- Muted gray (text-ink-muted) on the surrounding text spans
Result: audience word is now the brightest + heaviest part of the button,
surrounding words recede. Eye lands on "home service" / "local services"
in under a second.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live: visit https://thekhan.io/, confirm muted + bold sage rendering on both outlined buttons in resting AND hover states.

---

**End of brief.**
