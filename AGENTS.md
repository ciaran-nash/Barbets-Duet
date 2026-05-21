# Repository Guidelines

## Project Overview

Barbets Duet — Next.js 15 (App Router) web application for an environmental conservation platform. Features learning sites, projects, stories, events, and community pages.

**Stack:** Next.js 15 · React 19 · TypeScript (strict) · Tailwind CSS v4 · Firebase (Firestore + Auth) · Framer Motion · shadcn/ui

## Project Structure

```
app/                  # Next.js App Router pages
  about/              # /about, /about/mission-vision, /about/philosophy-history
  events/             # /events
  learning-sites/     # /learning-sites, /learning-sites/[slug]
  projects/           # /projects
  stories/            # /stories
  globals.css         # Tailwind v4 config lives here (no tailwind.config.js)
  layout.tsx          # Root layout — ThemeProvider, AuthProvider, Header, Footer
components/
  ui/                 # shadcn/ui primitives (never edit directly)
  motion/             # KineticReveal, ScrollGlow — universal animation layer
  learning-sites/     # Learning site page sections
  projects/           # Project components
  stories/            # Story/narrative components
  events/             # Event components
lib/
  data/               # Static data files (learning-sites.ts, events.ts, stories.ts, projects.ts)
  firebase.ts         # Firebase init — DO NOT TOUCH without review
types/
  learning-site.ts    # Central LearningSite interface + sub-types
  narrative.ts        # Story + BarbetsEvent types
  project.ts          # Project type
hooks/
  use-magnetic.ts     # Magnetic hover effect
```

**Architecture notes:**
- `lib/data/*.ts` are static until Sanity CMS is integrated — all content changes go here for now
- `siteSlug` (not `siteOrigin`) is the typed foreign key linking Stories, Events, and Projects to LearningSites
- `KineticReveal` and `ScrollGlow` wrap content for scroll animations — use them universally, don't build one-off animation components
- Tailwind v4: all theme tokens and config in `app/globals.css` — there is no `tailwind.config.js`

## Build & Development Commands

```bash
npm run dev       # Start dev server (Next.js)
npm run build     # Production build
eslint .          # Lint
npx tsc --noEmit  # Type check (no test runner configured)
```

## Coding Style

- TypeScript strict mode — no `any`, no non-null assertions without justification
- Path alias `@/` maps to project root (e.g. `import { LearningSite } from '@/types/learning-site'`)
- ESLint enforced — run before committing
- All new optional fields on types — no breaking changes to existing data shapes
- shadcn/ui components live in `components/ui/` — consume, don't modify

## Commit Conventions

Conventional Commits format observed in history:

```
feat: add new capability
fix: correct a bug
docs(scope): documentation changes
refactor: restructure without behavior change
```

Use `feat:` for new pages/components, `fix:` for corrections, `docs(karimo):` for PRD/planning artifacts.

## Boundaries

**Never touch:**
- `.env*`, `firebase-applet-config.json`, `firestore.rules`, `firestore.indexes.json`
- `components/ui/` (shadcn/ui — regenerate with shadcn CLI if needed)

**Require review before changing:**
- `lib/firebase.ts` — Firebase client initialization
- `components/AuthProvider.tsx` — Google OAuth session management
- `app/layout.tsx` — Root layout affects entire app
