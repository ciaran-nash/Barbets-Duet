# Task Brief: T01

**Title:** Brand audit & design system bootstrap
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 1

---

## Objective

Perform a full brand audit of the existing codebase and align all visual tokens, fonts, and component colours to the official Barbets Duet brand system ("Scholarly Cycle" aesthetic). Generate DESIGN.md as the canonical design reference for all future development.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The current codebase was scaffolded with approximate brand colours (`#2C3E35`, `#FAF9F6`, `#C7F16C`) that are close but do not match the official brand palette signed off by @digitalorchard.design. BioRhyme and DM Sans are already loaded in `app/layout.tsx` via `next/font/google`, but they are not consistently applied across all components — many still fall through to generic system fonts. The Header uses hardcoded hex values that don't match brand tokens.

This task is **Wave 1 Foundation** — it must complete before any other visual task. Every subsequent component build depends on the token system established here.

---

## Research Context

### Patterns to Follow

- **KineticReveal** (`components/motion/KineticReveal.tsx`) — universal animation wrapper for section reveals. Apply to all headings and content blocks.
- **ScrollGlow** (`components/motion/ScrollGlow.tsx`) — ambient background glow. Apply to page backgrounds, not individual elements.
- **Font variables** — `--font-serif` (BioRhyme), `--font-sans` (DM Sans), `--font-mono` (JetBrains Mono) already set in `app/layout.tsx`. Use `font-serif` and `font-sans` Tailwind classes throughout.
- **Max-width pattern** — `max-w-[1600px] mx-auto px-6` used consistently across sections. Maintain this.
- **Section pattern** — `<section className="pt-XX pb-XX px-6">` with internal `max-w-[1600px] mx-auto` wrapper.

### Known Issues to Address

- ⚠️ **Off-brand tokens in globals.css** — `--color-forest: #2C3E35` (should be `#06211A`), `--color-platinum: #FAF9F6` (should be `#F4F4F5`), `--color-accent: #C7F16C` (should be `#DBFF66`).
- ⚠️ **Header uses hardcoded hex** — `bg-[#F4F4F0]`, `text-[#111111]`, `bg-[#2C3E35]` throughout `components/Header.tsx`. Replace with CSS variables.
- ⚠️ **No dark/light mode semantic tokens** — `:root` has only one set of values. Add `[data-theme="dark"]` and `[data-theme="light"]` blocks or use CSS `@media (prefers-color-scheme: dark)`.
- ⚠️ **No Viridian token** — `#006F53` is not defined anywhere yet.

---

## Requirements

