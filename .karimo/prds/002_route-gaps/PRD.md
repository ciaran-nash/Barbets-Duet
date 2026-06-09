# PRD: Route Gaps — Stub Missing Sitemap Routes

**Slug:** route-gaps  
**Branch:** feature/barbets-duet-full-build  
**Status:** draft  
**Complexity:** 13 points (6 tasks, all Sonnet)  
**Created:** 2026-06-09

---

## 1. Problem Statement

Several routes referenced in navigation, internal links, and the sitemap return 404. Specifically:

- `components/About.tsx` has a live `<Link href="/research">` that 404s in production
- `components/Blog7Demo.tsx` has `buttonUrl: "#"` and placeholder post URLs that should point to real routes
- `components/Header.tsx` has `/research` commented out pending the route being built (TODO(T25))
- `/faq`, `/blog`, `/news`, `/research`, and all `/legal/*` pages are absent from the `app/` directory
- `/sites/[id]` is a legacy stub with hardcoded picsum data that predates the `learning-sites` route and is unused

These gaps block finalising navigation, create broken links in the live site, and leave the sitemap incomplete.

---

## 2. Goals

- Stub all missing routes so navigation resolves without 404s
- Reuse existing `FAQSection` component for `/faq` (zero new content needed)
- Establish consistent page structure (Header + StickyFooter + motion components) for all new pages
- Delete the legacy `/sites/[id]` route safely
- Uncomment the `/research` nav link in Header once the route exists
- Update `Blog7Demo` placeholder `"#"` URLs to point to real routes

---

## 3. Non-Goals

- No Sanity CMS integration (no lib/sanity/, no schemas) — content is static/hardcoded for now
- No pagination, search, or filtering
- No real legal text (placeholder copy only — flagged with TODO for legal review before production)
- No new Sanity schemas

---

## 4. Route Inventory

### 4.1 Blog Routes

| Route | Type | Notes |
|---|---|---|
| `/blog` | Index page | Wraps existing `Blog7` block component. Update `Blog7Demo.buttonUrl` from `"#"` to `"/blog"`. |
| `/blog/[slug]` | Detail page | Stub — static placeholder. Post URLs in `Blog7Demo` updated to `/blog/post-1`, etc. |

### 4.2 News Routes

| Route | Type | Notes |
|---|---|---|
| `/news` | Index page | Parallel pattern to `/blog`. Static placeholder data. |
| `/news/[slug]` | Detail page | Stub — static placeholder. |

### 4.3 FAQ Page

| Route | Type | Notes |
|---|---|---|
| `/faq` | Standalone page | Wraps existing `FAQSection` component directly. No new content. |

### 4.4 Research Page

| Route | Type | Notes |
|---|---|---|
| `/research` | Index/placeholder page | Unblocks live `href="/research"` in `About.tsx`. Uncomment nav link in `Header.tsx` (remove TODO(T25) comment). |

### 4.5 Legal Pages

| Route | Type | Notes |
|---|---|---|
| `/legal/privacy` | Static page | Placeholder copy. TODO: replace with real legal text before production. |
| `/legal/terms` | Static page | Placeholder copy. TODO: replace with real legal text before production. |
| `/legal/cookies` | Static page | Placeholder copy. TODO: replace with real legal text before production. |

### 4.6 Legacy Route Deletion

| Route | Action | Safety |
|---|---|---|
| `/sites/[id]` | Delete entire `app/sites/` directory | Safe — zero inbound `href` references found across all `app/` and `components/` files |

---

## 5. Design & UX Notes

**Page structure pattern** (follow existing `stories`, `events` pages):
- `Header` (fixed, handles scroll state)
- `main` with `relative` overflow-x-hidden
- `ScrollGlow` ambient decoration (optional for simpler pages)
- `KineticReveal` on headings
- `CTA` section before footer (optional for legal pages)
- `StickyFooter`

**Legal pages:** Minimal layout. No CTA. Clean prose. Clear "placeholder" banner at top until real copy is supplied.

**Research page:** Should feel substantive — even as a stub, use a section heading, a short description of research intent, and a "coming soon" card grid or empty state. This route is live-linked from `About.tsx`.

---

## 6. Technical Notes

- Framework: Next.js 15 App Router, TypeScript strict
- Tailwind v4 — config in `app/globals.css`
- No `require_review` files are modified
- `Header.tsx` change: uncomment 2 lines in `communityDropdownData` Resources section
- `Blog7Demo.tsx` change: update `buttonUrl` and 3 post `url` fields from `"#"` to real paths
- Legal pages: add layout file at `app/legal/layout.tsx` for shared wrapper, or inline per page
- All new pages: use `export const metadata` for SEO

---

## 7. Acceptance Criteria

- [ ] All 10 new routes resolve without 404
- [ ] `/faq` renders the existing `FAQSection` component with full functionality
- [ ] `/research` renders without error; `About.tsx` link resolves
- [ ] Header nav "Research Hub" link is uncommented and active
- [ ] `Blog7Demo` "Explore all posts" button links to `/blog`
- [ ] `/sites/[id]` returns 404 (directory deleted)
- [ ] `npx tsc --noEmit` passes
- [ ] `next build` passes
