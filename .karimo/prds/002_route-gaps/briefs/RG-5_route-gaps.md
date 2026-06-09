# Task Brief: RG-5

**Title:** Legal pages (privacy, terms, cookies)
**PRD:** route-gaps
**Priority:** must
**Complexity:** 2/10
**Model:** sonnet
**Wave:** 2
**Feature Issue:** (see GitHub issue for route-gaps PRD)

---

## Objective

Create a shared legal layout file and three legal sub-pages: privacy, terms, and cookies. All pages use placeholder copy with a prominent "TODO" banner. The layout is minimal — Header + StickyFooter, no CTA, no decorative motion components.

---

## Context

**Parent Feature:** route-gaps PRD — "Stub Missing Sitemap Routes"

`/legal/privacy`, `/legal/terms`, and `/legal/cookies` are sitemap routes required for footer links to resolve. All content is placeholder — real legal text is out of scope (flagged for legal review before production). The design should be minimal clean prose, not the full editorial layout used for content pages.

This task is part of **Wave 2** — no dependencies, can be executed in parallel with RG-3, RG-4.

---

## Requirements

### New file: `app/legal/layout.tsx`

- Server component
- Wraps all pages under `/legal/*` with Header + StickyFooter
- No CTA
- No ScrollGlow or KineticReveal

### New file: `app/legal/privacy/page.tsx`

- Server component
- Export `metadata` with title `"Privacy Policy | Barbets Duet"`
- Prominent TODO banner at top
- Placeholder privacy policy copy (sections: Data Collection, Use of Data, Cookies, Third Parties, Contact)

### New file: `app/legal/terms/page.tsx`

- Server component
- Export `metadata` with title `"Terms of Service | Barbets Duet"`
- Prominent TODO banner at top
- Placeholder terms of service copy (sections: Acceptance, Use of Service, Intellectual Property, Limitation of Liability, Contact)

### New file: `app/legal/cookies/page.tsx`

- Server component
- Export `metadata` with title `"Cookie Policy | Barbets Duet"`
- Prominent TODO banner at top
- Placeholder cookie policy copy (sections: What Are Cookies, How We Use Them, Managing Cookies, Contact)

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/legal/layout.tsx` exists and wraps all legal pages with Header + StickyFooter
- [ ] `/legal/privacy` renders without 404
- [ ] `/legal/terms` renders without 404
- [ ] `/legal/cookies` renders without 404
- [ ] Each page displays a visible yellow/amber "TODO" banner at the top of the content area
- [ ] Each page has a correct metadata title
- [ ] Shared layout renders Header and StickyFooter correctly on all three pages
- [ ] `npx tsc --noEmit` passes
- [ ] No console errors

**All criteria must pass before task is complete.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/legal/layout.tsx` | create | Shared wrapper for all /legal/* pages |
| `app/legal/privacy/page.tsx` | create | Privacy policy route |
| `app/legal/terms/page.tsx` | create | Terms of service route |
| `app/legal/cookies/page.tsx` | create | Cookie policy route |

### File Ownership Notes

No shared files touched. No conflict risk with other tasks.

---

## Implementation Guidance

### Legal Layout

The `app/legal/layout.tsx` acts as a nested layout in Next.js App Router — it wraps all pages under the `/legal` segment.

```tsx
// app/legal/layout.tsx
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Header />
      <main className="pt-40 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
      <StickyFooter />
    </div>
  );
}
```

### TODO Banner

Each page should display a visually prominent placeholder banner. Suggested style:

```tsx
<div className="mb-12 p-4 rounded-xl border border-yellow-400/50 bg-yellow-400/10 text-yellow-700 dark:text-yellow-300">
  <p className="text-sm font-mono font-semibold">
    TODO: Replace with real legal text before production. This page contains placeholder content only.
  </p>
</div>
```

### Individual Page Structure

Each page follows this pattern:

```tsx
// app/legal/privacy/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Barbets Duet',
  description: 'Barbets Duet privacy policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* TODO Banner */}
      <div className="mb-12 p-4 rounded-xl border border-yellow-400/50 bg-yellow-400/10 text-yellow-700 dark:text-yellow-300">
        <p className="text-sm font-mono font-semibold">
          TODO: Replace with real legal text before production. This page contains placeholder content only.
        </p>
      </div>

      {/* Page header */}
      <h1 className="text-4xl font-serif font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm font-mono text-muted-foreground mb-12">
        Last updated: [PLACEHOLDER DATE]
      </p>

      {/* Sections */}
      <section className="mb-10">
        <h2 className="text-xl font-serif font-semibold mb-4">Data We Collect</h2>
        <p className="text-muted-foreground leading-relaxed">
          [PLACEHOLDER] We collect information you provide directly to us, such as when you
          create an account, contact us, or subscribe to updates. This may include your name,
          email address, and usage data.
        </p>
      </section>
      {/* ... additional sections ... */}
    </>
  );
}
```

### Sections per page

**Privacy Policy sections:**
1. Data We Collect
2. How We Use Your Data
3. Cookies and Tracking
4. Third-Party Services
5. Your Rights
6. Contact Us

**Terms of Service sections:**
1. Acceptance of Terms
2. Use of the Service
3. Intellectual Property
4. Limitation of Liability
5. Changes to Terms
6. Contact Us

**Cookie Policy sections:**
1. What Are Cookies
2. How We Use Cookies
3. Types of Cookies We Use
4. Managing Your Cookie Preferences
5. Contact Us

### Code Style

- Next.js 15 App Router, TypeScript strict
- Server components throughout — no `'use client'` needed
- Tailwind v4 — use CSS variable tokens
- The layout provides the page chrome (Header/StickyFooter); individual pages provide only their content (the `<>` fragment)
- Keep prose copy in the page files directly — no separate data file needed
- Do NOT use `prose` Tailwind typography plugin class unless it is confirmed to be installed — use manual Tailwind classes

> **IMPORTANT — no nested `<main>`:** Sub-page files must return a plain fragment (`<>`) or a `<div>` as their root element. Do NOT wrap content in `<main>` — `app/legal/layout.tsx` already renders `<main className="pt-40 pb-32 px-6">`. Wrapping a sub-page in `<main>` produces nested `<main>` elements, which is invalid HTML and will cause layout issues.

### Note on Dark Mode

The TODO banner uses `dark:text-yellow-300` — Tailwind v4 handles dark mode through CSS variables. If the project uses a custom dark mode approach, adjust accordingly.

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

None — Wave 2, can start immediately (parallel with RG-3, RG-4).

### Downstream Impact

None — no tasks depend on RG-5.

---

## GitHub Context

**Branch:** `feature/barbets-duet-full-build`
**Brief:** `.karimo/prds/002_route-gaps/briefs/RG-5_route-gaps.md`

---

## Commit Guidelines

```
feat(legal): add /legal layout + privacy, terms, cookies pages

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] `/legal/privacy` renders in browser with TODO banner visible
- [ ] `/legal/terms` renders in browser with TODO banner visible
- [ ] `/legal/cookies` renders in browser with TODO banner visible
- [ ] Header and StickyFooter appear on all three pages

---

*Generated by KARIMO Brief Writer*
*PRD: route-gaps | Task: RG-5 | Wave: 2*
