# Task Brief: T10

**Title:** About/team page
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 2/10
**Wave:** 2

---

## Objective

Extract hardcoded team member names from `AboutContent.tsx` into a proper data layer (`types/team.ts` + `lib/data/team.ts`), then build the `/about/team` page using a new `TeamSection` component.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Barbets Duet's credibility rests on the real people behind the 20-year experiment. The current `/about` page has team names embedded as hardcoded strings. This needs to be extracted into a proper type + data structure for:
- The `/about/team` dedicated page
- Future Sanity CMS management (T18 will create a TeamMember schema)
- Reuse in other contexts (site detail pages show manager names, about page shows founding team)

Known team members from research findings and existing site data:
- **Barbara Heinzen** — co-founder, Hannacroix Creek Learning Site (NY)
- **James Magode Ikuya** — Molo / Magode Farm (Uganda)
- **Mwajuma Masaiganah** — Msichoke Seaweed Growers & Mwasama Primary School (Tanzania)
- **Rose Lyimo** — Himo & Rufiji (Tanzania)
- **Hans Mtika** — Himo & Cichlid Breeding (Tanzania)
- **Sammy Muvelah** — Lukenya / Zumula Farm (Kenya)
- **Oby & Hilda Obyerodhyambo** — Seme & Nkoroi (Kenya)
- **Chris & Janet Jones** — Woodland Valley Farm (UK)
- **Eric Remillard** — Hannacroix Creek (USA)

This task is **Wave 2** — depends only on T01 (brand tokens).

---

## Requirements

0. **Verify file state before extracting hardcoded names.** Run:
   ```bash
   grep -n 'Barbara\|James\|Mwajuma\|team' components/About.tsx app/about/AboutContent.tsx
   ```
   This confirms which file actually contains hardcoded team names and their exact line numbers. If no team names are found in `AboutContent.tsx`, the removal step (requirement 4) is a no-op — skip it and note in the commit message that no hardcoded names were present.
1. Create `types/team.ts` with `TeamMember` interface
2. Create `lib/data/team.ts` with all known team members
3. Build `/about/team` page with `TeamSection` component
4. Remove hardcoded names from whichever file the grep confirms contains them (see requirement 0) and reference `lib/data/team.ts` instead
5. Link team members to their associated learning sites where applicable

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `types/team.ts` exists with `TeamMember` interface
- [ ] `lib/data/team.ts` exists with at least 9 team member entries
- [ ] `app/about/team/page.tsx` created
- [ ] `components/about/TeamSection.tsx` created
- [ ] `/about/team` page renders with all team members
- [ ] No hardcoded team names in `AboutContent.tsx` components
- [ ] Team member cards link to associated learning site where `siteSlug` is set
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `types/team.ts` | create | TeamMember interface |
| `lib/data/team.ts` | create | Team member data |
| `app/about/team/page.tsx` | create | /about/team page route |
| `components/about/TeamSection.tsx` | create | Team display component |
| `app/about/AboutContent.tsx` | modify (if hardcoded names found — see Requirement 0) | Replace hardcoded names with team data imports. Run grep first to confirm names are present before modifying. |

---

## Implementation Guidance

### TeamMember Interface

```typescript
// types/team.ts
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio?: string;
  location?: string;
  siteSlug?: string;      // link to associated learning site
  avatar?: string;        // image URL
  joinedYear?: string;
  isCoreTeam?: boolean;   // founding/core vs site manager
}
```

### Sample Data Structure

```typescript
// lib/data/team.ts
import { TeamMember } from '@/types/team';

export const teamMembers: TeamMember[] = [
  {
    slug: 'barbara-heinzen',
    name: 'Barbara Heinzen',
    role: 'Co-Founder',
    location: 'Hudson Valley, NY, USA',
    siteSlug: 'hannacroix-creek',
    isCoreTeam: true,
    bio: 'Barbara co-founded Barbets Duet in 2008, bringing decades of research on new economic systems...',
  },
  {
    slug: 'james-magode-ikuya',
    name: 'James Magode Ikuya',
    role: 'Site Manager — Molo / Magode Farm',
    location: 'Tororo, Eastern Uganda',
    siteSlug: 'molo-magode-farm',
    isCoreTeam: false,
  },
  // ... rest of team
];
```

### Page Route Pattern

Follow the pattern from `app/about/mission-vision/page.tsx`:

```tsx
// app/about/team/page.tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import TeamSection from '@/components/about/TeamSection';

export const metadata: Metadata = {
  title: 'Our Team | Barbets Duet',
  description: 'Meet the people behind the 20-year Barbets Duet experiment.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <TeamSection />
      </main>
      <StickyFooter />
    </div>
  );
}
```

### TeamSection Layout

Consider two sections:
1. **Core Team** — founding members (`isCoreTeam: true`), larger treatment
2. **Site Managers** — Jumuiya site managers grid

Use the standard layout:
- `pt-48 pb-32 px-6` section padding
- `max-w-[1600px] mx-auto` container
- `KineticReveal` on section heading
- Team member cards: name (BioRhyme), role (DM Sans small caps), location, site link

### Navigation — Add Team Link

Add `/about/team` to the Header's `aboutDropdownData` under "Who We Are":

```typescript
const aboutDropdownData: DropdownData = [
  {
    heading: 'Who We Are',
    links: [
      { text: 'About Us', href: '/about' },
      { text: 'Our Team', href: '/about/team' },           // ADD THIS
      { text: 'Mission & Vision', href: '/about/mission-vision' },
      { text: 'Philosophy & History', href: '/about/philosophy-history' },
    ]
  },
  // ...
];
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- `lib/firebase.ts`, `components/AuthProvider.tsx`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens | Confirm `font-serif`, `text-accent` resolve |

### Downstream Impact

T18 (Sanity schema) will need a `TeamMember` schema that matches `types/team.ts`.

---

## Commit Guidelines

```
feat(about): extract team data layer and build /about/team page

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `/about/team` renders with all team members
- [ ] No 404 when navigating Header → About → Our Team

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T10 | Wave: 2*
