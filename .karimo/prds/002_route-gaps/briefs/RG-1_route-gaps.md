# Task Brief: RG-1

**Title:** FAQ standalone page
**PRD:** route-gaps
**Priority:** must
**Complexity:** 1/10
**Model:** sonnet
**Wave:** 1
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Create `app/faq/page.tsx` that wraps the existing `FAQSection` component with the standard page layout (Header + StickyFooter). This is a zero-content task — all FAQ data already lives inside `FAQSection.tsx`. The only work is writing the page shell.

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

`/faq` is listed in the site sitemap but the route does not exist, causing a 404. The `FAQSection` component at `components/FAQSection.tsx` is fully self-contained with hardcoded data, search, category filter, and accordion UI. The page only needs to mount it inside the standard Header/StickyFooter wrapper.

This task is part of **Wave 1** — no dependencies, can start immediately.

---

## Requirements

- Create `app/faq/page.tsx`
- Import `Header` from `@/components/Header`
- Import `StickyFooter` from `@/components/ui/sticky-footer`
- Import `FAQSection` from `@/components/FAQSection`
- Mark the file `'use client'` (FAQSection uses hooks/state)
- Wrap with the standard page shell pattern (see Implementation Guidance)
- Add `export const metadata` with title `"FAQ | Barbets Duet"` and a short description
- No CTA section needed for this page (PRD spec: "no CTA needed")
- No ScrollGlow or KineticReveal needed — FAQSection supplies its own animation

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/faq/page.tsx` exists and is valid TypeScript
- [ ] `/faq` renders `FAQSection` with search input, category filter tabs, and accordion items visible
- [ ] Page title in `<head>` is "FAQ | Barbets Duet"
- [ ] Header and StickyFooter render correctly on the page
- [ ] No console errors or TypeScript errors
- [ ] `npx tsc --noEmit` passes

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/faq/page.tsx` | create | FAQ route — wraps FAQSection in page shell |

### File Ownership Notes

No shared files touched. No conflict risk with other wave-1 tasks.

---

## Implementation Guidance

### Page Shell Pattern

Follow `app/stories/page.tsx` exactly for the wrapper structure:

```tsx
'use client';

import React from 'react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <FAQSection />
      </main>
      <StickyFooter />
    </div>
  );
}
```

### Metadata

Because `'use client'` and `export const metadata` cannot coexist in the same file in Next.js App Router, use one of two approaches:

**Option A (preferred):** Keep the page server-rendered. Check whether `FAQSection` actually uses client-only APIs — if it does, wrap just the component in a `'use client'` boundary (but the page file itself stays a server component so `metadata` can be exported).

**Option B:** If `FAQSection` must be in a `'use client'` page, create a separate `app/faq/layout.tsx` that exports the metadata, and keep `page.tsx` as the client component.

`FAQSection.tsx` line 1 is `'use client'` — it is a client component. Use **Option A**: page.tsx is a server component, FAQSection is already marked `'use client'` internally, so Next.js handles the boundary automatically.

```tsx
// app/faq/page.tsx — SERVER COMPONENT (no 'use client' directive)
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ | Barbets Duet',
  description: 'Answers to frequently asked questions about Barbets Duet projects, volunteering, partnerships, and impact.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <FAQSection />
      </main>
      <StickyFooter />
    </div>
  );
}
```

### Code Style

- Next.js 15 App Router, TypeScript strict
- Tailwind v4 — use CSS variables (`bg-background`, `text-foreground`) not raw hex
- Path alias: `@/` maps to project root
- No default export for metadata — use named `export const metadata`

### Edge Cases

- `FAQSection` is self-contained with its own data — do not pass any props
- Do not add `'use client'` to the page file (see Metadata note above)

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`
- `firebase-applet-config.json`
- `firestore.rules`
- `package-lock.json`
- `.next/`
- `node_modules/`
- `next-env.d.ts`

### Files Requiring Review

None touched by this task.

---

## Dependencies

### Upstream Tasks

None — Wave 1, can start immediately.

### Downstream Impact

None — no other tasks depend on RG-1.

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Worktree:** `.worktrees/route-gaps/RG-1` (if using worktree execution)
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-1_route-gaps.md`

---

## Commit Guidelines

```
feat(faq): add /faq page wrapping FAQSection component

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] Route resolves in browser: `next dev` → visit `/faq`

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-1 | Wave: 1*
