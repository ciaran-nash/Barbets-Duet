# Architecture

**Analysis Date:** 2026-05-09

## Pattern Overview

**Overall:** Full-stack Web Application (Next.js App Router)

**Key Characteristics:**
- Server and Client Component architecture
- Unified API routes and Frontend routing
- Firebase-backed persistence and authentication
- 3D-intensive UI (Three.js/Globe.gl)

## Layers

**Page Layer (`app/`):**
- Purpose: Defines the application routing structure and page-level layouts.
- Contains: `layout.tsx`, `page.tsx`, and route-specific clients (e.g., `DashboardClient.tsx`).
- Depends on: Component layer for UI blocks, Lib layer for services.
- Used by: Next.js routing system.

**Component Layer (`components/`):**
- Purpose: Reusable UI elements and layout sections.
- Contains: Feature-specific components (`Hero.tsx`, `About.tsx`), Shadcn UI primitives (`ui/`), and layout blocks (`blocks/`).
- Depends on: Lib layer for Firebase/Utils, Hooks layer for state.
- Used by: Page layer.

**Service Layer (`lib/`):**
- Purpose: External service initialization and utility functions.
- Contains: `firebase.ts` (Firestore/Auth client), `utils.ts` (Tailwind merging).
- Depends on: Firebase SDK.
- Used by: Component and Page layers.

**Hook Layer (`hooks/`):**
- Purpose: Shared React state logic.
- Contains: `useWindowSize.ts`, `use-mobile.ts`.
- Used by: Component layer.

## Data Flow

**Page Load (Dashboard Example):**

1. Next.js App Router matches `/dashboard`.
2. `app/dashboard/page.tsx` (Server Component) renders.
3. `app/dashboard/DashboardClient.tsx` (Client Component) initializes.
4. `DashboardClient` uses `lib/firebase.ts` to fetch data from Firestore.
5. Component tree (`components/LearningSites.tsx`, etc.) renders with fetched data.
6. Animations trigger via Framer Motion.

**Authentication Flow:**
- `components/AuthProvider.tsx` wraps the root layout (`app/layout.tsx`).
- Firebase Auth `onAuthStateChanged` updates the context.
- Components use `useAuth` (implicit in AuthProvider logic) to react to user state.

## Data Strategy: "Lean to Relational"

We are intentionally utilizing a **"Lean BaaS"** approach using Firebase to maximize development velocity for the platform's content and UI expansion. However, we acknowledge the need for relational integrity as complexity grows.

### Current Implementation (Lean)
- **Primary DB**: Firestore (NoSQL).
- **Pattern**: Denormalization and flat collections.
- **Validation**: Client-side Zod schemas and Firestore Security Rules.

### Evolutionary Path (Relational Pivot)
We will monitor the following "Pivot Triggers" to decide when to introduce relational patterns (PostgreSQL/Prisma):
1. **Complex Joins**: If we find ourselves performing multiple manual "joins" in client-side code (e.g., fetching a Site, then its Members, then their individual Impact Stories).
2. **Data Consistency**: If critical data (like membership status or financial records) becomes difficult to keep consistent across multiple collections.
3. **Advanced Reporting**: If we need complex aggregation queries for site-wide or global impact metrics.

---

## Key Abstractions

**AuthProvider:**
- Purpose: Manages global Firebase Authentication state.
- Pattern: React Context Provider.

**SmoothScroll:**
- Purpose: Orchestrates Lenis for a unified smooth scrolling experience.
- Pattern: Wrapper component using `useEffect`.

**Base UI Primitives (`components/ui/`):**
- Purpose: Low-level UI components (Button, Badge, Card).
- Pattern: Shadcn-inspired atomic components.

## Entry Points

**Main Layout:**
- Location: `app/layout.tsx`
- Triggers: Any page load.
- Responsibilities: Wraps app in `AuthProvider`, `SmoothScroll`, and sets metadata.

**Home Page:**
- Location: `app/page.tsx`
- Triggers: Accessing root URL `/`.
- Responsibilities: Renders landing page sections (`Hero`, `Mission`, `Impact`).

## Error Handling

**Strategy:** React Error Boundaries and component-level try/catch for Firebase calls.

---

*Architecture analysis: 2026-05-09*
*Update when major patterns change*
