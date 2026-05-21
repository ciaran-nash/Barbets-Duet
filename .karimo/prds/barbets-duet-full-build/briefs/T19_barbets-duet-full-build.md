# Task Brief: T19

**Title:** Sanity Studio setup
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 5

---

## Objective

Configure Sanity Studio and deploy it to the `/studio` route in the Next.js app. Migrate existing `lib/data/*.ts` content into Sanity as seed data. Configure the Studio UI for non-technical Barbets Duet staff.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

After schemas are defined in T18, the Studio is the editing interface for Barbets Duet non-dev staff. It must be accessible at `/studio` in the deployed app. The Studio should feel approachable: clear section labels, helpful descriptions, image uploads that work immediately with Sanity CDN.

The existing `lib/data/*.ts` content (2 learning sites, 2 stories, 2 events, 3 projects, team members) should be migrated into Sanity as seed documents so staff can see real content on day one and don't start with an empty CMS.

This task is **Wave 5** — depends on T18 (schemas must exist before Studio can be configured).

**External pre-requisite:** Sanity account + project must exist at sanity.io. Project ID and dataset name needed for `sanity.config.ts`.

---

## Requirements

1. Create `sanity.config.ts` at project root
2. Create `app/studio/[[...tool]]/page.tsx` to serve the Studio
3. Configure Studio with brand-appropriate settings (workspace name: "Barbets Duet")
4. Migrate `lib/data/learning-sites.ts` (2 sites) as Sanity seed documents
5. Migrate `lib/data/stories.ts`, `lib/data/events.ts`, `lib/data/projects.ts`, `lib/data/team.ts` as seed documents
6. Document Sanity project ID + dataset in environment variables

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/studio` route renders Sanity Studio without errors
- [ ] Studio shows all 5 content types in the sidebar
- [ ] Non-dev user can create/edit a LearningSite entry (smoke test)
- [ ] Images upload correctly to Sanity CDN
- [ ] Existing lib/data content migrated as seed documents
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local.example`
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `sanity.config.ts` | create | Sanity Studio configuration |
| `app/studio/[[...tool]]/page.tsx` | create | Studio route in Next.js |
| `.env.local.example` | modify | Document Sanity env vars |

---

## Implementation Guidance

### Sanity Config

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'barbets-duet',
  title: 'Barbets Duet',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(),  // GROQ query explorer for developers
  ],

  schema: {
    types: schemaTypes,
  },
});
```

### Studio Route (Next.js App Router)

```tsx
// app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

### Install Dependencies

```bash
npm install sanity next-sanity @sanity/vision @sanity/image-url
```

### Environment Variables

```bash
# .env.local.example
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-read-token  # for server-side queries
SANITY_WEBHOOK_SECRET=your-webhook-secret    # for T21 revalidation
```

### Seed Migration Script

Create a one-time migration script or use the Sanity CLI to create seed documents. The easiest approach for migration is using the Sanity client directly:

```typescript
// scripts/seed-sanity.ts (run once with: npx ts-node scripts/seed-sanity.ts)
import { createClient } from '@sanity/client';
import { learningSites } from '../lib/data/learning-sites';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

// Convert LearningSite data to Sanity document format and upload
async function seed() {
  for (const site of learningSites) {
    await client.create({
      _type: 'learningSite',
      ...site,
      // Note: image URLs from Unsplash can't be directly migrated as Sanity image assets
      // Leave image fields empty and update via Studio
    });
  }
}

seed().catch(console.error);
```

### Studio Security

The `/studio` route should be protected in production. Options:
- Add Firebase Auth check in the Studio page (simplest)
- Or rely on Sanity's built-in auth (Sanity accounts required)

For now, Sanity's built-in user management is sufficient — only invited Sanity users can edit.

### Adding `studio` to next.config.js

If `app/studio/` causes Next.js build issues due to Sanity's bundling:

```javascript
// next.config.js
const nextConfig = {
  // Allow Sanity Studio to work with App Router
  transpilePackages: ['@sanity/ui', 'sanity'],
};
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*` actual files
- `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- Any `lib/data/*.ts` files (don't delete — still needed until T20 replaces them)

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T18 | `sanity/schemaTypes/index.ts` with all 5 schemas | Import successfully |

**External pre-requisite:** Sanity project created at sanity.io — need `projectId`.

### Downstream Impact

T20 (GROQ queries) requires the Studio to be running and populated with content. T22 (image pipeline) uses the Sanity CDN configured here.

---

## Commit Guidelines

```
feat(sanity): configure Studio at /studio route with seed content

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes (no Sanity bundling errors)
- [ ] `/studio` loads in browser
- [ ] Can create a new LearningSite document via Studio
- [ ] Image upload to Sanity CDN works

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T19 | Wave: 5*
