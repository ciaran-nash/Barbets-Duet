# External Integrations

**Analysis Date:** 2026-05-09

## APIs & External Services

**Generative AI:**
- Google Gemini - Used for AI features and content generation
  - SDK/Client: `@google/genai` v1.17.0
  - Auth: `GEMINI_API_KEY` environment variable
  - Note: AI Studio automatically injects this in production

**Data Visualization:**
- WebGL/Globe - Interactive 3D globe visualization
  - SDK/Client: `three` v0.184.0, `react-globe.gl` v2.37.1
  - Integration: Client-side rendering in React components

## Data Storage

**Databases:**
- Firebase Firestore - Primary data store
  - Project ID: `gen-lang-client-0559046136`
  - Database ID: `ai-studio-0efb4227-89da-470b-a463-d255f25ccbb1`
  - SDK/Client: `firebase` v12.12.1
  - Rules: Defined in `firestore.rules`

**File Storage:**
- Firebase Storage - Likely for user uploads/assets
  - Bucket: `gen-lang-client-0559046136.firebasestorage.app`
  - SDK/Client: `firebase` v12.12.1

## Authentication & Identity

**Auth Provider:**
- Firebase Authentication - User management
  - Implementation: Firebase JS SDK
  - Domain: `gen-lang-client-0559046136.firebaseapp.com`

## CI/CD & Deployment

**Hosting:**
- Firebase Hosting - Platform for static and dynamic Next.js hosting
  - Deployment: via `firebase-tools` CLI
  - Configuration: `firebase-applet-config.json`

## Environment Configuration

**Development:**
- Required env vars: `GEMINI_API_KEY`, `APP_URL`
- Secrets location: `.env.local` (gitignored)

**Production:**
- Secrets management: AI Studio Secrets panel / Cloud Run environment variables
- Hosting: Managed Firebase environment

---

*Integration audit: 2026-05-09*
*Update when adding/removing external services*
