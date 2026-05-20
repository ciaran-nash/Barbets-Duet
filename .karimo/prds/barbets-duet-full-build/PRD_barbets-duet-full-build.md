# PRD: Barbets Duet — Full Platform Build

**Slug:** `barbets-duet-full-build`
**Created:** 2026-05-20
**Status:** ready
**Author:** ciaran-nash

---

## Executive Summary

Barbets Duet is a 20-year experiment (2008–2028) building new economic systems that reward ecological stewardship over extraction. The website is the primary interface between the global Jumuiya network of 13 real conservation Learning Sites and three audiences: people who want to **discover** sites, **volunteer** at them, or **sponsor/donate** to the organisation or specific sites.

This PRD covers the full platform build from current state (functional skeleton, 2 real learning sites, static data) to a complete, launched product backed by Sanity CMS and managed by non-dev Barbets Duet staff.

---

## Vision

> Discover and connect with real conservation learning sites worldwide → apply as a volunteer → sponsor or donate to the organisation or a specific learning site.

**Success = all three user journeys functional in production.**

---

## Organisation Context

- **Jumuiya:** Community of 13 Learning Sites across Kenya, Uganda, Tanzania, UK, USA
- **Core metaphor:** Mosaic Rights over Column Rights — footpaths over fences, shared stewardship over extraction
- **Three revenue pillars:** Carbon & Ecosystem Services · Environmental Livelihoods · Knowledge Markets
- **2028 horizon:** Generational handover, proof that restoration drives livelihood
- **Key terms in UI:** Learning Site (not "location"), Jumuiya (network), Abundance of Life (value prop)

---

## Users & Audiences

| Audience | Primary action | Entry point |
|---|---|---|
| Conservation-curious public | Discover & explore sites | `/learning-sites` browse |
| Prospective volunteers | Apply to join a site | `/get-involved` |
| Donors & sponsors | Give to org or specific site | `/support-us` |
| Barbets Duet staff (non-dev) | Publish and edit content | Sanity Studio |
| Site managers (SCAs) | View their site, report | Dashboard |

---

## Design System

**Designed by @digitalorchard.design — "Scholarly Cycle" aesthetic.**

### Colour (STRICT — only these 5 permitted)
| Name | HEX | Role |
|---|---|---|
| Neon Lime | `#DBFF66` | Primary accent, CTAs, Neon highlights |
| Viridian | `#006F53` | Brand green, buttons, active states |
| Night Forest | `#06211A` | Dark mode background, headings |
| White | `#FFFFFF` | Light mode content surfaces |
| Platinum | `#F4F4F5` | Light mode background |

Shades at 20/40/60/80/100% opacity permitted for sub-elements.

### Typography
- **Headings:** BioRhyme (Google Fonts) — SemiBold & ExtraBold. Slab-serif, expressive, literary.
- **Body:** DM Sans (Google Fonts) — Medium & SemiBold. Clean geometric humanist sans.
- Type scale: H1 ExtraBold 56pt/64pt −4% tracking · H2 Bold 40/48pt · H3 SemiBold 36/42pt · H4 Bold 28/36pt

### Agent Skills (apply to all component work)
- `design-taste-frontend` — anti-slop rules, motion physics, performance guardrails. **Applied to every task.**
- `redesign-existing-projects` — audit + upgrade existing components without breaking functionality. **Primary skill for T01 brand audit.** Fix priority: font swap → colour cleanup → hover states → layout → components → states → polish.
- `high-end-visual-design` — Awwwards-tier premium sections. Double-bezel nested architecture, spring physics, scroll reveals. **Applied to new builds: T06, T12, T15.**
- `stitch-design-taste` — DESIGN.md design system source of truth. **Applied to T01 + T28.**
- `brandkit` — brand imagery generation, OG images, marketing assets.

### Aesthetic Dials
- DESIGN_VARIANCE: 8 (asymmetric, Scholarly Cycle)
- MOTION_INTENSITY: 6 (fluid, not theatrical)
- VISUAL_DENSITY: 4 (gallery-airy, conservation content breathes)

---

## Technology Stack

