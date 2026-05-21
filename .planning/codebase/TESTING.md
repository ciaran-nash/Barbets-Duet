# Testing Strategy

## Current State
- **Automated Tests**: None currently present in the codebase.
- **Manual Verification**: Primary method of testing, focused on UI/UX and Firebase connectivity.
- **Linting**: ESLint is configured to maintain code quality and catch common errors.

## Recommended Strategy

### Unit Testing
- **Tool**: Vitest (highly recommended for Next.js and React 19 compatibility).
- **Scope**: Focus on complex logic in `lib/` and shared hooks in `hooks/`.

### Component Testing
- **Tool**: React Testing Library with Vitest.
- **Scope**: Test critical UI components for accessibility and interactive states.

### End-to-End (E2E) Testing
- **Tool**: Playwright.
- **Scope**: Full user flows, including:
  - Authentication (Login/Logout).
  - Data submission to Firestore.
  - Interactive 3D visualization (Globe).

### Continuous Integration (CI)
- **Goal**: Run linting and automated tests on every pull request.
- **Tool**: GitHub Actions.

## Verification Checklist for Developers
- [ ] Run `npm run lint` before committing.
- [ ] Verify responsive behavior on mobile and desktop.
- [ ] Test Firebase operations (Create/Update/Delete) in the development environment.
- [ ] Ensure animations are smooth and do not cause performance regressions.
