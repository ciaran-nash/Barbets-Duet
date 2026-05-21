# Research Findings: barbets-duet-full-build

## Organisation Context

Barbets Duet is a **20-year experiment (2008–2028)** building new economic systems that reward ecological stewardship over extraction. Named after tropical Barbet birds that sing in perfect synchronised duets — symbolising the harmonisation of African and Western knowledge.

**Core mission:** Prove that "life value" of a landscape can be translated into rigorous market value. Replace extractive Column Rights (fences, exclusion) with Mosaic Rights (footpaths, shared access, high biodiversity).

**Three revenue pillars:**
1. Carbon & Ecosystem Services (sequestration, watershed protection)
2. Environmental Livelihoods (seaweed soap, seedlings, eco-tourism)
3. Knowledge Markets (structured internships, Barbets Game, curricula)

**Governance:** "Jumuiya" (Kiswahili: community with shared vision). Circular peer review system — each site reviews another in a chain. No top-down hierarchy.

---

## Real Learning Sites (13 confirmed)

| Site | Location | Manager(s) | Ecological Focus |
|---|---|---|---|
| Woodland Valley Farm | Ladock, Cornwall, UK | Chris & Janet Jones | Low-carbon organic farming, carbon sequestration |
| Hannacroix Creek | New Baltimore, Hudson Valley, NY, USA | Barbara Heinzen & Eric Remillard | Freshwater tidal swamp forest restoration |
| Molo (Magode Farm) | Near Tororo, Eastern Uganda | James Magode Ikuya | Mt. Elgon watershed, Kanginima stream |
| Lukenya (Zumula Farm) | 50km outside Nairobi, Kenya | Sammy Muvelah | Dry rangeland, reforestation |
| Seme | Near Kisumu, Lake Victoria, Kenya | Oby & Hilda Obyerodhyambo | Over-cropped land, sacred groves |
| Msichoke Seaweed Growers | Mlingotini, Bagamoyo, Tanzania | Mwajuma Masaiganah | Mangroves, coastal lagoon |
| Mwasama Primary School | Bagamoyo, Tanzania | Mwajuma Masaiganah | Environmental education, botanical collection |
| Himo | Himo, near Moshi, Tanzania | Rose Lyimo & Hans Mtika | Soil fertility, medicinal plant preservation |
| Sikia Community Dam | East Africa (KE/TZ/UG border) | Village cooperatives | Water harvesting, climate resilience |
| Arboretum Kajokoby | East Africa | Village cooperatives | Agroforestry, biodiversity hotspots |
| Cichlid Breeding | Dar es Salaam, Tanzania | Hans Mtika | Wild fish stock maintenance, Rift Valley Lakes |
| Rufiji | Rufiji area, Tanzania | Rose Lyimo | Carbon sequestration, forest protection |
| Nkoroi | Outside Nairobi, Kenya | Oby & Hilda Obyerodhyambo | Environmental restoration |

**Only 2 currently have data in lib/data/learning-sites.ts**: Msichoke Seaweed Growers + Arboretum Kajokoby. 11 more need seeding.

---

## Brand Identity (by @digitalorchard.design)

### Colour Palette (STRICT — only these 5 permitted)
| Name | HEX | RGB | Usage |
|---|---|---|---|
| Neon Lime | `#DBFF66` | 219, 255, 102 | Primary accent, CTA highlight |
| Viridian | `#006F53` | 0, 111, 83 | Primary brand green, buttons |
| Night Forest | `#06211A` | 6, 33, 26 | Dark mode bg, headings |
| White | `#FFFFFF` | 245, 245, 245 | Light mode bg |
| Platinum | `#F4F4F5` | 244, 244, 245 | Light mode bg alt |

Shades at 20/40/60/80/100% opacity allowed for sub-elements. Secondary touches of red/ochre/orange/yellow for CTAs only.

### Typography
- **Headings:** BioRhyme (Google Fonts) — SemiBold & ExtraBold. Slab-serif, expressive, literary, slightly quirky.
- **Body:** DM Sans (Google Fonts) — Medium & SemiBold. Clean geometric humanist sans.
- Type scale: H1 BioRhyme ExtraBold 56pt/64pt tracking -4%, H2 Bold 40/48pt, H3 SemiBold 36/42pt, H4 Bold 28/36pt, Subhead Medium 24/32pt

### Aesthetic Direction: "Scholarly Cycle"
- **Modernism × tradition, circular frames**
- Monochrome line art illustrations
- Circular UI elements (cultural link to Bomas/African fractal patterns)
- Timeless curated visuals
- Scientific vernacular (periodic-table-style data display)
- Circular on-page navigation elements

### Logo
- Two birds in yin-yang circular formation = balanced partnership, two voices one song
- Primary: white on Night Forest background OR dark on white
- Colour variant: Neon Lime + Viridian birds on Night Forest
- Minimum size: 128px/38px
- Favicon: bird marque only (ico/png)

---

## Existing Codebase State (from prior session audit)

### What exists and works
- `/` — Home (Hero, LearningSites preview, CTA, etc.)
- `/about`, `/about/mission-vision`, `/about/philosophy-history`
- `/learning-sites/[slug]` — 2 real entries (msichoke-seaweed-growers, arboretum-kajok)
- `/projects` — Functional, placeholder data only
- `/stories`, `/stories/[slug]`
- `/events`
- `/dashboard` — Functional (Firebase auth)

### Missing routes (need building)
- `/learning-sites` — browse/index page
- `/events/[slug]` — individual event detail
- `/about/team`, `/about/careers`
- `/get-involved`, `/support-us`
- `/community/*` — entire section
- `/blog`, `/faq`, `/news`
- `/research`
- Legal pages

### Three blockers (all FIXED in prior session)
1. ✅ LearningSite type extended with ~20 new fields from CMS_TEMPLATE_SPEC.md
2. ✅ siteOrigin → siteSlug rename across all types and data files
3. ✅ Header nav hash anchors replaced with real routes

### Learning site page sections
- **Built (7):** SiteHero, SiteChallenges, SiteProjects, MarketInventions, ImpactGrid, FutureGoals, SiteGallery
- **Missing (4):** Testimonial, Contact, RestorationStrategies, ExploreOtherSites

### Animation layer
- `KineticReveal` + `ScrollGlow` in `components/motion/` — universal wrappers, use everywhere
- shadcn/ui in `components/ui/` — consume only, don't edit

### Data layer gap
- `lib/data/learning-sites.ts` = real data (2 sites)
- `lib/data/projects.ts` = AI placeholder (replace with real later)
- 11 real learning sites need seeding before/alongside Sanity CMS

---

## Content Management (Planned: Sanity CMS)
- Dev seeds initial content in lib/data/*.ts
- Non-dev Barbets Duet staff will edit/publish via Sanity Studio
- Sanity CDN for asset delivery
- Migration path: static lib/data → Sanity schemas → GROQ queries

---

## User Journey (3 core paths)
1. **Discover** → Browse `/learning-sites` → read site detail → understand mission
2. **Join** → `/get-involved` → volunteer application form → Firestore submission
3. **Support** → `/support-us` → donate to org or specific learning site → payment integration (Stripe/PayPal)

---

## Key Terminology for UI Copy
- Learning Site (not "project" or "location")
- Jumuiya (community/network)
- Mosaic Rights / Footpaths (vs Column Rights / Fences)
- Site Communications Administrator (SCA)
- Barbet Principles (7 operational principles)
- Abundance of Life (core value proposition phrase)
