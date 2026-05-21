# Phase 1: Mission & Vision Page

## Goal
Create a dedicated Mission & Vision page at `/about/mission-vision` that embodies the "Clinical Luxury" design system, expanding on existing mission pillars.

## Wave 1: Infrastructure and Content Expansion
Create the route, basic page structure, and expand the content from existing components.

### Tasks

<task>
<title>Task 1: Create the route and page entry</title>
<objective>Initialize the `/about/mission-vision` route with a basic Next.js page structure.</objective>
<read_first>
- app/layout.tsx
- app/page.tsx
</read_first>
<action>
1. Create directory `app/about/mission-vision/`.
2. Create `app/about/mission-vision/page.tsx` with a basic functional component.
3. Add metadata to the page (Title: "Mission & Vision | Barbets Duet").
</action>
<acceptance_criteria>
- File `app/about/mission-vision/page.tsx` exists.
- Navigating to `http://localhost:3003/about/mission-vision` shows the new page.
- Metadata (title, description) is correctly set.
</acceptance_criteria>
</task>

<task>
<title>Task 2: Implement core content sections</title>
<objective>Port and expand mission/vision content into the new page structure.</objective>
<read_first>
- components/Mission.tsx
- components/About.tsx
</read_first>
<action>
1. Copy the three mission pillars from `Mission.tsx` and expand their descriptions.
2. Create a "Vision" section with a clear statement: "A global network of learning sites where people and nature thrive together through harmonized innovation."
3. Use the `BioRhyme` font class (or serif variant) for headings and `JetBrains Mono` (or mono variant) for metadata labels.
</action>
<acceptance_criteria>
- The page contains sections for Mission and Vision.
- Content from `Mission.tsx` is present and expanded.
- Typography classes match existing project patterns.
</acceptance_criteria>
</task>

## Wave 2: High-Fidelity Styling and Animations
Apply the "Clinical Luxury" aesthetic, "Orbital Glow" effects, and smooth animations.

### Tasks

<task>
<title>Task 3: Apply Clinical Luxury styling</title>
<objective>Refine the visual design to match the high-fidelity aesthetic.</objective>
<read_first>
- app/globals.css
- components/About.tsx
</read_first>
<action>
1. Implement a grid-based layout for the mission pillars similar to `About.tsx`.
2. Use the established background color and spacing tokens.
3. Add grayscale-to-color transition images for each pillar.
</action>
<acceptance_criteria>
- Grid layout is responsive and aligned with the design system.
- Images follow the grayscale-to-color pattern on hover.
- Spacing follows the `section-rhythm` convention.
</acceptance_criteria>
</task>

<task>
<title>Task 4: Implement animations and Orbital Glow</title>
<objective>Add interactive animations and the signature orbital glow effect.</objective>
<read_first>
- components/Mission.tsx
- components/Hero.tsx
</read_first>
<action>
1. Wrap page sections in `motion.div` for entrance animations (opacity, y-offset).
2. Port the `orbital-glow` div and styling from `Mission.tsx` to the new page.
3. Add a scroll-triggered reveal effect for the Vision statement.
</action>
<acceptance_criteria>
- Animations are smooth and consistent with other pages.
- `orbital-glow` is visible and positioned correctly.
- No performance regressions on the page.
</acceptance_criteria>
</task>