### Existing (keep)
- Next.js 15 App Router · React 19 · TypeScript strict
- Tailwind CSS v4 (config in `globals.css`)
- Firebase Auth (Google OAuth) + Firestore
- Framer Motion (`components/motion/`)
- shadcn/ui (`components/ui/`)

### Adding this PRD
| Tech | Purpose | Cost |
|---|---|---|
| Zod | Form validation (volunteer, donation) | Free |
| Sanity CMS | Content management for non-dev staff | Free tier |
| Stripe | Donation/sponsorship payments | Free to integrate |
| PayPal SDK | Donation alternative | Free to integrate |
| MapLibre GL JS | Learning sites browse map (styled) | Free |
| Stadia Maps | Map tile hosting | 200k tiles/month free |
| Umami | Privacy-first analytics | 100k events/month free |
| Arcjet | Bot protection on forms | 10k req/month free |
| Resend | Transactional email (form confirmations) | 3k emails/month free |
| AI SDK + OpenRouter | Search, future multilingual support | Free models available |

---

## Execution Plan (Wave Model)

### Wave 1 — Foundation (no dependencies)
| ID | Task | Complexity |
|---|---|---|
| T01 | **Brand audit** — align globals.css tokens to brand HEX, install BioRhyme + DM Sans, sweep components for off-brand colours, generate DESIGN.md skeleton via stitch-design-taste | 3 |
| T02 | **Seed 13 learning sites** — populate lib/data/learning-sites.ts with all real site data from CSV + research findings | 3 |
| T03 | **Add Zod** — form schema validation library + initial schemas for volunteer and donation forms | 1 |
| T04 | **Umami analytics** — install script in root layout, verify no cookie consent banner needed | 1 |
| T05 | **Header nav complete** — resolve remaining `#` placeholder hrefs to real routes or explicit TODO markers | 1 |

### Wave 2 — Content Completeness (depends on Wave 1 data)
| ID | Task | Complexity |
|---|---|---|
| T06 | **Learning site 4 missing sections** — Testimonial, Contact, RestorationStrategies, ExploreOtherSites components | 3 |
| T07 | **Stories [slug] detail page** — full cinematic reader with rich text support | 2 |
| T08 | **Events [slug] detail page** — event detail with site link, registration CTA | 2 |
| T09 | **Projects page** — real data structure, project detail drawer | 2 |
| T10 | **About/team page** — extract hardcoded names → types/team.ts + lib/data/team.ts, build /about/team | 2 |
| T11 | **About/careers page** — /about/careers static page | 1 |

### Wave 3 — Discovery (depends on Wave 2)
| ID | Task | Complexity |
|---|---|---|
| T12 | **Learning sites browse/index** — /learning-sites page with MapLibre GL map (Night Forest styled), grid/filter, site cards | 4 |
| T13 | **MapLibre + Stadia Maps setup** — install, custom Night Forest/Neon Lime tile style via Maputnik, React wrapper | 3 |

### Wave 4 — Platform Actions (depends on Wave 2)
| ID | Task | Complexity |
|---|---|---|
| T14 | **Volunteer application form** — /get-involved multi-step form (Zod), Firestore submission, Resend confirmation email, Arcjet bot protection | 3 |
| T15 | **Support-us donations page** — /support-us with general donation + site-tagged donation, Stripe + PayPal stubs (wire real keys later) | 4 |
| T16 | **Arcjet middleware** — rate limiting on /get-involved and /support-us form endpoints | 1 |
| T17 | **Resend email setup** — domain verification, confirmation templates for volunteer application | 2 |