1. **globals.css token update** — Replace all colour values to match exact brand HEX. Define semantic tokens for background, foreground, accent, brand-green, etc.
2. **Font audit** — Confirm `font-serif` applies BioRhyme and `font-sans` applies DM Sans everywhere. Remove any residual `font-inter` or generic serif references.
3. **Component sweep** — Walk through all components in `components/` and replace hardcoded hex values with CSS variables or Tailwind token classes.
4. **Header fix** — Replace all hardcoded colours in `components/Header.tsx` with brand tokens.
5. **Dark/light mode** — Night Forest (`#06211A`) as dark bg with Neon Lime accents; Platinum (`#F4F4F5`) as light bg with Viridian accents.
6. **DESIGN.md** — Generate a complete design system skeleton at project root covering: colours, typography scale, spacing, motion principles, component catalogue, anti-patterns.

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `app/globals.css` contains tokens for exactly `#DBFF66`, `#006F53`, `#06211A`, `#FFFFFF`, `#F4F4F5` — no other base colours
- [ ] BioRhyme loads via `font-serif` class; DM Sans loads via `font-sans` class — confirmed in browser
- [ ] No `Inter` font reference remains in any file
- [ ] No pure black (`#000000` or `#111111`) used in components — replaced with Night Forest `#06211A` or opacity variants
- [ ] No off-brand neon glow effects (e.g. `shadow-[0_0_30px_#C7F16C]` type patterns)
- [ ] `components/Header.tsx` uses brand token classes, not hardcoded hex
- [ ] Dark mode renders: Night Forest background, Neon Lime accents
- [ ] Light mode renders: Platinum background, Viridian accents
- [ ] `DESIGN.md` exists at project root with colour tokens, type scale, and motion section
- [ ] TypeScript strict mode: `npx tsc --noEmit` passes with zero errors

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/globals.css` | modify | Replace off-brand tokens with exact brand HEX values; add @theme block with all 5 colours; define semantic CSS variables |
| `app/layout.tsx` | modify | Review font loading; confirm variable names match globals.css usage |
| `components/Header.tsx` | modify | Replace all hardcoded hex with CSS variable references or Tailwind token classes |
| `components/**` | modify | Sweep all component files — replace off-brand hex values with brand tokens |
| `DESIGN.md` | create | Full design system skeleton document |

### File Ownership Notes

`app/globals.css` is the single source of truth for all tokens. `app/layout.tsx` requires review — do not change the Firebase or AuthProvider wiring. `components/ui/` is shadcn/ui — DO NOT edit these files, they are regenerated by CLI only.

---

## Implementation Guidance

### Brand Token Mapping

```css
/* app/globals.css — @theme block (Tailwind v4 config) */
@theme {
  --color-neon-lime: #DBFF66;
  --color-viridian: #006F53;
  --color-night-forest: #06211A;
  --color-white: #FFFFFF;
  --color-platinum: #F4F4F5;

  /* Semantic aliases */
  --color-background: #06211A;       /* dark default */
  --color-foreground: #F4F4F5;
  --color-accent: #DBFF66;           /* primary CTA accent */
  --color-brand: #006F53;            /* brand green */
  --color-forest: #06211A;           /* alias for bg */
}
```

### Typography Classes

- Headings: `font-serif` class → BioRhyme
- Body: `font-sans` class → DM Sans
- Code/data labels: `font-mono` class → JetBrains Mono

### Anti-Patterns to Remove

- `bg-[#2C3E35]` → `bg-night-forest` or `bg-background`
- `text-[#FAF9F6]` → `text-foreground` or `text-platinum`
- `text-[#C7F16C]` → `text-accent` or `text-neon-lime`
- `text-[#111111]` → `text-night-forest`
- `bg-[#F4F4F0]` → `bg-platinum`
- Any `font-inter` → remove entirely

### DESIGN.md Structure

Generate DESIGN.md at project root with these sections:
1. Brand Identity
2. Colour Tokens (with HEX, role, usage examples)
3. Typography Scale (H1–body with exact specs)
4. Spacing System
5. Motion Principles (KineticReveal, ScrollGlow usage)
6. Component Catalogue (list all components with brief description)
7. Anti-Patterns (prohibited patterns)
8. Agent Skills reference

### Aesthetic Direction

"Scholarly Cycle" — think: natural history journals, scientific periodicals, circular cultural references. Not tech-startup. Not purely minimal. Expressive slab-serif headings (BioRhyme) against clean geometric body copy (DM Sans).

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`
- `firebase-applet-config.json`
- `firestore.rules`
- `firestore.indexes.json`
- `components/ui/` — shadcn/ui primitives (CLI-managed only)

### Files Requiring Review

- `lib/firebase.ts` — Firebase client init, do not change
- `components/AuthProvider.tsx` — Google OAuth session, do not change
- `app/layout.tsx` — Review only, minimal changes (font confirmation only)

---

## Dependencies

### Upstream Tasks

None — this is a Wave 1 foundation task with no dependencies.

### Downstream Impact

Every visual task in Waves 2–6 depends on the tokens established here. T28 (Full DESIGN.md) extends the skeleton created by this task.

---

## Commit Guidelines

```
style(brand): align globals.css tokens to official Barbets Duet palette

Co-Authored-By: Claude <noreply@anthropic.com>
```

Types: feat, fix, refactor, test, docs, chore, style

---

## Validation Checklist

Before marking complete:
- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes (or equivalent)
- [ ] No `never_touch` files modified
- [ ] Visual spot-check: open `/` — headings are BioRhyme slab, body is DM Sans, accent is Neon Lime `#DBFF66`

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T01 | Wave: 1*
