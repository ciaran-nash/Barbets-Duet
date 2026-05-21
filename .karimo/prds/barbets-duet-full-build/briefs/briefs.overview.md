# Briefs Overview: barbets-duet-full-build

Generated after all 28 task briefs are complete.

## Task Summary

| Task | Title | Wave | Complexity | Priority | Model |
|------|-------|------|------------|----------|-------|
| [T01](T01_barbets-duet-full-build.md) | Brand audit & design system bootstrap | 1 | 3 | must | sonnet |
| [T02](T02_barbets-duet-full-build.md) | Seed all 13 real learning sites | 1 | 3 | must | sonnet |
| [T03](T03_barbets-duet-full-build.md) | Add Zod validation library | 1 | 1 | must | sonnet |
| [T04](T04_barbets-duet-full-build.md) | Umami analytics installation | 1 | 1 | should | sonnet |
| [T05](T05_barbets-duet-full-build.md) | Complete Header nav routes | 1 | 1 | must | sonnet |
| [T06](T06_barbets-duet-full-build.md) | Learning site 4 missing page sections | 2 | 3 | must | sonnet |
| [T07](T07_barbets-duet-full-build.md) | Stories slug detail page | 2 | 2 | must | sonnet |
| [T08](T08_barbets-duet-full-build.md) | Events slug detail page | 2 | 2 | must | sonnet |
| [T09](T09_barbets-duet-full-build.md) | Projects page real structure | 2 | 2 | should | sonnet |
| [T10](T10_barbets-duet-full-build.md) | About/team page | 2 | 2 | must | sonnet |
| [T11](T11_barbets-duet-full-build.md) | About/careers page | 2 | 1 | could | sonnet |
| [T12](T12_barbets-duet-full-build.md) | Learning sites browse/index page | 3 | 4 | must | opus |
| [T13](T13_barbets-duet-full-build.md) | MapLibre GL JS + Stadia Maps setup | 3 | 3 | must | sonnet |
| [T14](T14_barbets-duet-full-build.md) | Volunteer application form | 4 | 3 | must | sonnet |
| [T15](T15_barbets-duet-full-build.md) | Support-us donations page | 4 | 4 | must | opus |
| [T16](T16_barbets-duet-full-build.md) | Arcjet middleware | 4 | 1 | should | sonnet |
| [T17](T17_barbets-duet-full-build.md) | Resend email setup | 4 | 2 | should | sonnet |
| [T18](T18_barbets-duet-full-build.md) | Sanity schema design | 5 | 4 | must | opus |
| [T19](T19_barbets-duet-full-build.md) | Sanity Studio setup | 5 | 3 | must | sonnet |
| [T20](T20_barbets-duet-full-build.md) | GROQ queries + next-sanity integration | 5 | 4 | must | opus |
| [T21](T21_barbets-duet-full-build.md) | On-demand revalidation via Sanity webhooks | 5 | 3 | must | sonnet |
| [T22](T22_barbets-duet-full-build.md) | Sanity image pipeline | 5 | 2 | should | sonnet |
| [T23](T23_barbets-duet-full-build.md) | AI SDK + OpenRouter scaffold | 5 | 2 | could | sonnet |
| [T24](T24_barbets-duet-full-build.md) | Community/Jumuiya network section | 6 | 4 | should | opus |
| [T25](T25_barbets-duet-full-build.md) | Research knowledge hub | 6 | 3 | should | sonnet |
| [T26](T26_barbets-duet-full-build.md) | Blog / News / FAQ pages | 6 | 3 | could | sonnet |
| [T27](T27_barbets-duet-full-build.md) | Admin dashboard | 6 | 4 | could | opus |
| [T28](T28_barbets-duet-full-build.md) | Full DESIGN.md design system | 6 | 3 | should | sonnet |

---

## Wave Breakdown

### Wave 1 — Foundation (no dependencies, run T01 first)
- **T01** — Brand tokens: align globals.css to exact HEX palette, generate DESIGN.md skeleton. Must complete before all other visual work.
- **T02** — Seed 13 sites: populate all 13 LearningSite entries with lat/lng coordinates. Freezes the type shape.
- **T03** — Zod: install + create volunteer and donation schemas. Required by T14, T15.
- **T04** — Umami: add analytics script to root layout. No cookie banner needed.
- **T05** — Header nav: replace all `href="#"` placeholders. Fix "Get Involved" pointing to wrong route.

