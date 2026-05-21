# Technical Concerns & Debt

## High Priority
- **Lack of Automated Testing**: No unit or E2E tests exist, increasing the risk of regressions during refactoring or new feature development.
- **Firebase Configuration**: `experimentalForceLongPolling: true` is enabled in `lib/firebase.ts`. While it may be necessary for some environments, it suggests potential connectivity or performance issues that should be monitored.
- **Next.js/React Versions**: The project is using cutting-edge versions (Next.js 15, React 19). While powerful, some ecosystem libraries may still have compatibility issues.

## Medium Priority
- **Large Component Files**: Some components like `Header.tsx` (19KB+) and `FAQSection.tsx` (13KB+) are quite large and may benefit from further decomposition to improve maintainability.
- **NoSQL vs Relational Complexity**: As we add more interconnected data (Members, Sites, Impact), Firestore's flat structure may lead to data duplication or complex client-side joins. This is a strategic trade-off for development speed.
- **Hardcoded Strings**: Many UI strings are hardcoded in components. Consider moving to a translation/i18n system or a centralized content configuration if the project scales.
- **Asset Management**: Reliance on external assets or local assets without a clear optimization strategy (e.g., image compression).

## Low Priority
- **Technical Debt**: `firebase-blueprint.json` and `firebase-applet-config.json` are in the root. While functional, ensure sensitive credentials are never accidentally committed to version control.
- **Unimplemented Pages**: A significant list of requested pages (e.g., Careers, Partner Network, Innovation Hub) are still in the planning phase.

## Risks
- **Firestore Scalability**: Depending on the volume of "Learning Sites," Firestore query performance and cost should be considered.
- **3D Performance**: The Globe visualization (`react-globe.gl`) is resource-intensive and may cause performance issues on lower-end devices.
