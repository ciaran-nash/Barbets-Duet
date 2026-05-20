# Codebase Structure

**Analysis Date:** 2026-05-09

## Directory Layout

```
Barbets-Duet/
├── app/                # Next.js App Router (Pages & Layouts)
│   ├── dashboard/      # Dashboard interface
│   ├── learning-sites/ # Dynamic learning site profiles
│   └── sites/          # Alternative site views
├── components/         # React Components
│   ├── ui/             # Shadcn primitives
│   ├── blocks/         # Large section layouts
│   └── *.tsx           # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Services and utils
├── .planning/          # GSD planning documents
├── public/             # Static assets
├── firebase-applet-config.json # Firebase config
└── next.config.ts      # Next.js config
```

## Directory Purposes

**app/**
- Purpose: Application routing and page structure.
- Contains: `page.tsx`, `layout.tsx`, and route directories.
- Subdirectories: `dashboard/`, `learning-sites/`, `sites/`.

**components/**
- Purpose: UI implementation.
- Contains: Reusable React components.
- Subdirectories:
    - `ui/`: Low-level primitives (buttons, cards, etc.).
    - `blocks/`: High-level landing page sections from shadcnblocks.

**lib/**
- Purpose: Core infrastructure and utilities.
- Contains: `firebase.ts` (Firebase SDK initialization), `utils.ts` (Tailwind logic).

**hooks/**
- Purpose: Shared stateful logic.
- Contains: Responsive design hooks like `use-mobile.ts`.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root application shell.
- `app/page.tsx`: Landing page entry.

**Configuration:**
- `next.config.ts`: Next.js behavior.
- `package.json`: Dependencies and scripts.
- `firebase-applet-config.json`: Firebase environment.

**Core Logic:**
- `lib/firebase.ts`: Database/Auth initialization.
- `components/AuthProvider.tsx`: Auth state provider.

## Naming Conventions

**Files:**
- `PascalCase.tsx`: For React components (e.g., `Hero.tsx`).
- `kebab-case.ts`: For hooks and utility files (e.g., `use-mobile.ts`).
- `page.tsx`/`layout.tsx`: Next.js reserved filenames.

**Directories:**
- `kebab-case`: All directories.

## Where to Add New Code

**New Page:**
- Create a directory in `app/`.
- Add `page.tsx`.

**New Component:**
- UI Primitive: `components/ui/`.
- Feature Component: `components/`.
- Section Block: `components/blocks/`.

**New Service/Utility:**
- `lib/`.

**New Hook:**
- `hooks/`.

---

*Structure analysis: 2026-05-09*
*Update when directory structure changes*
