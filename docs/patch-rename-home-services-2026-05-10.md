# Patch — Rename /contractors → /home-services + 2-Row Marquees (2026-05-10)

**Source:** Discussion-session decision after audience analysis
**Goal:** Rename the contractor audience page to home services (URL, label, copy, all references). Add 2-row marquees to both /home-services (new) and /local-services (existing).
**Last updated:** 2026-05-10

---

## CRITICAL — Production Safety Rule

- Localhost first (`bun run dev` → `http://127.0.0.1:5173`)
- Do NOT deploy until Omair confirms after seeing screenshots

---

## TASK 1 — Rename `ContractorsPage.tsx` → `HomeServicesPage.tsx` + URL `/contractors` → `/home-services`

### 1a. File rename + content updates

**Action:** rename `src/pages/ContractorsPage.tsx` → `src/pages/HomeServicesPage.tsx`. Update internal references throughout the new file:

| Was | New |
|---|---|
| `function ContractorsPage` | `function HomeServicesPage` |
| Schema IDs: `https://thekhan.io/contractors#service` | `https://thekhan.io/home-services#service` |
| Schema IDs: `https://thekhan.io/contractors#breadcrumb` | `https://thekhan.io/home-services#breadcrumb` |
| Schema IDs: `https://thekhan.io/contractors#faq` | `https://thekhan.io/home-services#faq` |
| Breadcrumb name: "Contractors" | "Home Services" |
| Eyebrow: `FOR CONTRACTORS` | `FOR HOME SERVICES` |
| Hero subhead: `Contractor marketing that makes your phone ring.` | `Home services marketing that makes your phone ring.` |
| Hero CTAs: aria-labels referencing "contractor" | s/contractor/home service/ |
| Tier card aria-labels: "See if Foundation is a fit" → contractor mentions | s/contractor/home service business/ |
| Body copy: any "contractor" references | s/contractor/home service business/ where natural; preserve "contractor" as one of the recognized industry words but not as the page audience identity |
| Micro-strips: 3 strips currently say "contractors" → s/contractors/home service businesses |
| FAQ schema: questions referencing "home service contractors" → "home service businesses" (preserve the contractor word as a vertical mention inside answers if it fits naturally) |

### 1b. App.tsx route update

**File:** `src/App.tsx`

- Import: `import ContractorsPage from "./pages/ContractorsPage"` → `import HomeServicesPage from "./pages/HomeServicesPage"`
- Route: `<Route path="/contractors" element={<ContractorsPage />} />` → `<Route path="/home-services" element={<HomeServicesPage />} />`
- **Add 301 redirect** for `/contractors` → `/home-services` (handled in Worker — see Task 4)

### 1c. Layout.tsx nav update

**File:** `src/components/Layout.tsx`

- NAV_ITEMS: `{ to: "/contractors", label: "For Contractors" }` → `{ to: "/home-services", label: "For Home Services" }`

### 1d. HomePage.tsx button update

**File:** `src/pages/HomePage.tsx`

- Button text: `"I want to grow my contracting business →"` → `"I want to grow my home service business →"`
- Route: `to="/contractors"` → `to="/home-services"`

---

## TASK 2 — /home-services 2-row marquee (replaces existing single-row)

**File:** `src/pages/HomeServicesPage.tsx` (the renamed file)

**Replace existing single-row text marquee with 2-row pattern (similar visual treatment as homepage marquee — solid + outlined).**

**Row 1 (solid, 10 items — exterior + cleaning trades):**
> Power Washing · Window Washing · Gutter Cleaning · Landscaping · Snow Removal · Cleaning · Janitorial · Lighting Installation · Junk Removal · Painting

**Row 2 (outlined, 9 items — structural + heavy trades):**
> Roofing · HVAC · Plumbing · Electrical · Concrete · Paving · Paver Restoration · Renovation · Demolition

**New additions vs. old marquee:**
- + Gutter Cleaning
- + Renovation
- + Demolition

**Implementation hint:** if the existing TextMarquee component supports a 2-row variant (homepage uses one), reuse it. If not, render two `<TextMarquee>` instances stacked, with row 2 styled outlined and slightly slower to differentiate.

**Visual hierarchy:** homepage stays the "loudest" 2-row marquee (services list — Websites · SEO · etc.). /home-services has its OWN 2-row marquee (industries list). Different content = visually distinct even though both are 2-row. Same motion family.

---

## TASK 3 — /local-services 2-row marquee (replaces existing single-row)

