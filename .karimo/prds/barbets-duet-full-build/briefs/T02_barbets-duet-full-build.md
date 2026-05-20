# Task Brief: T02

**Title:** Seed all 13 real learning sites
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 1

---

## Objective

Populate `lib/data/learning-sites.ts` with all 13 real Jumuiya learning sites, filling every field in the `LearningSite` type with accurate data sourced from research findings, prior site data, and the pastebin CSV files. This unlocks all downstream content tasks.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Currently only 2 of 13 learning sites have data: `msichoke-seaweed-growers` and `arboretum-kajokoby`. The other 11 sites exist as named entries in research findings but have no corresponding data objects. All downstream tasks — T06 (site sections), T12 (browse map), T18 (Sanity schemas) — are blocked until all 13 sites are seeded.

The `LearningSite` type in `types/learning-site.ts` was extended in a prior session and now has ~30+ fields including optional fields for testimonials, contact blocks, restoration strategies, and related site slugs. Not every field is required — fill what is available from research data and leave optional fields undefined rather than inventing data.

This task is **Wave 1** — completing it alongside T01 (brand tokens) is the gate for Wave 2.

---

## Research Context

### Confirmed Site Data (from research/findings.md)

| Site | Slug | Location | Manager(s) | Ecological Focus |
|---|---|---|---|---|
| Woodland Valley Farm | `woodland-valley-farm` | Ladock, Cornwall, UK | Chris & Janet Jones | Low-carbon organic farming, carbon sequestration |
| Hannacroix Creek | `hannacroix-creek` | New Baltimore, Hudson Valley, NY, USA | Barbara Heinzen & Eric Remillard | Freshwater tidal swamp forest restoration |
| Molo (Magode Farm) | `molo-magode-farm` | Near Tororo, Eastern Uganda | James Magode Ikuya | Mt. Elgon watershed, Kanginima stream |
| Lukenya (Zumula Farm) | `lukenya-zumula-farm` | 50km outside Nairobi, Kenya | Sammy Muvelah | Dry rangeland, reforestation |
| Seme | `seme` | Near Kisumu, Lake Victoria, Kenya | Oby & Hilda Obyerodhyambo | Over-cropped land, sacred groves |
| Msichoke Seaweed Growers | `msichoke-seaweed-growers` | Mlingotini, Bagamoyo, Tanzania | Mwajuma Masaiganah | Mangroves, coastal lagoon (EXISTING) |
| Mwasama Primary School | `mwasama-primary-school` | Bagamoyo, Tanzania | Mwajuma Masaiganah | Environmental education, botanical collection |
| Himo | `himo` | Himo, near Moshi, Tanzania | Rose Lyimo & Hans Mtika | Soil fertility, medicinal plant preservation |
| Sikia Community Dam | `sikia-community-dam` | East Africa (KE/TZ/UG border) | Village cooperatives | Water harvesting, climate resilience |
| Arboretum Kajokoby | `arboretum-kajokoby` | Kisumu, Kenya (Seme, Kajulu) | Village cooperatives | Agroforestry, biodiversity (EXISTING) |
| Cichlid Breeding | `cichlid-breeding` | Dar es Salaam, Tanzania | Hans Mtika | Wild fish stock maintenance, Rift Valley Lakes |
| Rufiji | `rufiji` | Rufiji area, Tanzania | Rose Lyimo | Carbon sequestration, forest protection |
| Nkoroi | `nkoroi` | Outside Nairobi, Kenya | Oby & Hilda Obyerodhyambo | Environmental restoration |

### Pastebin CSV Data

Check `pastebin/learning-sites/` for any CSV files containing additional site-specific data. If CSV files exist, parse them for: economic activities, restoration strategies, key achievements, founding year.

### Known Issues to Address

- ⚠️ **Sparse data for some sites** — Sikia, Cichlid, Arboretum (beyond slug/location), Rufiji, Nkoroi have limited data in research findings. Use what is available. Mark optional fields as `undefined` rather than inventing content.
- ⚠️ **Image URLs** — No real photography available in research. Use Unsplash placeholder images relevant to the ecological context (seaweed, forests, wetlands, farms). Real images will replace these when Sanity CMS is integrated in Wave 5.
- ⚠️ **relatedSitesSlugs** — Populate these for at least the 2 existing sites. For new sites, leave as `undefined` initially or pair geographically nearby sites.

---

## Requirements

1. All 13 entries present in `lib/data/learning-sites.ts`
2. All slugs URL-safe kebab-case, matching the slug list above exactly
3. Every entry has at minimum: `slug`, `name`, `location`, `founded`, `category`, `leadPartners`, `heroImage`, `visionStatement`, `challenges`, `initiatives` (at least 1), `marketStrategies`, `impactData`, `futureGoals`, `gallery`
4. Optional fields (`testimonial`, `contact`, `restorationStrategies`, `relatedSitesSlugs`) populated where data is available
5. TypeScript strict mode passes — no `any`, no missing required fields
6. Coordinate data added: each site needs `lat` and `lng` approximate values for the map in Wave 3 T12/T13