### Wave 2 — Content Completeness (after Wave 1)
- **T06** — 4 missing site sections: SiteTestimonial, SiteContact, SiteRestorationStrategies, ExploreOtherSites. Needs T01+T02.
- **T07** — Stories detail page: add markdown rendering, site backlink, impact metrics to CinematicReader.
- **T08** — Events detail page: build `/events/[slug]` from scratch, follow stories pattern.
- **T09** — Projects page: add ProjectDetailDrawer, category/maturity filters.
- **T10** — Team page: extract data to `types/team.ts` + `lib/data/team.ts`, build `/about/team`.
- **T11** — Careers page: static `/about/careers` with internship, SCA role, youth programme content.

### Wave 3 — Discovery (after Wave 2)
- **T13** — MapLibre setup: install react-map-gl + maplibre-gl, Night Forest tile style, SitesMap component. T13 must complete before T12.
- **T12** — Browse page: `/learning-sites` map + filterable grid, cross-highlighting. Depends on T02+T06+T13.

### Wave 4 — Platform Actions (after Wave 2, can run parallel to Wave 3)
- **T16** — Arcjet middleware: rate limiting + bot protection. Independent, no upstream deps.
- **T17** — Resend email: install, domain verification, VolunteerConfirmation + DonationReceipt templates.
- **T14** — Volunteer form: multi-step `/get-involved` form, Firestore + Resend. Needs T03+T16+T17.
- **T15** — Donations page: `/support-us` with Stripe + PayPal test integration. Needs T02+T03.

### Wave 5 — CMS Migration (after Waves 1–4 stable)
- **T18** — Sanity schemas: 5 content types matching TypeScript types exactly. Needs T02+T06+T07+T08+T09+T10.
- **T19** — Studio setup: deploy to `/studio` route, migrate seed content. Needs T18.
- **T20** — GROQ queries: replace lib/data imports with Sanity fetches + cache tags. Needs T19.
- **T22** — Image pipeline: @sanity/image-url + SanityImage component. Needs T19. Can parallel T20.
- **T21** — Revalidation: webhook handler + revalidateTag(). Needs T20.
- **T23** — AI SDK: OpenRouter search endpoint scaffold. Independent.

### Wave 6 — Greenfield (after Wave 5, all can run parallel)
- **T24** — Community/Jumuiya: circular peer review SVG visualisation at `/community`. Needs T20.
- **T25** — Research hub: document library at `/research`. Needs T20.
- **T26** — Blog/News/FAQ: three content pages with Sanity backing. Needs T20.
- **T27** — Admin dashboard: Firebase Auth role-based `/admin` with applications + donations management. Needs T14+T15+T20.
- **T28** — Full DESIGN.md: complete design system doc. Needs T01 (can run after all waves for accuracy).

---

## File Overlap Analysis

| File | Tasks | Potential Conflict |
|------|-------|-------------------|
| `app/globals.css` | T01 | Solo — T01 owns this |
| `app/layout.tsx` | T01, T04 | Low — T01 reviews fonts, T04 adds Script tag |
| `components/Header.tsx` | T05, T10 | Low — T05 fixes hrefs, T10 adds team link |
| `types/learning-site.ts` | T02 | FROZEN after T02 — no further changes |
| `lib/data/learning-sites.ts` | T02 | Solo — T02 owns this entirely |
| `lib/schemas/volunteerApplication.schema.ts` | T03, T14 | Low — T03 creates stub, T14 may refine |
| `lib/schemas/donation.schema.ts` | T03, T15 | Low — T03 creates stub, T15 refines |
| `app/learning-sites/[slug]/LearningSiteContent.tsx` | T06 | Solo — only T06 touches this |
| `package.json` | T03, T04, T07, T13, T14, T15, T16, T17, T22, T23 | Sequential — each adds different deps |
| `sanity/schemaTypes/index.ts` | T18, T26 | T18 creates, T26 adds 3 more schemas |
| `.env.local.example` | T04, T13, T15, T16, T17, T19, T21, T23 | Additive only — each adds new vars |

---

## Critical Path

**Longest chain (7 tasks, complexity 23):**
```
T01 → T02 → T06 → T12 → T18 → T20 → T24
```

Complete this chain to unlock the full platform.

---

## External Pre-requisites

Before starting Wave 3:
- Stadia Maps API key (free signup at stadiamaps.com)

Before starting Wave 4:
- Stripe test keys (stripe.com)
- PayPal sandbox credentials (developer.paypal.com)
- Resend domain verification DNS records

Before starting Wave 5:
- Sanity account + project created at sanity.io
- All TypeScript types confirmed frozen (no changes after T02)

---

## Quick Links

- [PRD](../PRD_barbets-duet-full-build.md)
- [Execution Plan](../execution_plan.yaml)
- [Tasks](../tasks.yaml)
- [Research Findings](../research/findings.md)

---

*28 briefs generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Generated: 2026-05-20*
