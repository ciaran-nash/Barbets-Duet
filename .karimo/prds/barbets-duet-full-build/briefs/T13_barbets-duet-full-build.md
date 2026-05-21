# Task Brief: T13

**Title:** MapLibre GL JS + Stadia Maps setup
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 3

---

## Objective

Install `react-map-gl` and `maplibre-gl`, create a custom Night Forest dark map style (JSON), integrate Stadia Maps tile hosting, and deliver a `SitesMap` React component that renders correctly with custom brand-coloured pins. This component is consumed by T12.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The Barbets Duet learning sites browse page requires an interactive map to show all 13 site locations globally. The map must feel premium and on-brand: a dark Night Forest (`#06211A`) canvas with Neon Lime (`#DBFF66`) location pins and Viridian (`#006F53`) accent elements. MapLibre GL JS is the open-source map renderer; Stadia Maps provides the tile hosting (200k tiles/month free tier).

Pre-requisite: A Stadia Maps API key must be obtained from stadiamaps.com before this task can be fully completed. The component should be built to accept the API key via environment variable.

This task is **Wave 3** — depends only on T01 (brand tokens).

---

## Requirements

1. Install `maplibre-gl` and `react-map-gl` with MapLibre adapter
2. Create `lib/map/style.json` — custom Night Forest dark map style
3. Create `components/learning-sites/SitesMap.tsx` — React client component wrapping the map
4. Map uses Stadia Maps tiles via `NEXT_PUBLIC_STADIA_API_KEY` env variable
5. Custom pins: Neon Lime circle with Night Forest border, scales up on hover
6. Map renders without errors in SSR context (dynamic import with `ssr: false`)
7. `SitesMap` accepts: `sites: LearningSite[]`, `hoveredSlug: string | null`, `onPinClick: (slug: string) => void`

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `maplibre-gl` and `react-map-gl` in `package.json`
- [ ] `lib/map/style.json` exists with Night Forest dark style
- [ ] `components/learning-sites/SitesMap.tsx` exists as a `'use client'` component
- [ ] Map renders on screen with dark tiles
- [ ] All 13 sites render as custom Neon Lime pin markers
- [ ] Hovered pin (via `hoveredSlug` prop) scales up or changes appearance
- [ ] Clicking a pin calls `onPinClick` with the site's slug
- [ ] No server-side rendering errors (uses `dynamic` import in parent or internal SSR guard)
- [ ] `NEXT_PUBLIC_STADIA_API_KEY` documented in `.env.local.example`
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | Add `maplibre-gl`, `react-map-gl` |
| `lib/map/style.json` | create | Night Forest custom map style JSON |
| `components/learning-sites/SitesMap.tsx` | create | MapLibre React wrapper component |
| `.env.local.example` | modify | Document `NEXT_PUBLIC_STADIA_API_KEY` |

---

## Implementation Guidance

### Install Commands

```bash
npm install maplibre-gl react-map-gl
npm install --save-dev @types/maplibre-gl
```

### MapLibre with react-map-gl

`react-map-gl` v7+ supports MapLibre as an alternative to Mapbox:

```tsx
// components/learning-sites/SitesMap.tsx
'use client';

import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { LearningSite } from '@/types/learning-site';

interface SitesMapProps {
  sites: LearningSite[];
  hoveredSlug: string | null;
  onPinClick: (slug: string) => void;
}

export default function SitesMap({ sites, hoveredSlug, onPinClick }: SitesMapProps) {
  const styleUrl = process.env.NEXT_PUBLIC_STADIA_API_KEY
    ? `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${process.env.NEXT_PUBLIC_STADIA_API_KEY}`
    : '/lib/map/style.json';  // fallback to local style

  return (
    <Map
      initialViewState={{
        longitude: 34.0,
        latitude: 1.0,
        zoom: 2.5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={styleUrl}
    >
      {sites.map(site => (
        site.lat && site.lng ? (
          <Marker
            key={site.slug}
            longitude={site.lng}
            latitude={site.lat}
            onClick={() => onPinClick(site.slug)}
          >
            <div
              className={`
                w-4 h-4 rounded-full cursor-pointer transition-transform duration-200
                bg-[#DBFF66] border-2 border-[#06211A]
                ${hoveredSlug === site.slug ? 'scale-150' : 'scale-100'}
              `}
              title={site.name}
            />
          </Marker>
        ) : null
      ))}
    </Map>
  );
}
```

### SSR Guard in Parent (T12)

Because MapLibre uses `window`, the map component must be dynamically imported in T12:

```tsx
// components/learning-sites/SitesBrowse.tsx
import dynamic from 'next/dynamic';

const SitesMap = dynamic(
  () => import('@/components/learning-sites/SitesMap'),
  { ssr: false, loading: () => <div className="w-full h-full bg-night-forest animate-pulse" /> }
);
```

### Custom Map Style (lib/map/style.json)

For the Night Forest dark style without Stadia, create a minimal style.json:

```json
{
  "version": 8,
  "name": "Night Forest",
  "background-color": "#06211A",
  "sources": {},
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#06211A"
      }
    }
  ]
}
```

This is a placeholder — with a real Stadia API key, use their `alidade_smooth_dark` style which will match the Night Forest palette closely.

### Stadia Maps Setup

1. Sign up at stadiamaps.com (free tier: 200k tiles/month)
2. Create a new property for barbetsduet.org domain
3. Copy the API key
4. Add to `.env.local` as `NEXT_PUBLIC_STADIA_API_KEY=your_key_here`
5. Add to `.env.local.example` as `NEXT_PUBLIC_STADIA_API_KEY=your-stadia-api-key`

### Map Initial Viewport

Center the map to show East Africa prominently (where 11/13 sites are):
- Initial viewport: longitude 34.0, latitude 1.0, zoom 2.5
- This shows East Africa centred with UK/USA visible at edges

---

## Boundaries

### Files You MUST NOT Touch

- `.env*` actual files (only `.env.local.example`)
- `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens | Confirm `#DBFF66`, `#06211A` tokens available |

**External pre-requisite:** Stadia Maps API key (can stub with local style.json if key not yet available).

### Downstream Impact

T12 (learning sites browse page) directly imports `SitesMap` from this task. T12 cannot complete without this component.

---

## Commit Guidelines

```
feat(map): install MapLibre GL and create SitesMap component with Stadia tiles

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes (no SSR errors from maplibre)
- [ ] Map renders in browser — dark canvas visible
- [ ] 13 Neon Lime pins visible at correct coordinates
- [ ] Hovering a pin causes visual scale change

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T13 | Wave: 3*