**Note on coordinates:** The `LearningSite` type may not yet have `lat`/`lng` fields. If not, add them as optional fields to `types/learning-site.ts` as part of this task. They are needed for the Wave 3 MapLibre map.

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `lib/data/learning-sites.ts` contains exactly 13 entries
- [ ] All 13 slugs match the kebab-case list in Requirements exactly
- [ ] Each entry has all required fields populated (no `undefined` on required fields)
- [ ] `types/learning-site.ts` has optional `lat?: number` and `lng?: number` fields
- [ ] All 13 sites have approximate `lat`/`lng` coordinates
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `getLearningSite('woodland-valley-farm')` returns a full object (smoke test)

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `lib/data/learning-sites.ts` | modify | Add 11 new site entries alongside the existing 2 |
| `types/learning-site.ts` | modify | Add optional `lat?: number; lng?: number` fields to LearningSite interface |

### File Ownership Notes

`types/learning-site.ts` is shared — any change to the interface must be backward-compatible. Adding optional fields is safe. Do not remove or rename existing fields.

---

## Implementation Guidance

### Existing Site Pattern (follow exactly)

```typescript
// lib/data/learning-sites.ts pattern
import { LearningSite } from '@/types/learning-site';

export const learningSites: LearningSite[] = [
  {
    slug: 'msichoke-seaweed-growers',   // kebab-case, URL-safe
    name: 'Msichoke Seaweed Growers',
    location: 'Mlingotini, Bagamoyo, Tanzania',
    founded: '2009',
    category: 'Coastal Restoration & Mariculture',
    leadPartners: ['Mwajuma Masaiganah', 'Rose Lyimo'],
    lat: -6.44,
    lng: 38.90,
    heroImage: 'https://images.unsplash.com/...', // relevant Unsplash URL
    // ... rest of fields
  },
];

export function getLearningSite(slug: string): LearningSite | undefined {
  return learningSites.find(s => s.slug === slug);
}
```

### Approximate Coordinates Reference

| Site | Lat | Lng |
|---|---|---|
| Woodland Valley Farm | 50.27 | -5.00 |
| Hannacroix Creek | 42.46 | -73.79 |
| Molo / Magode Farm | 0.70 | 34.18 |
| Lukenya / Zumula Farm | -1.50 | 37.12 |
| Seme | -0.05 | 34.73 |
| Msichoke Seaweed Growers | -6.44 | 38.90 |
| Mwasama Primary School | -6.44 | 38.90 |
| Himo | -3.36 | 37.52 |
| Sikia Community Dam | -1.20 | 35.00 |
| Arboretum Kajokoby | -0.10 | 34.75 |
| Cichlid Breeding | -6.79 | 39.27 |
| Rufiji | -7.90 | 38.50 |
| Nkoroi | -1.43 | 36.81 |

### Placeholder Images by Context

- Coastal/seaweed → `photo-1544551763-46a013bb70d5` (Unsplash)
- Forest/trees → `photo-1441974231531-c6227db76b6e`
- Farm/agriculture → `photo-1500595046743-cd271d694d30`
- Freshwater/river → `photo-1559827260-dc66d52bef19`
- Urban/school → `photo-1580582932707-520aed937b7b`

Append `?q=80&w=2070&auto=format&fit=crop` to Unsplash URLs.

### Category Values (pick the most relevant)

Consistent vocabulary for site categories:
- `'Coastal Restoration & Mariculture'`
- `'Agroforestry & Biodiversity'`
- `'Freshwater Restoration'`
- `'Dryland Reforestation'`
- `'Environmental Education'`
- `'Urban Ecology'`
- `'Aquatic Conservation'`

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`, `firestore.indexes.json`
- `components/ui/` — shadcn/ui primitives

### Files Requiring Review

- `lib/firebase.ts` — do not touch
- `app/layout.tsx` — do not touch

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens in globals.css | Confirm `npx tsc --noEmit` passes after T01 |

### Downstream Impact

Tasks that depend on this one: T06, T12, T13, T15, T18

**Critical:** T18 (Sanity schema design) requires the `LearningSite` TypeScript type to be frozen after this task. No breaking changes to the type after T02 completes.

---

## Commit Guidelines

```
feat(data): seed all 13 Jumuiya learning sites in learning-sites.ts

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] 13 entries confirmed by logging `learningSites.length`
- [ ] Each site navigates correctly at `/learning-sites/[slug]`

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T02 | Wave: 1*