**File:** `src/pages/LocalServicesPage.tsx`

**Replace single-row category marquee with 2-row pattern: row 1 = 8 categories (current), row 2 = specific verticals.**

**Row 1 (solid, 8 categories — current):**
> Healthcare · Dental · Real Estate · Financial Planning · Tax Services · Beauty & Wellness · Pet Services · Personal Services

**Row 2 (outlined, 12 specific verticals — examples within the buckets):**
> Dentists · Lawyers · Real Estate Agents · Salons · Barbers · Chiropractors · Personal Trainers · Vets · Tutors · Pet Groomers · Locksmiths · Movers

**Why 2-row works here:**
- Row 1 = categories (visitor self-identifies into a bucket)
- Row 2 = specific verticals (barbershop owner sees "Barbers" explicitly — instant recognition)
- Same 2-row pattern as /home-services creates visual consistency between the two audience pages

---

## TASK 4 — Worker updates

**File:** `worker/index.js`

### 4a. Add 301 redirect for `/contractors` → `/home-services`

Implement at the Worker level (HTTP 301 with Location header). The Worker is hit before any React routing.

```js
// Top of fetch handler — handle redirects before everything else
if (url.pathname === "/contractors") {
  return Response.redirect("https://thekhan.io/home-services" + url.search, 301);
}
```

### 4b. Replace ROUTE_META["/contractors"] with ROUTE_META["/home-services"]

Update to reflect new audience word:

```js
"/home-services": {
  title: "Marketing for Home Service Businesses in Chicago | TheKhan",
  description: "Websites, Google Ads, and SEO for Chicago home service businesses. Get your phone ringing every week. You do the work. I make people find you.",
  canonical: "https://thekhan.io/home-services",
  ogImage: "https://thekhan.io/home-services-og.png",
  ogType: "website",
},
```

Delete the old `/contractors` entry.

### 4c. Replace ROUTE_SCHEMAS["/contractors"] with ROUTE_SCHEMAS["/home-services"]

- All `@id` references: `https://thekhan.io/contractors#X` → `https://thekhan.io/home-services#X`
- Service name: `Home Service Contractor Marketing` → `Home Service Business Marketing` (or similar — preserve clarity)
- Service description: s/contractors/home service businesses/ where natural
- FAQ questions: "How much does marketing for home service contractors cost?" → "How much does marketing for home service businesses cost?" (or similar)
- BreadcrumbList: position 2 name "Contractors" → "Home Services"

### 4d. Worker handles old URL gracefully

