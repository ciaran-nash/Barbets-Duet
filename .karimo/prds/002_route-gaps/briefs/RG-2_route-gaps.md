# Task Brief: RG-2

**Title:** Research index page + nav unlock
**PRD:** route-gaps
**Priority:** must
**Complexity:** 2/10
**Model:** sonnet
**Wave:** 1
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Create `app/research/page.tsx` as a substantive stub page. Simultaneously unlock the live `/research` nav link in `Header.tsx` (currently commented out with TODO(T25)) and fix three broken `"#"` URLs in `Blog7Demo.tsx`. This unblocks the live `href="/research"` in `About.tsx` and makes navigation consistent.

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

Three separate issues must be fixed together in this task:

1. `components/About.tsx` has a live `<Link href="/research">` that currently 404s
2. `components/Header.tsx` line 65-66: the "Research Hub" nav link under Resources is commented out with `// TODO(T25): Uncomment when /research page is built` — this task IS the build
3. `components/Blog7Demo.tsx`: `buttonUrl: "#"` should be `"/blog"`, and all three post `url: "#"` should point to `/blog/post-1`, `/blog/post-2`, `/blog/post-3`

The research page itself should feel substantive even as a stub — a hero heading, short description of research intent, and a "coming soon" placeholder section.

This task is part of **Wave 1** — no dependencies, can start immediately.

---

## Requirements

### New file: `app/research/page.tsx`

- Server component (no `'use client'`)
- Export `metadata` with title `"Research Hub | Barbets Duet"`
- Hero section: eyebrow label + large serif heading + descriptive paragraph
- Use `KineticReveal` on the h1 (import from `@/components/motion/KineticReveal`)
- Use `ScrollGlow` ambient decoration (import from `@/components/motion/ScrollGlow`)
- "Coming soon" section: a visually clean placeholder — a card grid or empty state with 2-3 research area tiles (static, hardcoded)
- Wrap with standard shell: Header + StickyFooter (no CTA needed)

### Modify: `components/Header.tsx`

Current state (lines 62-68):
```tsx
{
  heading: 'Resources',
  links: [
    // TODO(T25): Uncomment when /research page is built
    // { text: 'Research Hub', href: '/research' },
    { text: 'About Our Mission', href: '/about/mission-vision' },
  ]
}
```

Required change: remove the comment lines and uncomment the Research Hub entry:
```tsx
{
  heading: 'Resources',
  links: [
    { text: 'Research Hub', href: '/research' },
    { text: 'About Our Mission', href: '/about/mission-vision' },
  ]
}
```

### Modify: `components/Blog7Demo.tsx`

Current state:
```tsx
buttonUrl: "#",
posts: [
  { ..., url: "#" },   // post-1
  { ..., url: "#" },   // post-2
  { ..., url: "#" },   // post-3
]
```

Required change:
```tsx
buttonUrl: "/blog",
posts: [
  { ..., url: "/blog/post-1" },
  { ..., url: "/blog/post-2" },
  { ..., url: "/blog/post-3" },
]
```

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/research/page.tsx` exists and renders at `/research` without 404
- [ ] Research page has a heading, description, and a "coming soon" placeholder section
- [ ] `KineticReveal` wraps the h1 on the research page
- [ ] Header nav "Research Hub" link under Resources is uncommented and visible in dropdown
- [ ] `Blog7Demo` `buttonUrl` is `"/blog"` (not `"#"`)
- [ ] All three post `url` fields are `/blog/post-1`, `/blog/post-2`, `/blog/post-3` (not `"#"`)
- [ ] `npx tsc --noEmit` passes
- [ ] No console errors

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/research/page.tsx` | create | Research route — substantive stub page |
| `components/Header.tsx` | modify | Uncomment Research Hub nav link (remove 2 comment lines) |
| `components/Blog7Demo.tsx` | modify | Fix buttonUrl and 3 post url fields from "#" to real paths |

### File Ownership Notes

`Header.tsx` is a shared component. The change is minimal (remove 2 comment lines). No other Wave 1 tasks touch Header. Confirm no merge conflict before committing.

---

## Implementation Guidance

### Research Page Pattern

Follow `app/stories/page.tsx` and `app/events/page.tsx` for the shell structure. Both use identical wrapper patterns with `ScrollGlow` and `KineticReveal`.

Example research page structure:

```tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export const metadata: Metadata = {
  title: 'Research Hub | Barbets Duet',
  description: 'Explore Barbets Duet research into ecosystem restoration, sustainable finance, and community-led conservation.',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />

        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-4xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                Research & Publications
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                  Research <br /> Hub
                </h1>
              </KineticReveal>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed">
                Rigorous inquiry into the systems that govern ecological restoration and community resilience. Publications and findings coming soon.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-48 px-6">
          <div className="max-w-[1600px] mx-auto">
            {/* 3-column card grid with research area stubs */}
          </div>
        </section>
      </main>
      <StickyFooter />
    </div>
  );
}
```

### Coming Soon Card Grid

Add 3 research area cards (hardcoded static data). Use border/card styling consistent with the rest of the site. Example areas:
- "Ecosystem Finance Models" — "Exploring how market mechanisms can align economic incentives with long-term habitat restoration."
- "Community Behaviour Change" — "Understanding what drives sustained conservation behaviour in rural communities."
- "Biodiversity Measurement" — "Developing accessible metrics for tracking species recovery and habitat health."

Each card: heading + 1-line description + "Coming Soon" badge. Keep styling minimal.

### Header.tsx Edit

The file is at `components/Header.tsx`. The exact lines to change are in the `communityDropdownData` array, in the "Resources" heading object. Remove the 2 comment lines and uncomment the link object. Do not touch any other part of the file.

### Blog7Demo.tsx Edit

The file is at `components/Blog7Demo.tsx`. Three changes:
1. Line 9: `buttonUrl: "#"` → `buttonUrl: "/blog"`
2. Line 19: `url: "#"` (post-1) → `url: "/blog/post-1"`
3. Line 30: `url: "#"` (post-2) → `url: "/blog/post-2"`
4. Line 41: `url: "#"` (post-3) → `url: "/blog/post-3"`

### Code Style

- Next.js 15 App Router, TypeScript strict
- Tailwind v4 — use CSS variable tokens, not raw hex
- Path alias: `@/` maps to project root
- Server component (no `'use client'`) so `export const metadata` works directly

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

- RG-3 (Blog index) benefits from `Blog7Demo.tsx` URLs being fixed, but it does not depend on RG-2 being merged first.
- No hard blocking dependencies downstream.

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-2_route-gaps.md`

---

## Commit Guidelines

```
feat(research): add /research page + unlock nav link + fix Blog7Demo URLs

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] `/research` renders in browser without error
- [ ] Header dropdown shows "Research Hub" link
- [ ] Blog7 "Explore all posts" button points to `/blog`

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-2 | Wave: 1*
