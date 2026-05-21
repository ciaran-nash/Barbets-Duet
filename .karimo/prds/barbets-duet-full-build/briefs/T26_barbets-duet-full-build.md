# Task Brief: T26

**Title:** Blog / News / FAQ pages
**PRD:** barbets-duet-full-build
**Priority:** could
**Complexity:** 3/10
**Wave:** 6

---

## Objective

Build three content pages — `/blog` (long-form posts), `/news` (announcements), and `/faq` (accordion Q&A) — all backed by Sanity CMS so non-dev Barbets Duet staff can manage content without developer involvement.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

As Barbets Duet grows, staff will want to publish announcements, articles, and answer common questions without filing developer tickets. These three pages use Sanity content types and follow simple patterns: blog posts and news are document lists, FAQ is an accordion.

The `/blog` and `/news` pages are similar in structure; `/faq` uses shadcn Accordion UI primitive.

This task is **Wave 6** — depends on T20 (Sanity GROQ queries available).

---

## Requirements

1. Create `app/blog/page.tsx` — blog post list from Sanity `blogPost` content type
2. Create `app/news/page.tsx` — announcements list from Sanity `newsItem` content type
3. Create `app/faq/page.tsx` — accordion FAQ from Sanity `faqItem` content type
4. All three pages use static fallback data if Sanity types not yet published
5. Add Sanity schemas for `blogPost`, `newsItem`, `faqItem` to `sanity/schemas/`
6. Register new schemas in `sanity/schemaTypes/index.ts`

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/blog` page renders with post list
- [ ] `/news` page renders with announcement list
- [ ] `/faq` page renders with accordion Q&A
- [ ] All three pages use `KineticReveal` on headings
- [ ] FAQ accordion uses shadcn Accordion component from `components/ui/`
- [ ] Sanity schemas added for all three content types
- [ ] Staff can publish new FAQ items via Studio
- [ ] Mobile responsive
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/blog/page.tsx` | create | Blog post list page |
| `app/news/page.tsx` | create | News announcements page |
| `app/faq/page.tsx` | create | FAQ accordion page |
| `sanity/schemas/blogPost.ts` | create | Sanity blog post schema |
| `sanity/schemas/newsItem.ts` | create | Sanity news item schema |
| `sanity/schemas/faqItem.ts` | create | Sanity FAQ item schema |
| `sanity/schemaTypes/index.ts` | modify | Register new schemas |

---

## Implementation Guidance

### FAQ Page (simplest — start here)

```tsx
// app/faq/page.tsx
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion';

// Static fallback data:
const faqItems = [
  {
    question: 'What is a Learning Site?',
    answer: 'A Learning Site is a real place where communities practice ecological stewardship...'
  },
  {
    question: 'What is Jumuiya?',
    answer: 'Jumuiya is a Kiswahili word meaning "community with a shared vision"...'
  },
  {
    question: 'How can I volunteer?',
    answer: 'You can apply to volunteer at a Jumuiya learning site via our Get Involved page...'
  },
  // ... more FAQs
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-[900px] mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-8 block">
              Frequently Asked Questions
            </span>
            <KineticReveal>
              <h1 className="font-serif text-6xl font-bold mb-16">
                Questions & Answers
              </h1>
            </KineticReveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/10">
                  <AccordionTrigger className="font-serif text-xl text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-foreground/70 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
```

### Blog and News Layout

Both are simple list pages:
```
Section hero: "Blog" / "News & Announcements"
Article cards in a grid (2-3 cols on desktop, 1 on mobile)
Each card: image, title, date, excerpt, "Read More" link
```

### Static Seed Content

Create 2-3 placeholder posts for each page so they render non-empty:

**Blog posts:**
- "Seaweed, Soap, and Sovereignty" — the Msichoke story
- "What Mosaic Rights Means for the Next Generation"
- "The Barbets Game: How We Share Knowledge"

**News items:**
- "Invention Convention 2026 — Registration Open"
- "New Learning Site Data Published for 2025"
- "Barbets Duet Welcomes Hannacroix Creek to the Network"

**FAQ items:** (5-8 questions covering: what is a Learning Site, what is Jumuiya, how to volunteer, how to donate, what is Mosaic Rights, what is the Barbets Game)

### Sanity Schema for faqItem

```typescript
// sanity/schemas/faqItem.ts
export const faqItemSchema = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower number = shown first' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Volunteering', 'Donations', 'About', 'Learning Sites', 'General'] }
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/` — use Accordion from here, don't edit it

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T20 | Sanity GROQ queries | Can use static fallback data if needed |
| T18 | Sanity schema structure patterns | Follow same `defineType`/`defineField` patterns |

### Downstream Impact

None.

---

## Commit Guidelines

```
feat(content): build /blog, /news, /faq pages with Sanity backing

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `/faq` accordion opens and closes correctly
- [ ] `/blog` and `/news` render post cards
- [ ] New FAQ items can be created in Sanity Studio

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T26 | Wave: 6*
