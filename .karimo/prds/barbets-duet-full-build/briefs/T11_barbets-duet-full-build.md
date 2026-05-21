# Task Brief: T11

**Title:** About/careers page
**PRD:** barbets-duet-full-build
**Priority:** could
**Complexity:** 1/10
**Wave:** 2

---

## Objective

Build a static `/about/careers` page covering the Barbets Duet internship programme, the Site Communications Administrator (SCA) role, and the youth engagement programme (2028 legacy). Include clear calls to action directing visitors to `/get-involved`.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Barbets Duet actively recruits volunteers and interns through structured programmes. The careers page communicates the opportunities available and the organisation's commitment to youth engagement as part of its 2028 generational handover mission. This is a static content page — no dynamic data needed.

Key roles to document:
- **Internship programme** — structured learning at a Jumuiya learning site
- **Site Communications Administrator (SCA)** — local communications manager at each site
- **Youth engagement programme** — 2028 legacy programme connecting young people to ecological stewardship

This task is **Wave 2** — depends only on T01 (brand tokens). Low complexity, pure static content.

---

## Requirements

1. Create `app/about/careers/page.tsx` as a static page
2. Content sections: Hero/intro, Internship Programme, SCA Role, Youth Programme, CTA to `/get-involved`
3. On-brand styling: BioRhyme headings, DM Sans body, brand colour tokens
4. Link to `/get-involved` prominently — this is the conversion action for this page
5. Add to Header navigation under About dropdown

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/about/careers/page.tsx` created and renders
- [ ] Page has at minimum: intro, internship section, SCA role section, youth programme section, CTA button to `/get-involved`
- [ ] CTA button links to `/get-involved`
- [ ] Header About dropdown includes link to `/about/careers`
- [ ] Mobile responsive
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/about/careers/page.tsx` | create | Static careers page |
| `components/Header.tsx` | modify | Add `/about/careers` to About dropdown |

---

## Implementation Guidance

### Page Structure

```tsx
// app/about/careers/page.tsx
import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Careers & Opportunities | Barbets Duet',
  description: 'Join the Barbets Duet Jumuiya network as an intern, Site Communications Administrator, or youth programme participant.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-48 pb-24 px-6 text-center">
          <div className="max-w-[900px] mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-8 block">
              Careers & Opportunities
            </span>
            <h1 className="font-serif text-6xl md:text-8xl font-bold leading-tight mb-8">
              Work With Nature.
              <br />Leave a Legacy.
            </h1>
            {/* ... */}
          </div>
        </section>

        {/* Internship Programme */}
        {/* SCA Role */}
        {/* Youth Programme */}
        {/* CTA Block */}
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
```

### Content Points to Cover

**Internship Programme:**
- Structured 4–12 week placements at a Jumuiya learning site
- Disciplines: ecology, agronomy, community development, data science, communications
- Language: "Knowledge Markets" pillar — internships as a revenue stream for sites
- CTA: Apply at /get-involved

**Site Communications Administrator (SCA):**
- Local role: manages communications for one learning site
- Reports on ecological data, community stories, site activities
- Part of the Jumuiya circular peer review chain
- 2028 target: SCA at every one of the 13 sites

**Youth Engagement Programme (2028 Legacy):**
- Generational handover — connecting East African youth to ecological stewardship
- Structured curriculum developed from 20 years of learning
- Barbets Game as a learning tool
- Vision: youth-led restoration networks

### Header Link Addition

```typescript
// In aboutDropdownData 'Who We Are' column:
{ text: 'Careers & Opportunities', href: '/about/careers' },
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Brand tokens | Confirm `text-accent`, `font-serif` resolve |

### Downstream Impact

None directly. T14 (`/get-involved`) is the conversion destination for this page's CTAs.

---

## Commit Guidelines

```
feat(about): add static /about/careers page with internship and SCA content

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `/about/careers` renders correctly
- [ ] "Apply Now" or equivalent CTA links to `/get-involved`
- [ ] Header About dropdown shows Careers link

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T11 | Wave: 2*
