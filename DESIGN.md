# Design System: Barbets Duet

> **Canonical reference for the "Scholarly Cycle" aesthetic.**
> All screens, components, and interactions trace back to this document.
> Last updated: 2026-05-20

## 1. Brand Identity & Visual Atmosphere

Barbets Duet is a global ecological restoration collective. The visual language draws from natural history journals, scientific periodicals, and circular cultural references — not tech-startup minimalism. It is expressive, rigorous, and grounded in the living world.

The interface operates primarily in **dark mode** (Night Forest `#06211A` background) with a **light mode** variant (Platinum `#F4F4F5` background) accessible via `[data-theme="light"]`. The accent colour — Neon Lime `#DBFF66` — is used sparingly, only for CTAs, active states, and interactive highlights. It should feel like a single flash of light in the canopy, not a repeated pattern.

A scholarly, editorial interface inspired by natural history journals and scientific periodicals. The atmosphere is measured and purposeful — "Scholarly Cycle" — where expressive slab-serif headings (BioRhyme) frame precise geometric body copy (DM Sans) against a deep Night Forest canvas.

**Design dials:**
- Density: 4 (Daily App — generous whitespace, content breathes)
- Variance: 8 (Offset asymmetric — deliberate broken grids, bento structures)
- Motion: 6 (Fluid CSS with spring physics on interactive elements)

## 2. Colour Palette & Roles

These are the **only 5 base colours** in the system. No other hex values are permitted.

| Token | Hex | Tailwind class | Functional Role |
|-------|-----|------|-----------------|
| **Neon Lime** | `#DBFF66` | `neon-lime` | Primary CTA accent, active states, focus rings, interactive highlights |
| **Viridian** | `#006F53` | `viridian` | Brand green, light-mode accent, secondary links |
| **Night Forest** | `#06211A` | `night-forest` | Dark background, primary text on light surfaces |
| **White** | `#FFFFFF` | `white` | Card surfaces, content backgrounds within sections |
| **Platinum** | `#F4F4F5` | `platinum` | Light mode background, foreground on dark backgrounds |

**Semantic layer (CSS variables):**
- `--background`: `#06211A` (dark) / `#F4F4F5` (light)
- `--foreground`: `#F4F4F5` (dark) / `#06211A` (light)
- `--accent`: `#DBFF66` (dark) / `#006F53` (light)
- `--primary`: `#DBFF66` (dark) / `#006F53` (light)
- `--brand`: `#006F53` (both modes)

**Dark mode renders:** Night Forest background, Neon Lime accents
**Light mode renders:** Platinum background, Viridian accents

**Opacity variants:** Use Tailwind modifier syntax — `text-night-forest/70`, `bg-platinum/50`, `border-platinum/10`.

**Banned colour patterns:**
- Pure black (`#000000`) — use Night Forest instead
- Pure white text — use `text-platinum` on dark backgrounds
- `text-black`, `bg-black`, `text-white`, `bg-white` — use brand token equivalents
- Off-brand tokens: `#2C3E35`, `#FAF9F6`, `#C7F16C`, `#F4F4F0`, `#0B0F19`, `#E5EFE2`, `#2A4433`, `#35A1AB`, `#8CD8DF`
- Tailwind `gray-*` classes — use `night-forest/N` opacity variants instead
- Neon glow box-shadows — use tinted diffusion shadows at low opacity only

## 3. Typography Rules

**Font stack:**
- **Display / Headings:** BioRhyme — loaded via `next/font/google`, available as `font-serif` Tailwind class. Used for all h1–h3, hero headlines, pull quotes, testimonials. Tracking: `tracking-tight` for display scale, `tracking-wider` for labels/eyebrows.
- **Body / UI text:** DM Sans — loaded via `next/font/google`, available as `font-sans` Tailwind class. Used for all body copy, navigation, form labels, metadata. Leading: `leading-relaxed`. Max line length: `max-w-[65ch]`.
- **Code / Data / Labels:** JetBrains Mono — loaded via `next/font/google`, available as `font-mono` Tailwind class. Used for timestamps, coordinates, data labels, mono labels, tracking numbers.

**Typography scale:**

