# Task Brief: T24

**Title:** Community/Jumuiya network section
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 4/10
**Wave:** 6

---

## Objective

Build the `/community` page showcasing the Jumuiya network: a visualisation of the circular peer review chain, inter-site relationships, community resources, and the Barbets Game. This page communicates the depth of the Barbets Duet network and invites deeper engagement.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

"Jumuiya" (Kiswahili: community with a shared vision) is the governance model for Barbets Duet's 13 learning sites. Its defining feature is a **circular peer review system** — each site reviews another in a chain, creating accountability without hierarchy. This is a fundamentally different approach to conservation governance (Mosaic Rights vs Column Rights), and the `/community` page is where it's explained visually.

The circular peer review chain is: each of the 13 sites is reviewed by its neighbour in a circular order. Visualising this as a circle of site nodes with review direction arrows is the centrepiece of the page.

This task is **Wave 6** — depends on T20 (Sanity GROQ queries must be available for content).

---

## Requirements

1. Create `app/community/page.tsx`
2. Create `components/community/JumuiyaNetwork.tsx` — circular peer review visualisation
3. Create `components/community/CommunityResources.tsx` — resources section
4. Circular network: 13 site nodes arranged in a circle, with arrows showing peer review direction
5. Clicking a node navigates to that site's detail page
6. Section for Barbets Game explanation
7. Section for community knowledge sharing resources

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/community` page renders
- [ ] Circular peer review network renders with all 13 sites as nodes
- [ ] Arrows show review direction between sites
- [ ] Clicking a site node navigates to `/learning-sites/[slug]`
- [ ] Barbets Game section present with description
- [ ] Community resources section present
- [ ] Mobile responsive (circular viz scales or becomes list on mobile)
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/community/page.tsx` | create | Community section page route |
| `components/community/JumuiyaNetwork.tsx` | create | Circular peer review SVG/Canvas visualisation |
| `components/community/CommunityResources.tsx` | create | Resources and Barbets Game section |

---

## Implementation Guidance

### Circular Network Visualisation

Use SVG for the circular network — it's the simplest cross-browser option without a canvas/WebGL dependency:

```tsx
// components/community/JumuiyaNetwork.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// 13 sites arranged in a circle
// Position each site using trigonometry: x = cx + r * cos(angle), y = cy + r * sin(angle)

const PEER_REVIEW_CHAIN = [
  'msichoke-seaweed-growers',
  'arboretum-kajokoby',
  'himo',
  'cichlid-breeding',
  'rufiji',
  'mwasama-primary-school',
  'seme',
  'lukenya-zumula-farm',
  'nkoroi',
  'molo-magode-farm',
  'sikia-community-dam',
  'woodland-valley-farm',
  'hannacroix-creek',
];
// Each site reviews the next in this chain; last reviews first (circular)

export function JumuiyaNetwork({ sites }: { sites: LearningSite[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const R = 220; // radius
  const CX = 300; const CY = 300; // center

  const positions = PEER_REVIEW_CHAIN.map((slug, i) => {
    const angle = (2 * Math.PI * i) / PEER_REVIEW_CHAIN.length - Math.PI / 2;
    return {
      slug,
      x: CX + R * Math.cos(angle),
      y: CY + R * Math.sin(angle),
    };
  });

  return (
    <svg viewBox="0 0 600 600" className="w-full max-w-[600px] mx-auto">
      {/* Review direction arrows */}
      {positions.map((pos, i) => {
        const next = positions[(i + 1) % positions.length];
        return (
          <line
            key={`arrow-${i}`}
            x1={pos.x} y1={pos.y}
            x2={next.x} y2={next.y}
            stroke="#006F53" strokeWidth="1" strokeOpacity="0.5"
            markerEnd="url(#arrowhead)"
          />
        );
      })}

      {/* Site nodes */}
      {positions.map(({ slug, x, y }) => {
        const site = sites.find(s => s.slug === slug);
        const isHovered = hoveredSlug === slug;
        return (
          <g key={slug}
            onMouseEnter={() => setHoveredSlug(slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <Link href={`/learning-sites/${slug}`}>
              <circle
                cx={x} cy={y} r={isHovered ? 24 : 18}
                fill={isHovered ? '#DBFF66' : '#006F53'}
                stroke="#06211A" strokeWidth="3"
                className="cursor-pointer transition-all duration-200"
              />
              {site && (
                <text x={x} y={y + 36} textAnchor="middle"
                  className="text-[8px] fill-white/70 font-mono uppercase">
                  {site.name.split(' ')[0]}
                </text>
              )}
            </Link>
          </g>
        );
      })}

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6"
          refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#006F53" />
        </marker>
      </defs>
    </svg>
  );
}
```

### Barbets Game Section

The Barbets Game is a structured knowledge-sharing exercise used in Jumuiya. Include:
- Brief description: "A structured knowledge exchange game that tests ecological observation and local expertise"
- How it works: participants from different sites share observations and question each other
- Who plays: site managers and volunteers
- Link to more information or `#` placeholder if no page yet

### Page Layout

```
Hero: "Jumuiya — Community with a Shared Vision"
Section 1: What is Jumuiya? (circular peer review explanation)
Section 2: The Network (SVG circular visualisation)
Section 3: The Barbets Game
Section 4: Knowledge Resources
CTA: Join the network → /get-involved
```

### Mosaic Rights Framing

Use the Mosaic Rights vocabulary throughout:
- "Footpaths over fences"
- "Shared stewardship over extraction"
- "Column Rights = fences, exclusion, monoculture"
- "Mosaic Rights = footpaths, shared access, high biodiversity"

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- `types/learning-site.ts` — frozen

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T20 | GROQ queries for learning sites | Can also use `learningSites` from `lib/data` as fallback |

### Downstream Impact

None directly in this PRD.

---

## Commit Guidelines

```
feat(community): build /community page with Jumuiya circular network visualisation

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Circular network renders with 13 nodes
- [ ] Clicking a node navigates to the correct site
- [ ] Mobile viewport: visualisation readable at 375px

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T24 | Wave: 6*