If a crawler hits `/contractors` directly (because it's still cached or linked from elsewhere), the 301 redirect serves the new URL. Cloudflare will pass that on. Old SEO equity transfers to new URL.

---

## TASK 5 — Sitemap update

**File:** `public/sitemap.xml`

- Replace `<loc>https://thekhan.io/contractors</loc>` with `<loc>https://thekhan.io/home-services</loc>`
- Update lastmod to 2026-05-10
- All other URLs unchanged

---

## TASK 6 — OG image regenerate

**File:** `scripts/generate-og.ts`

The /home-services OG image needs to update because the subhead text changes from "Contractor marketing that makes your phone ring." to "Home services marketing that makes your phone ring."

**Action:**
- In the PAGES array, rename the entry from `contractors-og.png` to `home-services-og.png`
- Update its `subhead` from `"Contractor marketing that makes your phone ring."` to `"Home services marketing that makes your phone ring."`
- Run `bun scripts/generate-og.ts` to regenerate
- Verify `public/home-services-og.png` exists at 1200×630, ~90KB
- Optionally: keep `public/contractors-og.png` as a fallback OR delete (the 301 redirect will handle anyone hitting old `og:image` URL)

---

## TASK 7 — Sweep for stale "contractor" references

After all renames, do a final grep:

```bash
grep -rn "contractor" src/ worker/ public/ docs/ 2>/dev/null | grep -v node_modules
```

For each match, decide:
- **Keep:** if "contractor" is used as one of multiple recognized industry words inside body copy (e.g., "I work with contractors and home service businesses")
- **Update:** if "contractor" was used as the page audience identity (replace with "home service business")
- **Delete:** if it was a leftover label/title that's now confusing

Specific places to verify:
- `/contractors` URL doesn't appear in any internal `<Link to="...">` references (should all be `/home-services` now)
- Schema descriptions on the LocalBusiness / homepage schema mention "home service businesses" not "home service contractors"
- Any FAQ answers or pull-quote content that talks about audience

---

## Acceptance criteria

- [ ] Page file renamed: `src/pages/ContractorsPage.tsx` → `src/pages/HomeServicesPage.tsx`
- [ ] Function name renamed: `ContractorsPage` → `HomeServicesPage`
- [ ] URL: `https://thekhan.io/home-services` returns 200, all 9 sections render
- [ ] URL: `https://thekhan.io/contractors` returns 301 redirect to `/home-services`
- [ ] Nav shows "For Home Services" between "For Contractors"-position-was and "Portfolio"
- [ ] Homepage button reads "I want to grow my home service business →"
- [ ] /home-services hero eyebrow: "FOR HOME SERVICES"
- [ ] /home-services hero subhead: "Home services marketing that makes your phone ring."
- [ ] /home-services marquee: 2 rows, ~19 industries, includes new Gutter Cleaning + Renovation + Demolition
- [ ] /local-services marquee: 2 rows, row 1 = 8 categories (current), row 2 = 12 specific verticals (Dentists · Lawyers · etc. including Barbers)
- [ ] OG image regenerated as `public/home-services-og.png` with new subhead
- [ ] Worker ROUTE_META + ROUTE_SCHEMAS updated to /home-services
- [ ] 301 redirect implemented in Worker for /contractors → /home-services
- [ ] Sitemap updated
- [ ] tsc -b clean
- [ ] All 5 other public pages (homepage, /websites, /portfolio, /about, /local-services) unaffected
- [ ] grep sweep shows no stale "contractor" page-identity references (industry mentions inside body copy are fine)

---

## Screenshots

Save to `~/Projects/sites/thekhan/docs/screenshots-home-services-rename-2026-05-10/`:
- 01-home-services-desktop.png — full page desktop
- 02-home-services-mobile.png — full page mobile
- 03-home-services-marquee-close.png — close-up of the 2-row marquee on /home-services
- 04-local-services-marquee-close.png — close-up of the 2-row marquee on /local-services
- 05-homepage-3-buttons-updated.png — verify middle button now says "home service business"
- 06-nav-updated.png — verify "For Home Services" in nav
- 07-redirect-test.txt — output of `curl -sI https://thekhan.io/contractors` showing 301 (post-deploy)
- 08-home-services-og.png — regenerated OG image

Hold for review before deploy.

---

## Deploy steps (after Omair confirms screenshots)

1. `bun run build`
2. `wrangler deploy`
3. `git add` specific files (NOT `git add -A`):
   - `src/pages/HomeServicesPage.tsx` (new file)
   - `src/pages/ContractorsPage.tsx` (deleted — git will track)
   - `src/App.tsx`
   - `src/components/Layout.tsx`
   - `src/pages/HomePage.tsx`
   - `src/pages/LocalServicesPage.tsx`
   - `worker/index.js`
   - `public/sitemap.xml`
   - `public/home-services-og.png`
   - `public/contractors-og.png` (delete OR keep as fallback)
   - `scripts/generate-og.ts`
   - `docs/patch-rename-home-services-2026-05-10.md`
   - `docs/screenshots-home-services-rename-2026-05-10/*`
4. `git commit` with HEREDOC:

```
Rename /contractors → /home-services + 2-row marquees on both audience pages

Audience word "contractor" was too narrow — really only fits construction
trades. Cleaning, janitorial, landscaping, snow removal, window washing
all self-identify as "home service company." Page label and URL now
reflect the actual audience.

- File rename: ContractorsPage.tsx → HomeServicesPage.tsx
- URL: /contractors → /home-services with 301 redirect
- Nav label: "For Contractors" → "For Home Services"
- Homepage button: "Grow my contracting business" → "Grow my home service
  business"
- Hero subhead: "Contractor marketing..." → "Home services marketing..."
- Schema, sitemap, worker meta + FAQ all updated
- 2-row marquee on /home-services adds Gutter Cleaning + Renovation +
  Demolition (~19 industries total)
- 2-row marquee on /local-services adds row 2 with specific verticals
  (Dentists, Lawyers, Salons, Barbers, etc.) — barbershop owners now see
  "Barbers" explicitly
- OG image regenerated for new URL + subhead

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

5. `git push origin main`
6. Verify live:
   - `curl -sI https://thekhan.io/home-services` → 200
   - `curl -sI https://thekhan.io/contractors` → 301 with Location: /home-services
   - View source on /home-services — confirm new title + meta + 2-row marquee HTML
   - Visit /local-services — confirm 2-row marquee with categories + specific verticals

---

**End of brief.**
