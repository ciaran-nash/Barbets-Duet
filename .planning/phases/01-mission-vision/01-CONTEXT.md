# Phase 1: Mission & Vision Page - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning
**Source:** User Request / PROJECT.md

<domain>
## Phase Boundary

This phase delivers a dedicated "Mission & Vision" page for the Barbets Duet platform. It marks the beginning of the "Platform Expansion" from a one-pager to a multi-page site.

</domain>

<decisions>
## Implementation Decisions

### Route
- `/about/mission-vision`

### Content
- **Mission**: Expand on the three pillars from the `Mission` component:
  1. Create Incentives for Ecosystem Protection
  2. Experiment with Sustainable Land Models
  3. Invent New Rules and Market Mechanisms
- **Vision**: Define a clear vision statement focusing on systemic ecological restoration and community empowerment.
- **Integration**: Reuse design elements from `Mission.tsx` and `About.tsx` but adapt for a full-page experience.

### Design
- "Clinical Luxury" system: minimalist, high-fidelity, mono/serif typography, subtle animations (framer-motion).
- Consistent with `app/layout.tsx` (Header/Footer).

### the agent's Discretion
- Hero section layout for the subpage.
- Narrative flow between Mission and Vision sections.
- Image selection and styling (grayscale transitions).

</decisions>

<canonical_refs>
## Canonical References

- `PROJECT.md` — Roadmap and vision.
- `components/Mission.tsx` — Current mission content.
- `components/About.tsx` — Current "About" narrative.
- `app/globals.css` — Design system tokens and rhythm.
- `app/layout.tsx` — Root layout with Header/Footer.

</canonical_refs>

<specifics>
## Specific Ideas
- Use the "Orbital Glow" pattern from `Mission.tsx`.
- Include a "Call to Action" (CTA) that links to upcoming sections.

</specifics>

<deferred>
## Deferred Ideas
- Team, History, Financials (Phases 2-3).
- Membership portal (Milestone 3).

</deferred>
