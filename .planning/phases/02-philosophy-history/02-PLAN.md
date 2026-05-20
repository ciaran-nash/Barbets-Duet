# Phase 2: Barbet's Philosophy & History

## Goal
Implement a high-fidelity "About" section focusing on the organization's history and philosophy, aligned with the provided wireframe and "Clinical Luxury" design system.

## Wave 1: Narrative & Year Grid (History)
Focus on the origins, the SID scenario background, and the chronological evolution.

### Tasks

<task>
<title>Task 1: Scaffold /about/philosophy-history route</title>
<objective>Setup the route and primary layout structure following the Phase 1 pattern.</objective>
<read_first>
- app/about/mission-vision/page.tsx
- components/Header.tsx
</read_first>
<action>
1. Create `app/about/philosophy-history/page.tsx` with SEO metadata.
2. Create `app/about/philosophy-history/PhilosophyHistoryContent.tsx` (Client Component).
3. Import `Header`, `CTA`, and `StickyFooter`.
</action>
<acceptance_criteria>
- `/about/philosophy-history` route is accessible.
- Navigation links correctly between About pages.
</acceptance_criteria>
</task>

<task>
<title>Task 2: Implement the "Origins & Concept" Year Grid</title>
<objective>Create the historical milestone section as seen in the wireframe.</objective>
<read_first>
- .planning/phases/02-philosophy-history/01-CONTEXT.md
</read_first>
<action>
1. Build a two-column section: Left for narrative text (SID scenarios 1998-2008), Right for a square imagery placeholder.
2. Below the text, implement a 2x2 grid of years:
   - **1998**: SID Scenarios (The spark).
   - **2006**: Concept Note (The blueprint).
   - **2009**: Invention Convention (The initiation).
   - **2014**: Lukenya Convention (The Jumuiya / Constellation).
3. Use `JetBrains Mono` for years and `BioRhyme` for labels.
</action>
<acceptance_criteria>
- Year grid matches wireframe layout.
- Content accurately reflects the SID origins.
</acceptance_criteria>
</task>

## Wave 2: Philosophical Pillars & Methodology
Focus on the "System for Restoration" and the "Trial & Error" culture.

### Tasks

<task>
<title>Task 3: Implement the "System for Restoration" Pillar Grid</title>
<objective>Create the 3-column philosophical framework section.</objective>
<read_first>
- .planning/phases/02-philosophy-history/01-CONTEXT.md
</read_first>
<action>
1. Design a 3-column grid for the core pillars:
   - **Mosaic Rights**: Footpaths vs. Fences (Biodiversity focus).
   - **The Unsynchronised Duet**: Cross-cultural collaboration metaphor.
   - **Oak Tree Paradox**: Market mechanisms for life abundance.
2. Use clinical iconography and mono-labeled headers.
</action>
<acceptance_criteria>
- Pillars are clearly articulated with "Clinical Luxury" styling.
- Layout remains responsive on mobile.
</acceptance_criteria>
</task>

<task>
<title>Task 4: Add the "Living Archive" (Trial & Error) Section</title>
<objective>Integrate the methodology and radical honesty prompts.</objective>
<read_first>
- .planning/phases/02-philosophy-history/01-CONTEXT.md
</read_first>
<action>
1. Create a full-width or inset section titled "A Culture of Trial & Error".
2. Feature the three core prompts in a stylized quote format:
   - "What have you tried and how did it turn out?"
   - "What was your biggest mistake?"
   - "What did you learn and what made you laugh?"
3. Add a "Living Archive" label to emphasize the non-corporate narrative.
</action>
<acceptance_criteria>
- The section feels personal and human vs. the clinical grid.
- Prompts are visually distinct and engaging.
</acceptance_criteria>
</task>

<task>
<title>Task 5: Final Polish & "Orbital Glow" Integration</title>
<objective>Add animations and signature visual effects.</objective>
<read_first>
- app/about/mission-vision/MissionVisionContent.tsx (Animation reference)
</read_first>
<action>
1. Apply `framer-motion` staggered reveals to the Year Grid and Pillars.
2. Add "Orbital Glow" background effects to transition between sections.
3. Update `components/Header.tsx` to include the final link.
</action>
<acceptance_criteria>
- Page transitions are smooth.
- High-fidelity visual parity with Mission & Vision page.
</acceptance_criteria>
</task>
