# KARIMO Backlog

Sitemap-gap PRDs queued behind active work. Source: `project_sitemap_architecture` memory verified 2026-06-09 (3 critical blockers from original memory now CLOSED).

## Active

- **community-network** — `/community/*` routes, jumuiya governance, network browse. Research pending.

## Queued

### PRD-A: route-gaps
Stub greenfield routes still missing from sitemap.
- `/blog`, `/news` (article index + slug pages)
- `/faq` (extract existing FAQSection homepage component into standalone page)
- `/research` (publications/papers index)
- `/legal/*` (privacy, terms, cookies)
- Delete legacy `/sites/[id]` stub
- Status: not started

### PRD-C: data-model-unify
Schema cleanup before more content lands.
- Add `siteSlug` to `BarbetsEvent` (events cannot filter by learning site)
- Add reverse `projects[]` link on `LearningSite`
- Convert `story.content` from plain string → rich text (PortableText or MDX)
- Unify `ImpactMetric` (narrative.ts) + `ImpactStat` (learning-site.ts) + `ProjectImpact` (project.ts) into single shared type
- Status: not started

### PRD-D: admin-portal
Auth-gated CMS for non-technical editors.
- `/admin` dashboard (content CRUD)
- `/superadmin` (user/role management)
- Role-gated middleware
- Decide CMS path: Sanity (already referenced in graph) vs custom Firestore admin
- Status: not started

## Notes
- Sequence recommendation: C → A → B → D (schema first, then routes, then community, admin last)
- All blocked tasks from PRD `001_barbets-duet-full-build` waves 5+ should be resolved first