| Level | Class | Usage |
|-------|-------|-------|
| H1 Display | `font-serif text-5xl md:text-8xl font-light tracking-tight leading-[0.9]` | Hero sections, page statements |
| H2 Section | `font-serif text-4xl md:text-6xl font-light tracking-tight leading-tight` | Section headings |
| H3 Subsection | `font-serif text-2xl md:text-4xl font-light leading-snug` | Card headings, sub-sections |
| Eyebrow | `font-mono text-[10px] tracking-[0.2em] uppercase` | Section labels, figure captions |
| Body Large | `font-sans text-lg leading-relaxed` | Intro paragraphs |
| Body | `font-sans text-base leading-relaxed` | General body copy |
| Body Small | `font-sans text-sm leading-relaxed` | Captions, secondary copy |
| Micro | `font-mono text-[10px] tracking-widest uppercase` | Data badges, status chips |

**Banned typography:**
- `Inter` font — banned entirely
- Generic system serif fonts — `Times New Roman`, `Georgia`, `Garamond`
- Title Case On Every Header — use sentence case instead

## 4. Component Stylings

**Buttons:**
- Primary: `bg-night-forest text-platinum` (dark surfaces) or `bg-platinum text-night-forest` (light surfaces) with `hover:bg-*/90` and `active:scale-[0.98]`
- CTA / Accent: `bg-neon-lime text-night-forest` for main calls to action
- Ghost/Outline: `border-night-forest text-night-forest hover:bg-night-forest hover:text-neon-lime` on light surfaces
- Shape: `rounded-full` for pill buttons; sharp (`rounded-none`) for editorial/archival contexts
- No neon outer glows. No custom mouse cursors.

**Cards:**
- Use only when elevation communicates hierarchy
- Corner radius: `rounded-[2rem]` for modern layouts; `rounded-none` for archival/journal aesthetic
- Shadow: `shadow-sm` with no coloured glow — tinted diffusion only
- Border: `border border-night-forest/10` (light) or `border border-platinum/10` (dark)
- High-density contexts: replace cards with `border-t` dividers or negative space

**Inputs / Forms:**
- Label above input (never floating labels)
- Focus ring: `focus:ring-2 focus:ring-viridian focus:border-transparent`
- Error text below input, inline
- Standard gap: `gap-2` between label / input / helper text blocks

**Loading states:**
- Skeletal loaders matching exact layout dimensions — no circular spinners
- Shimmer animation: `animate-shimmer` (defined in globals.css)

**Empty states:**
- Composed visual indicating how to populate content
- Never "No data" text alone

**Navigation — current page:**
- Active nav items use underline indicator (`h-[2px] bg-night-forest` or `bg-platinum` depending on scroll state)
- Never rely solely on colour — always a structural indicator too

## 5. Layout Principles

**Grid system:**
- CSS Grid preferred over Flexbox percentage math
- Max-width container: `max-w-[1600px] mx-auto px-6` for full-width sections; `max-w-[1600px] mx-auto` for contained content
- Section pattern: `<section className="pt-XX pb-XX px-6">` with internal `max-w-[1600px] mx-auto` wrapper
- Asymmetric: `grid-template-columns: 3fr 2fr` or offset patterns preferred over `grid-cols-3 gap-6` for feature rows
- The "3 equal columns" feature row is **banned** — use zig-zag, offset, or bento grid instead

**Spacing:**
- Section vertical padding: `pt-24 pb-24` as baseline; `pt-32 pb-32` for primary sections
- Internal card padding: `p-8` or `p-10` for generosity
- Double spacing before calling it done — dense layouts feel unfinished here

**Viewport safety:**
- Full-height sections: `min-h-[100dvh]` — never `h-screen` (iOS Safari jump bug)
- No horizontal overflow on mobile — critical failure

**Depth and overlap:**
- Overlapping elements (negative margins, offset images) allowed for visual depth
- Cards can protrude into adjacent sections via negative top margin

## 6. Motion & Interaction

**Spring physics baseline:**
- `type: "spring", stiffness: 100, damping: 20` for all interactive elements
- No linear easing on principal animations

