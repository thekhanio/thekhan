# Patch Brief — 2026-05-09

**Source session:** Discussion/QA conversation in `~/.claude/projects/-Users-khan/`
**Status:** All decisions locked. 8 tasks ready to execute on localhost.
**Last updated:** 2026-05-09

---

## CRITICAL — Production Safety Rule

**NEVER deploy to thekhan.io without explicit "deploy" approval from Omair.**

- All work happens on localhost (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT run `wrangler deploy` or `bun run deploy` at any point
- Do NOT include deploy commands in any patches you write
- The original production thekhan.io is the reference point — preserve until reviewed and approved
- Strip all deploy commands from every patch until Omair says "deploy"

---

## Workflow

1. Run `bun run dev` from `~/Projects/sites/thekhan/`
2. Execute tasks in the order below
3. Take screenshots of changes via chrome-devtools MCP after each major task (mobile + desktop viewports)
4. Ping back to discussion session for review when ready
5. Wait for explicit "deploy" before any production push

---

## Task Order

Tasks are grouped by file/page to minimize context switching. Order optimized so each page gets all its changes in one cohesive sweep.

1. **Cleanup** (zero risk, do first)
2. **/websites** (reorder + TLDR + marquee + motion)
3. **/contractors** (TLDR + spacing + marquee + motion)
4. **/portfolio** (logo marquee + C&G section + stagger reveal)
5. **/about** (TLDR + copy fix + 5 motion moments)
6. **Homepage** (CTA text rename only)
7. **MEMORY.md update** (outside codebase)

---

## TASK 1 — Cleanup

### 1a. Delete dead WavesBackdrop component

**File:** `src/components/WavesBackdrop.tsx`

**Action:** Delete file entirely. Confirm no imports remain anywhere via:
```
grep -r "WavesBackdrop" src/
```
Should return zero results after deletion. The HomePage.tsx line 99 has a comment confirming it's unused.

---

## TASK 2 — /websites

### 2a. Reorder sections

**File:** `src/pages/WebsitesPage.tsx`

**Action:** Move "What's Not Included" section from position 3 (right after Pricing) to position 6 (right before FAQ).

**Final order:**
1. Hero
2. Pricing
3. On Platforms
4. Optional Dashboard
5. Process
6. **What's Not Included** (moved)
7. FAQ
8. Contact

**Why:** build-up principle — every section should advance the yes, not slow it down. Putting limits right after pricing = buyer's remorse at moment of mental commitment. Limits land better at position 6 once trust is built.

### 2b. Add TLDR strip + anchor nav

**Position:** Directly under H1 in the hero section.

**Markup pattern:**
```
[eyebrow] THE SHORT VERSION [/eyebrow]

• A site built just for you, ready in 30 days
• 3 tiers: $750, $1,200, or $1,800 (one-time, Spring 2026 launch pricing)
• You own the code — no contracts, no lock-in

Skip to: [Pricing] · [Process] · [FAQ]
```

**Style:**
- Eyebrow label "THE SHORT VERSION" in JetBrains Mono small caps, sage accent
- 3 bullets in Manrope body type
- "Skip to:" links separated by middle-dots, sage accent on link text
- Anchors: `#pricing`, `#process`, `#faq` (ensure each section has matching `id` + `scroll-mt-20`)

### 2c. Add /websites text marquee

**Position:** Below hero, above Pricing section.

**Style:** Single line, slower scroll than homepage marquee, all OUTLINED text (homepage is solid+outlined two-line — sub-page should feel like a sibling, not a copy).

**Content (8 items, in this exact order):**
> Built Just for You · Found on Google · Brings In Calls · Loads Fast · Looks Sharp on Phones · Easy to Edit Yourself · You Own It · No Contracts

### 2d. Add /websites motion

- **Scroll-triggered text reveal on H1** — clip-path or mask wipe, 600ms, ease-out, fires once on page load
- **Sticky pull-quote** — find the strongest single testimonial/proof block, convert to a sticky element that holds while user scrolls past it (NYT longform pattern)
- **cta-orbit on final CTA** — extend the existing `cta-orbit` class (currently only on HomePage.tsx:302) to the final "Tell me about your business →" button on this page

### 2e. Final CTA text rename

Change final CTA button text to: **"Tell me about your business →"**

---

## TASK 3 — /contractors

### 3a. Tighten "Sound familiar?" inter-block spacing

**File:** `src/pages/ContractorsPage.tsx`, around line 243

**Change:** Inter-pain-block padding from `py-16 md:py-24` down to `py-8 md:py-12`.

**Why:** 4 pain blocks currently have ~96px padding on each side which makes the section read as 4 separate breathing-room moments instead of one tight unit. Section wrapper padding stays unchanged.

### 3b. Add TLDR strip + anchor nav

**Position:** Directly under H1 in the hero section.

**Content:**
```
[eyebrow] THE SHORT VERSION [/eyebrow]

• Site, SEO, ads, reviews, reports — I run all of it
• 3 tiers: $599, $1,260, or $2,200/mo
• Month-to-month — cancel any month with 72 hours notice

Skip to: [Pricing] · [How it works] · [Am I a fit?]
```

**Anchors:** `#pricing`, `#how-it-works`, `#fit`. Add `id` + `scroll-mt-20` to matching sections. The "Am I a fit?" anchor links to the existing "Think we're a fit?" section — the wording mismatch is intentional (anchors are scannable shortform, section heading is conversational longform).

### 3c. Add /contractors text marquee

**Position:** Below hero, above the pain grid section.

**Style:** Single line, slower scroll, all SOLID text (homepage is solid+outlined two-line — different setting per page so homepage stays the boldest).

**Content (16 industries, in this exact order — lighter trades up front, hard-surface trades grouped at end):**
> Power Washing · Window Washing · Landscaping · Snow Removal · Cleaning · Janitorial · Lighting Installation · Junk Removal · Roofing · HVAC · Plumbing · Electrical · Painting · Concrete · Paving · Paver Restoration

### 3d. Add /contractors motion

- **Gradient drift on hero** — use the same gradient drift as the homepage hero. Subtle, atmospheric. Restores the signature element that's missing from this page.
- **One-shot count-up on "84 clients" line** — when it scrolls into view (1.2s, ease-out, fires once, never loops). Editorial counter, not widget.
- **cta-orbit on final CTA** — extend `cta-orbit` class to the final CTA on this page

### 3e. Final CTA text rename

Change final CTA button text to: **"Tell me about your business →"**

---

## TASK 4 — /portfolio

### 4a. Add logo marquee under hero

**Position:** Directly under hero, above Premier Partners section.

**Style:** LARGE logos, slower scroll than homepage logo trust strip, pause-on-hover, each logo clickable to that brand's site.

**Differentiation from homepage trust strip:** homepage trust strip = small logos, faster, bottom-of-page credibility hit, NOT clickable. /portfolio logo marquee = large logos, slower, top-of-page centerpiece, clickable. Same motion vocabulary, different role.

**Content (11 logos, in this exact order — alternates Premier with non-Premier, only 1 Premier pair in middle, clean loop seam):**

| # | Logo | File | URL |
|---|---|---|---|
| 1 | Premier Partners | `/portfolio/premier-partners-logo.png` | https://servicesfrompremier.com |
| 2 | MarioScape | `/portfolio/marioscape-logo.png` | https://marioscape.com |
| 3 | Premier Power Washing | `/portfolio/premier-powerwashing-logo.png` | https://powerwashingfrompremier.com |
| 4 | Clean & Green | NEW — see below | https://cleangreenproperty.com |
| 5 | Premier Paver Restoration | `/portfolio/premier-paver-logo.png` | https://paversfrompremier.com |
| 6 | WAF Chicago | `/portfolio/waf-logo.svg` | https://wafchicago.org |
| 7 | Premier Holiday Lighting | `/portfolio/premier-lighting-logo.png` | https://lightingfrompremier.com |
| 8 | Premier Auto Spa | `/portfolio/premier-detailing-logo.png` | https://detailingfrompremier.com |
| 9 | Nour's Barbershop | `/portfolio/nours-logo.png` | https://noursbarbershop.com |
| 10 | Premier Plowing | `/portfolio/premier-plowing-logo.png` | https://plowingfrompremier.com |
| 11 | Shifa Home Care | `/portfolio/shifa-logo.png` | https://shifahomecareservices.com |

**Loop seam:** Shifa → Premier Partners (NP → P) — clean.

**For Clean & Green logo:**
1. Copy `~/Projects/sites/clean-green/public/images/logo.png` to `~/Projects/sites/thekhan/public/portfolio/cleangreen-logo.png`
2. Reference as `/portfolio/cleangreen-logo.png` in code

**Polish notes:**
- `marioscape-logo.png` is 672KB — compress to 50–100KB before adding to marquee (it loads 16+ times in the loop)
- WAF use the `.svg` version (sharper at any size)

### 4b. Add C&G dedicated section

**Position:** Between "Premier Partners" section (sec 2) and "Other Clients" section (currently sec 3, now sec 4).

**Layout:** Single dedicated section. Logo on one side, screenshot on the other (or stacked on mobile). Caption below or beside. Clickable link to live site.

**Content:**
- **Logo:** `/portfolio/cleangreen-logo.png` (copied per Task 4a)
- **Screenshot:** Take fresh screenshot of `https://cleangreenproperty.com` homepage via chrome-devtools MCP (~1200×800), save as `~/Projects/sites/thekhan/public/portfolio/cleangreen-screenshot.jpg`
- **Caption:** "My old company. The phone still rings — and those calls go to the contractors I work with."
- **Link:** "Visit →" → `https://cleangreenproperty.com` (target="_blank")

**Why standalone instead of squeezing into the Other Clients 2×2 grid:** C&G isn't a client (different category); the caption deserves space (not a card label); frames C&G as credibility amplifier ("I built it for myself, here's the proof") rather than 5th client data point.

**Final /portfolio structure:**
1. Hero (with logo marquee at top)
2. Premier Partners (6-brand grid)
3. **C&G dedicated section** (NEW)
4. Other Clients (2×2 grid: MarioScape, Shifa, Nour's, WAF)
5. Contact

### 4c. Add /portfolio motion

- **Stagger reveal on Premier 6-brand logos** — each logo fades in with 100ms stagger when scrolled into view (one-shot, fires once)
- **cta-orbit on final CTA** — extend `cta-orbit` class to the final CTA on this page

### 4d. Final CTA text rename

Change final CTA button text to: **"Tell me about your business →"**

---

## TASK 5 — /about

### 5a. Add TLDR strip + anchor nav

**Position:** Directly under H1 in the hero section.

**Content:**
```
[eyebrow] THE SHORT VERSION [/eyebrow]

• I'm Omair — based in Deerfield, IL
• Before TheKhan I built my own home service company to 84 clients before closing it
• Now I run the marketing for other contractors and local businesses — so they can focus on the work

Skip to: [How I got here] · [How I work] · [Let's talk]
```

**Anchors:** `#how-i-got-here`, `#how-i-work`, `#contact`. Add `id` + `scroll-mt-20` to matching sections.

### 5b. Update Mar '26 timeline copy + drop idiom

**File:** `src/pages/AboutPage.tsx`, in the origin arc timeline.

**Current copy (Mar '26 entry):**
> "I closed Clean & Green Property Care and went all in on TheKhan. The phone still rings from the SEO work I did. I know what that seat feels like — so I treat every business I work with like my own."

**New copy (Option Y, locked):**
> "I closed Clean & Green Property Care and went all in on TheKhan. The phone still rings from the SEO work I did — calls I now forward to the contractors I work with."

**Why:**
- Drops "I know what that seat feels like" (idiom — violates voice rule "no idioms in client text")
- Drops "treat every business like my own" (already said in handshake section above — redundancy)
- Adds C&G-as-lead-source mention for sitewide consistency with /portfolio C&G caption
- Lands the timeline on proof (phone still rings) + selling point (calls go to current clients)

### 5c. NO marquee on /about

This is an exception to Option B (marquee on every page). Reason: /about is the narrative page; the handshake hero ("Every business has two jobs / Doing — Getting / The second one is all I do now") is the strongest single block on the entire site. Sticking a scrolling ticker right under it dilutes the strongest moment. Marquee content categories (services, promises, industries, logos) don't fit a personal narrative page anyway.

### 5d. Add /about motion (5 moments)

1. **Hero word stagger** — "Doing" appears, then "Getting" 200ms later, then "The second one is all I do now". Fires once on page load. Editorial typographic beat.
2. **Scroll-triggered portrait reveal** — clip-path wipe on the Omair photo when it scrolls into view. Fires once.
3. **Origin-arc timeline reveal** — each timeline entry (Jun '24, Jan '25, Oct '25, Late '25, Mar '26) fades in as it scrolls into view. Uses existing fade-in family — no new animation type.
4. **Sticky date markers** — date label (Jun '24, Jan '25, etc.) pins to left margin as user reads each entry, releases when they exit that block. NYT longform pattern. Not really an animation — costs zero from animation cap.
5. **cta-orbit on final CTA** — extend `cta-orbit` class to the final CTA on this page

### 5e. Final CTA text rename

Change final CTA button text to: **"Tell me about your business →"**

---

## TASK 6 — Homepage

### 6a. Final CTA text rename ONLY

**File:** `src/pages/HomePage.tsx`, line 302

**Change:** Final CTA button text from current "Text me →" (or whatever it currently says) to: **"Tell me about your business →"**

**Do NOT touch anything else on the homepage.** Hero, marquee, trust strip, "What's Different" section, gallery, pull quote — all stay as-is.

---

## TASK 7 — Sitewide CTA pattern (cross-cutting)

### CTA pattern locked sitewide:

| Position | Text | Animation |
|---|---|---|
| Nav (top) | "Let's talk →" | Static, no animation |
| Bottom of every page (final CTA) | "Tell me about your business →" | `cta-orbit` animation |

**Why split:**
- Nav = always-visible, scannable, fast → short + functional + static
- Bottom = the closer after they've read everything → longer + more inviting + animated
- Same words in both spots = repetitive — they need different roles

This means:
- Nav stays "Let's talk →" sitewide (already correct on most pages — verify)
- All 5 page bottoms (homepage, /websites, /contractors, /portfolio, /about) get cta-orbit + "Tell me about your business →" rename

---

## TASK 8 — MEMORY.md update

**File:** `~/.claude/projects/-Users-khan/memory/MEMORY.md`

**Find:** `Positioning: "Your digital partner"`

**Replace with:** `Positioning: "Your marketing partner"`

**Why:** Live site uses "your marketing partner" (Layout.tsx:163, locked in site-redesign-continuation.md). MEMORY.md still has the old phrase. Future sessions reading the memory will reintroduce stale wording if not updated.

Note: this is OUTSIDE the codebase. Don't commit this in the thekhan repo.

---

## Acceptance criteria

After all tasks executed, verify on localhost (`http://127.0.0.1:5173`):

- [ ] WavesBackdrop file deleted, no broken imports
- [ ] /websites: 8 sections in correct order (Hero / Pricing / On Platforms / Dashboard / Process / What's Not Included / FAQ / Contact)
- [ ] /websites: TLDR strip visible under H1, 3 anchor links work
- [ ] /websites: text marquee visible below hero, 8 items scrolling, all outlined style, slower than homepage
- [ ] /websites: H1 has scroll-triggered text reveal on page load
- [ ] /websites: at least one sticky pull-quote works as user scrolls past
- [ ] /websites: final CTA = "Tell me about your business →" with cta-orbit
- [ ] /contractors: TLDR strip visible under H1, 3 anchor links work (Pricing, How it works, Am I a fit?)
- [ ] /contractors: 4 pain blocks have tighter inter-block padding (was py-16 md:py-24, now py-8 md:py-12)
- [ ] /contractors: text marquee visible below hero, 16 industries scrolling, all solid style
- [ ] /contractors: hero has gradient drift (matches homepage)
- [ ] /contractors: "84 clients" line counts up once when scrolled into view
- [ ] /contractors: final CTA = "Tell me about your business →" with cta-orbit
- [ ] /portfolio: logo marquee visible under hero, 11 logos large/slow/clickable/pause-on-hover
- [ ] /portfolio: C&G dedicated section between Premier and Other Clients
- [ ] /portfolio: cleangreen-logo.png and cleangreen-screenshot.jpg exist in public/portfolio/
- [ ] /portfolio: Premier 6-brand logos stagger-reveal on scroll
- [ ] /portfolio: final CTA = "Tell me about your business →" with cta-orbit
- [ ] /about: TLDR strip visible under H1, 3 anchor links work
- [ ] /about: Mar '26 timeline copy updated to Option Y
- [ ] /about: hero word stagger fires on page load (Doing → Getting → The second one)
- [ ] /about: portrait clip-path reveal on scroll into view
- [ ] /about: timeline entries fade in on scroll
- [ ] /about: sticky date markers pin to left margin during timeline section
- [ ] /about: NO marquee
- [ ] /about: final CTA = "Tell me about your business →" with cta-orbit
- [ ] Homepage: final CTA renamed to "Tell me about your business →" (everything else unchanged)
- [ ] Nav CTA still says "Let's talk →" sitewide
- [ ] All 5 pages render on mobile + desktop viewports without layout breaks
- [ ] Screenshots taken of each page (mobile + desktop) for review

---

## Screenshot review

After all tasks complete, take screenshots of:
- Each of 5 pages on **mobile** (375×667 viewport)
- Each of 5 pages on **desktop** (1440×900 viewport)
- Plus close-ups of: each marquee in motion, the cta-orbit button, the /about hero word stagger, the C&G section

Drop into `~/Projects/sites/thekhan/docs/screenshots-2026-05-09/` and ping back to discussion session for review.

---

## NOT in this brief (parked for later sessions)

- OG images (5 per-page social previews) — separate session
- /local-businesses page — separate session, bigger task
- Worker /contractors out of sync with React (FAQ schema 5 vs 7) — separate session, low priority
- DOM double-injection on hydration — separate session, cosmetic only
- CMD tier sync — separate session
- Agreement files refresh (8 files in Obsidian) — separate session
- Calvin email send — Omair handles personally tomorrow morning

---

**End of brief.**
