# Coding Conventions

## Language & Framework
- **TypeScript**: Mandatory for all new files. Strict type checking is preferred.
- **Next.js 15 (App Router)**: Follow the App Router patterns for routing, layouts, and server components.
- **React 19**: Utilize modern React features, avoiding deprecated APIs.

## Styling
- **Tailwind CSS 4**: Primary styling methodology.
- **Utility-First**: Use inline utility classes for most styling.
- **Design Tokens**: Follow the established color palette (e.g., `#F4F4F0` background, `#C7F16C` selection color).
- **Responsive Design**: Mobile-first approach using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.).

## Components
- **Functional Components**: All components should be functional and use hooks for state and effects.
- **Modularization**: Keep components small and focused. UI primitives are located in `components/ui/`, while larger sections are in the root of `components/` or `components/blocks/`.
- **Animations**: Use `framer-motion` for consistent and smooth animations.

## State Management
- **React Hooks**: Use `useState`, `useReducer`, and `useContext` for local and shared state.
- **Global Auth State**: Provided via `AuthProvider` in `components/AuthProvider.tsx`.

## Data Fetching & Persistence
- **Firebase SDK**: All data interactions must go through the centralized `lib/firebase.ts`.
- **Error Handling**: Use `handleFirestoreError` for consistent error reporting and logging.
- **Server Components**: Prefer server-side data fetching for initial page loads where possible.

## Project Structure
- **Path Aliases**: Use `@/` to reference the `root` directory (mapped in `tsconfig.json`).
- **File Naming**: 
  - Components: PascalCase (`Hero.tsx`)
  - Hooks: camelCase starting with `use` (`use-auth.ts`)
  - Utils/Lib: kebab-case or camelCase (`firebase.ts`)