**Entry animations:**
- Page-level: `framer-motion` `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`
- Staggered lists: `staggerChildren` delay of `0.05–0.1s` per item

**KineticReveal wrapper:**
- Location: `components/motion/KineticReveal.tsx`
- Apply to: all section headings, content blocks, stat groups
- Never apply to navigation or interactive controls

**ScrollGlow wrapper:**
- Location: `components/motion/ScrollGlow.tsx`
- Apply to: page backgrounds, section-level ambient effects
- Never apply to individual elements within a section

**Performance rules:**
- Animate exclusively via `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Grain/noise overlays: fixed, `pointer-events-none` pseudo-elements only — never on scrolling containers
- Perpetual motion components: isolated `'use client'` leaf components, memoized with `React.memo`
- No `window.addEventListener('scroll')` — use Framer Motion hooks or Intersection Observer

## 7. Anti-Patterns (Banned)

**Visual:**
- No pure black (`#000000`) anywhere
- No neon outer glows (`box-shadow: 0 0 Xpx #DBFF66`)
- No oversaturated accent colours (saturation > 80%)
- No excessive gradient text on large headers
- No AI purple/blue gradient aesthetic
- No random dark sections in an otherwise light page (or vice versa)

**Typography:**
- No `Inter` font
- No generic serifs (`Times New Roman`, `Georgia`, `Garamond`)
- No Title Case On Headers — sentence case always
- No Lorem Ipsum text anywhere

**Layout:**
- No 3-equal-column card layouts
- No centred Hero layouts (variance > 4)
- No `h-screen` — use `min-h-[100dvh]`
- No complex flexbox percentage math (`w-[calc(33%-1rem)]`)
- No arbitrary `z-50` without systemic reason

**Content:**
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer"
- No exclamation marks in success messages
- No generic names ("John Doe", "Acme Corp")
- No fake round numbers (`99.99%`, `50%`)
- No filler UI text ("Scroll to explore", bouncing chevrons)
- No `href="#"` — all links point to real routes or are explicitly commented TODO

**Code:**
- No inline styles mixed with Tailwind classes
- No hardcoded hex values in components — use CSS variables or Tailwind brand token classes
- No `components/ui/` file modifications — shadcn/ui is CLI-managed only
- No arbitrary z-index stacking without a z-scale system

**Icons:**
- Lucide is in use — ensure consistent `strokeWidth={1.5}` across all icons
- No rocketship for "Launch", no shield for "Security" — use less obvious icons

## 8. Agent Skills Reference

| Skill | Location | When to Use |
|-------|----------|-------------|
| `redesign-existing-projects` | `.agents/skills/redesign-existing-projects/` | Full component audit, design debt reduction |
| `stitch-design-taste` | `.agents/skills/stitch-design-taste/` | Generating new DESIGN.md or screen specs for Stitch |
| `design-taste-frontend` | `.agents/skills/design-taste-frontend/` | All new component implementations — baseline rules |
| `high-end-visual-design` | `.agents/skills/high-end-visual-design/` | Premium section builds, hero layouts, complex animations |
| `brandkit` | `.agents/skills/brandkit/` | Brand asset reference, logo usage, icon sets |

## 9. File Ownership

| File | Owner | Notes |
|------|-------|-------|
| `app/globals.css` | Design system | Single source of truth for all tokens. Do not add off-brand values. |
| `app/layout.tsx` | Platform | Do not touch Firebase or AuthProvider wiring. Font loading only. |
| `components/ui/` | shadcn/ui CLI | Never edit manually. Regenerate via CLI only. |
| `components/motion/` | Motion system | KineticReveal and ScrollGlow — apply consistently, never modify internals |
| `lib/firebase.ts` | Backend | Firebase client init — do not change |
| `components/AuthProvider.tsx` | Auth | Google OAuth session — do not change |
| `.env*` | Infrastructure | Never commit, never touch in component code |

---

*Generated by KARIMO T01 — Brand audit & design system bootstrap*
*PRD: barbets-duet-full-build | Wave 1 | Model: Sonnet*
*To extend: see `.agents/skills/stitch-design-taste/` for full DESIGN.md generation spec*
