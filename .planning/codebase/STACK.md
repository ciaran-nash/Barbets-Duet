# Technology Stack

**Analysis Date:** 2026-05-09

## Languages

**Primary:**
- TypeScript 5.9.3 - All application code and type definitions

**Secondary:**
- JavaScript (ESM) - Build configuration (`next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`)

## Runtime

**Environment:**
- Node.js 20.x+ - Required for Next.js 15+ features

**Package Manager:**
- npm - Managed via `package-lock.json`

## Frameworks

**Core:**
- Next.js 15.4.9 - Full-stack React framework with App Router
- React 19.2.1 - UI library

**Styling:**
- Tailwind CSS 4.1.11 - Utility-first styling with PostCSS
- Framer Motion 12.38.0 - Animation and interactive components

**UI Foundations:**
- Radix UI - Primitive components (Slot, Tabs)
- Lucide React - Iconography

## Key Dependencies

**Critical:**
- `firebase` 12.12.1 - Core integration for Firestore, Authentication, and Hosting
- `@google/genai` 1.17.0 - Integration with Gemini/Google AI models
- `three` 0.184.0 & `react-globe.gl` 2.37.1 - 3D visualizations and interactive globe

**Infrastructure:**
- `@studio-freight/lenis` - Smooth scrolling implementation
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utility pattern

## Configuration

**Environment:**
- Configuration via environment variables (likely `NEXT_PUBLIC_FIREBASE_*`)
- `firebase-applet-config.json` - Local Firebase configuration

**Build:**
- `next.config.ts` - Next.js compiler and plugin settings
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.mjs` - CSS transformation pipeline

## Platform Requirements

**Development:**
- any platform with Node.js 20+
- `firebase-tools` required for CLI interactions

**Production:**
- Optimized for deployment to Firebase Hosting or Vercel (Standard for Next.js)

---

*Stack analysis: 2026-05-09*
*Update after major dependency changes*
