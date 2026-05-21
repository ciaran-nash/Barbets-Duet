# Task Brief: T18

**Title:** Sanity schema design
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 4/10
**Wave:** 5

---

## Objective

Design and create Sanity CMS schemas for all five content types: LearningSite, Story, BarbetsEvent, Project, and TeamMember. Each schema must map exactly to the corresponding TypeScript interface so that Sanity content can be queried and typed correctly in Wave 5 GROQ queries.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Wave 5 migrates the site from static `lib/data/*.ts` files to a Sanity CMS backend. Sanity schemas are the foundation — they define what non-dev Barbets Duet staff can create and edit in the Studio. The schemas must cover every field in the TypeScript types, use Sanity's reference type for cross-content relationships (e.g. Story → LearningSite), and be authored for non-technical users with helpful field labels and descriptions.

**Critical constraint:** The TypeScript types are frozen after T02. Schema fields must match the TS interfaces exactly. No new required fields should be added unless the TS type is also updated — and only by consensus.

This task is **Wave 5** — depends on T02 (type is frozen), T06 (all site sections exist), T07, T08, T09, T10 (all content types finalised).

---

## Research Context

### TypeScript Types to Map

**LearningSite** (`types/learning-site.ts`):
- All 30+ fields including nested objects (challenges, restorationStrategies, impactData, etc.)
- References to related sites via `relatedSitesSlugs?: string[]` → in Sanity becomes `array of references`
- Image fields (`heroImage`, `gallery[]`, etc.) → become `image` type in Sanity

**Story** (`types/narrative.ts`):
- `content: string` → in Sanity becomes `array of blocks` (Portable Text)
- `siteSlug?: string` → becomes `reference` to LearningSite document

**BarbetsEvent** (`types/narrative.ts`):
- `siteSlug?: string` → becomes `reference` to LearningSite document

**Project** (`types/project.ts`):
- `siteSlug: string` → becomes `reference` to LearningSite document (required)
- `category` enum → `string` with validation list in Sanity

**TeamMember** (`types/team.ts` — created in T10):
- `siteSlug?: string` → becomes `reference` to LearningSite document

### Sanity Reference Type

Instead of storing `siteSlug: string`, Sanity uses document references:
```typescript
// In Sanity schema
{
  name: 'associatedSite',
  type: 'reference',
  to: [{ type: 'learningSite' }]
}
```

GROQ queries will dereference these: `associatedSite->{ slug, name }`.

---

## Requirements

1. Create `sanity/schemas/learningSite.ts` — full LearningSite schema
2. Create `sanity/schemas/story.ts` — Story schema with Portable Text
3. Create `sanity/schemas/event.ts` — BarbetsEvent schema
4. Create `sanity/schemas/project.ts` — Project schema
5. Create `sanity/schemas/teamMember.ts` — TeamMember schema
6. Create `sanity/schemaTypes/index.ts` — schema registry
7. All schemas validated in Sanity Studio (no errors in Studio console)
8. Non-technical field labels and descriptions on all fields

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] All 5 schema files created
- [ ] `sanity/schemaTypes/index.ts` exports all schemas
- [ ] LearningSite schema covers all fields in `types/learning-site.ts`
- [ ] Story `content` field uses `array of blocks` (Portable Text)
- [ ] Cross-references use Sanity `reference` type (Story → LearningSite, etc.)
- [ ] Image fields use Sanity `image` type with `hotspot: true`
- [ ] All fields have descriptive `title` and `description` properties for Studio UI
- [ ] Schema validates in Sanity Studio without errors
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `sanity/schemas/learningSite.ts` | create | LearningSite Sanity schema |
| `sanity/schemas/story.ts` | create | Story Sanity schema with Portable Text |
| `sanity/schemas/event.ts` | create | BarbetsEvent Sanity schema |
| `sanity/schemas/project.ts` | create | Project Sanity schema |
| `sanity/schemas/teamMember.ts` | create | TeamMember Sanity schema |
| `sanity/schemaTypes/index.ts` | create | Schema registry |

---

## Implementation Guidance

### Install Sanity SDK (if not done)

```bash
npm install @sanity/client @sanity/image-url next-sanity sanity
```

### Schema Type Pattern

```typescript
// sanity/schemas/story.ts
import { defineField, defineType } from 'sanity';

export const storySchema = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL-safe identifier for this story. Click "Generate" to create from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'array',
      description: 'The full story text. Use the toolbar to add headings, bold, images, etc.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'associatedSite',
      title: 'Associated Learning Site',
      type: 'reference',
      description: 'Which Jumuiya learning site is this story about?',
      to: [{ type: 'learningSite' }],
    }),
    // ... rest of fields
  ],
});
```

### LearningSite Schema (key fields)

```typescript
// Key LearningSite fields — nested objects need array or object type:
defineField({
  name: 'impactData',
  title: 'Impact Data',
  type: 'object',
  fields: [
    {
      name: 'ecological',
      title: 'Ecological Impact Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'value', type: 'string', title: 'Value' },
          { name: 'description', type: 'string', title: 'Description' },
          { name: 'trend', type: 'string', title: 'Trend', options: { list: ['up', 'down'] } },
        ]
      }]
    },
    // ... community stats
  ]
}),

// Gallery: array of images
defineField({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
}),

// Related sites: array of references
defineField({
  name: 'relatedSites',
  title: 'Related Learning Sites',
  description: 'Other Jumuiya sites to recommend from this site\'s page',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'learningSite' }] }],
}),
```

### Schema Registry

```typescript
// sanity/schemaTypes/index.ts
import { learningSiteSchema } from '../schemas/learningSite';
import { storySchema } from '../schemas/story';
import { eventSchema } from '../schemas/event';
import { projectSchema } from '../schemas/project';
import { teamMemberSchema } from '../schemas/teamMember';

export const schemaTypes = [
  learningSiteSchema,
  storySchema,
  eventSchema,
  projectSchema,
  teamMemberSchema,
];
```

### Non-Technical Field Labels

All fields should have:
- `title` — human-readable label (e.g. "Vision Statement" not "visionStatement")
- `description` — help text explaining the field's purpose and where it appears
- `validation` — required fields marked `Rule.required()`

Example:
```typescript
defineField({
  name: 'visionStatement',
  title: 'Vision Statement',
  type: 'text',
  description: 'A one or two sentence statement of this site\'s ecological vision. Appears below the site name on the detail page.',
  validation: Rule => Rule.required().max(200),
})
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `types/learning-site.ts` — frozen, no changes
- `types/narrative.ts` — frozen
- `types/project.ts` — frozen
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T02 | Final `LearningSite` type shape | Confirm `types/learning-site.ts` is final — no changes allowed after T02 |
| T06 | Site page section fields (Testimonial, Contact, etc.) | All optional fields are in the type |
| T07 | Story `content` rendering as markdown | Guides Portable Text field setup |
| T08 | BarbetsEvent fields used in UI | Confirms all fields needed |
| T09 | Project fields used in UI | Confirms all Project fields |
| T10 | TeamMember type (`types/team.ts`) | Must exist before creating teamMember schema |

**External pre-requisite:** Sanity account + project must exist at sanity.io before T19 can use these schemas.

### Downstream Impact

T19 (Sanity Studio) uses these schemas to render the editing UI. T20 (GROQ queries) queries against these types.

---

## Commit Guidelines

```
feat(sanity): design schemas for all 5 content types

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] All 5 schema files created
- [ ] No `any` types in schema definitions
- [ ] Schema loads in Sanity Studio without console errors (T19 validation)

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T18 | Wave: 5*