### Wave 5 — CMS (depends on stable data shape from Waves 1–4)
| ID | Task | Complexity |
|---|---|---|
| T18 | **Sanity schema design** — define schemas for LearningSite, Story, Event, Project, TeamMember content types | 4 |
| T19 | **Sanity Studio setup** — create project, configure Studio, deploy to /studio route | 3 |
| T20 | **GROQ queries + next-sanity** — replace lib/data/* imports with GROQ queries, maintain TypeScript types | 4 |
| T21 | **On-demand revalidation** — Sanity webhook → Next.js revalidateTag, instant cache clear on publish | 3 |
| T22 | **Sanity image pipeline** — sanity.io CDN asset delivery, webp/avif transformation, Next.js Image component integration | 2 |
| T23 | **AI SDK + OpenRouter** — site search prep, install, future multilingual support scaffold | 2 |

### Wave 6 — Greenfield (no hard deps, can start anytime after Wave 2)
| ID | Task | Complexity |
|---|---|---|
| T24 | **Community/Jumuiya section** — /community network hub, peer review visualisation, site-to-site connections | 4 |
| T25 | **Research knowledge hub** — /research page, document library, Barbets Game info | 3 |
| T26 | **Blog / News / FAQ** — /blog, /news, /faq pages with Sanity content | 3 |
| T27 | **Admin dashboard** — content overview, volunteer applications management, donation records | 4 |
| T28 | **Full DESIGN.md design system** — complete stitch-design-taste design system document, all components documented | 3 |

---

## Task Dependencies

```
T01 (brand tokens) ──→ all visual tasks
T02 (seed sites)   ──→ T06, T07, T08, T09, T12
T06 (site sections)──→ T12 (browse needs complete site pages)
T12 + T13 (map)    ──→ T18 (Sanity schema must match map data)
T03 (Zod)          ──→ T14, T15
T14, T15 (forms)   ──→ T16, T17
Wave 1–4 stable    ──→ T18–T22 (Sanity)
T18–T22 (Sanity)   ──→ T24–T27 (Greenfield content)
```

**Longest chain:** T01 → T02 → T06 → T12 → T18 → T20 → T24

---

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Sanity schema doesn't match evolved TypeScript types | High — data doesn't flow | Freeze LearningSite type shape after Wave 1 seeding. No breaking changes after T02 |
| 11 learning site real content not provided | High — Wave 2 blocks | Minimum data set: name, location, manager, focus, 1 image per site. Can supplement with CSV data |
| MapLibre custom tile style complexity | Medium | Use Maputnik (open-source editor) for Night Forest style. Stadia fallback tiles as backup |
| Stripe/PayPal live keys not ready at Wave 4 | Low — stubs work for launch | Stubs with test keys throughout. Real keys plugged in pre-launch |
| Sanity free tier limits hit | Low at launch scale | 500k API req/month + 20GB bandwidth. Monitor. Upgrade only when needed |

---

## File Boundaries (DO NOT TOUCH)

- `.env*`, `firebase-applet-config.json`, `firestore.rules`, `firestore.indexes.json`
- `components/ui/` — shadcn/ui primitives, regenerate with CLI only

**Review required before changing:**
- `lib/firebase.ts` — Firebase client init
- `components/AuthProvider.tsx` — Google OAuth session
- `app/layout.tsx` — root layout, affects entire app

---

## External Dependencies (pre-work needed)

| Dependency | Needed for | Action |
|---|---|---|
| Sanity account + project | Wave 5 | Create at sanity.io before Wave 5 |
| Stadia Maps API key | Wave 3 | Free signup at stadiamaps.com |
| Stripe test keys | Wave 4 | Create at stripe.com |
| PayPal sandbox credentials | Wave 4 | Create at developer.paypal.com |
| Resend domain verification | Wave 4 | DNS record on production domain |
| Real content for 11 sites | Wave 1 T02 | CSV data available as baseline |

---

## Success Metrics

| Metric | Target |
|---|---|
| All 13 learning sites live with real content | Wave 2 complete |
| /learning-sites browse map renders | Wave 3 complete |
| Volunteer form submits to Firestore + sends email | Wave 4 complete |
| Donation page live (test mode) | Wave 4 complete |
| Non-dev staff can publish content via Sanity Studio | Wave 5 complete |
| All brand colours + fonts compliant | Wave 1 T01 complete |
| No 404s from Header nav links | Wave 1 T05 complete |

---

## Commit Convention

```
feat(scope): add new page or feature
fix(scope): correct a bug
refactor(scope): restructure without behavior change
docs(karimo): PRD/planning artifacts
style(scope): brand/CSS token changes
chore(scope): dependencies, config
```
