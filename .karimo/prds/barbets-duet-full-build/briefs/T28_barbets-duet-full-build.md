# Task Brief: T28

**Title:** Full DESIGN.md design system
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 3/10
**Wave:** 6

---

## Objective

Generate a complete `DESIGN.md` design system document at project root using the `stitch-design-taste` skill as the structural template. This becomes the canonical design reference for all future Barbets Duet development — documenting all brand tokens, typography, motion principles, components, and anti-patterns.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

T01 generated a `DESIGN.md` skeleton. This task completes it into a full, living design system document that captures everything built across all 6 waves. Any future developer, designer, or AI agent working on Barbets Duet should be able to read `DESIGN.md` and understand:
- The exact colour palette and when to use each colour
- Typography hierarchy with exact font sizes
- All built components and their variants
- Motion principles and how `KineticReveal` / `ScrollGlow` are used
- Anti-patterns and what NOT to do

The "Scholarly Cycle" aesthetic — modernism × tradition, circular frames, scientific vernacular, BioRhyme expressiveness — must be clearly articulated.

This task is **Wave 6** — depends on T01 (initial skeleton). Best run after all other tasks are complete so it documents the real final state of the system.

---

## Requirements

1. Read all existing components in `components/` to document what exists
2. Read `app/globals.css` for the final token values
3. Complete every section of the DESIGN.md with real, accurate information
4. Document all components with their props interfaces and visual role
5. Complete anti-patterns list
6. Include motion system documentation

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `DESIGN.md` at project root is complete (not a skeleton)
- [ ] All 5 brand colours documented with HEX, RGB, role, and usage examples
- [ ] Typography scale documented (H1–body) with exact size values
- [ ] All components in `components/` listed with brief description of role
- [ ] Motion principles documented: KineticReveal usage, ScrollGlow usage, transition specs
- [ ] Anti-patterns section is comprehensive (minimum 10 items)
- [ ] Agent skills section references `.agents/skills/` files correctly
- [ ] "Scholarly Cycle" aesthetic direction clearly articulated

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `DESIGN.md` | modify | Expand skeleton into complete design system |

---

## Implementation Guidance

### Required Sections

```markdown
# DESIGN.md — Barbets Duet Design System

## 1. Brand Identity
- Organisation: Barbets Duet, 20-year experiment, Jumuiya network
- Aesthetic direction: "Scholarly Cycle"
- Design by @digitalorchard.design

## 2. Colour Palette
### Primary Palette (STRICT — only these 5)
| Name | HEX | RGB | Role | Usage |
...

### Opacity Shades
Permitted: 20/40/60/80/100% opacity variants

## 3. Typography
### Fonts
- BioRhyme (Google) — headings. SemiBold + ExtraBold. Slab-serif, expressive, literary.
- DM Sans (Google) — body. Medium + SemiBold. Geometric humanist.
- JetBrains Mono — data labels, meta, technical

### Type Scale
| Token | Font | Weight | Size | Line-height | Tracking |
...

## 4. Spacing System
- Base unit: 4px (Tailwind default)
- Section padding: pt-48 pb-32 px-6
- Max width: max-w-[1600px] mx-auto
- Grid gaps: gap-6 (cards), gap-16 (major sections)

## 5. Motion System
### KineticReveal
- Use for: all headings, key content blocks
- Ease: [0.16, 1, 0.3, 1] (custom quint)
- Duration: 1.2s default, 0.8s for smaller elements
- Direction: 'up' default
- Viewport margin: "-10% 0px"

### ScrollGlow
- Use for: ambient background depth on dark pages
- Opacity range: 0.08–0.15 (never more)
- Size: 800–1400px (large, diffused)
- Colors: foreground (white) or var(--accent)

### Standard Transition
- hover opacity: transition-opacity duration-200
- hover scale: transition-transform duration-200
- ease: cubic-bezier(0.4, 0, 0.2, 1) for UI; [0.16, 1, 0.3, 1] for entrances

## 6. Component Catalogue
### Navigation
- Header (components/Header.tsx): ...

### Learning Sites
- SiteHero: ...
- SiteChallenges: ...
[... all components]

### Motion
- KineticReveal: slice-reveal animation wrapper for text
- ScrollGlow: ambient circular glow for backgrounds

## 7. Layout Patterns
### Standard Page
...

### Section Anatomy
...

## 8. Design Dials (aesthetic tuning)
- DESIGN_VARIANCE: 8 — asymmetric grid, unexpected proportions
- MOTION_INTENSITY: 6 — fluid but not theatrical
- VISUAL_DENSITY: 4 — gallery-airy, content breathes

## 9. Anti-Patterns (DO NOT)
1. Pure black (#000000) — use Night Forest (#06211A) instead
2. Inter font — only BioRhyme + DM Sans permitted
3. Off-brand colours — no blues, purples, pinks outside brand palette
4. Neon glow effects (box-shadow: 0 0 30px) — not Barbets
5. Generic card hover lifts with colored shadow
6. Dense packed layouts — VISUAL_DENSITY = 4, give content space
7. All-caps body text at normal size — mono only for metadata labels
8. Animated number counters (cheap) — use static data display instead
9. Auto-rotating carousels
10. Gradient text (neon gradients) — flat Neon Lime only
11. Emoji in UI copy
12. Hamburger menus without animation
[add more as found during component audit]

## 10. Agent Skills Reference
- .agents/skills/design-taste-frontend — apply to every task
- .agents/skills/redesign-existing-projects — for auditing/upgrading
- .agents/skills/high-end-visual-design — for new premium sections
- .agents/skills/stitch-design-taste — this document's source skill

## 11. Accessibility
- Minimum contrast ratios
- Focus states: ring-2 ring-accent
- Motion: respect prefers-reduced-motion

## 12. Copy Voice
- First person plural: "We" not "Barbets Duet"
- Active, direct language
- No corporate jargon
- Kiswahili terms: Jumuiya, Mosaic Rights used as-is with brief context
- Conservation vocabulary: Learning Site, Abundance of Life
```

### Audit Process

Before writing, read all component files to get accurate documentation:

```
components/Header.tsx
components/Hero.tsx
components/CTA.tsx
components/LearningSites.tsx
components/learning-sites/*.tsx
components/motion/*.tsx
components/stories/*.tsx
components/events/*.tsx
components/projects/*.tsx
components/about/*.tsx
```

Then document each with: what it renders, what props it accepts, what visual role it plays.

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/` — document it exists but don't modify
- Any source code files

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T01 | Initial DESIGN.md skeleton | Read and extend it |

Best run last — after all other waves are complete so the document reflects the actual final state of the system.

### Downstream Impact

This becomes the canonical design reference for all future development on this project. No tasks in this PRD depend on it.

---

## Commit Guidelines

```
docs(design): complete DESIGN.md design system with all components and principles

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] DESIGN.md opens without errors
- [ ] All 5 brand colours present with correct HEX codes
- [ ] Anti-patterns list has minimum 10 items
- [ ] Component catalogue covers all files in components/
- [ ] No placeholder TODO sections remaining

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T28 | Wave: 6*
