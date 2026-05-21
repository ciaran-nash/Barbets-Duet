# Phase 6: Learning Sites Template

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a high-fidelity, dynamic template for individual Barbets Learning Sites based on the provided wireframe, ensuring "Clinical Luxury" design parity.

**Architecture:** Dynamic routing with shared component architecture. Data is centralized in a configuration file for easy site addition.

**Tech Stack:** Next.js (App Router), Framer Motion, Tailwind CSS, Lucide React.

---

### Task 1: Infrastructure & Data Definition

**Files:**
- Create: `lib/data/learning-sites.ts`
- Create: `types/learning-site.ts`

**Step 1: Define the TypeScript interface**
Create `types/learning-site.ts` with fields for Hero (title, location, date, partners), Challenges, Projects, Market Strategies, Impact Stats (ecological, community), and Gallery.

**Step 2: Create mock data**
Populate `lib/data/learning-sites.ts` with data for "Msichoke Seaweed Growers" to use as the primary development content.

**Step 3: Commit**
`git add types/ lib/ && git commit -m "feat: define learning site data structures"`

---

### Task 2: Dynamic Routing & Content Scaffold

**Files:**
- Create: `app/learning-sites/[slug]/page.tsx`
- Create: `app/learning-sites/[slug]/LearningSiteContent.tsx`

**Step 1: Setup dynamic route**
Implement the route in `page.tsx` with `generateStaticParams` for SEO.

**Step 2: Scaffold client component**
Create `LearningSiteContent.tsx` with all 8 sections (Hero, Challenges, Projects, Market Strategies, Impact Data, Future Goals, Gallery, Contact) mapped to the data.

**Step 3: Commit**
`git add app/learning-sites/ && git commit -m "feat: scaffold dynamic learning site route"`

---

### Task 3: Site Hero Component

**Files:**
- Create: `components/learning-sites/SiteHero.tsx`

**Step 1: Visual Hero**
Implement the Hero with large serif title, location eyebrow, and Founding Partner metadata grid.

**Step 2: Kinetic Image**
Add a wide landscape image placeholder with a `KineticReveal` transition.

**Step 3: Commit**
`git add components/learning-sites/ && git commit -m "feat: implement site hero component"`

---

### Task 4: Content Blocks (Challenges & Projects)

**Files:**
- Create: `components/learning-sites/ContentSections.tsx`

**Step 1: Editorial Sections**
Build alternating layout sections for "Challenges" and "Projects" using asymmetrical text/image blocks.

**Step 2: Motion Typography**
Apply `KineticReveal` to all section headers.

**Step 3: Commit**
`git add components/learning-sites/ && git commit -m "feat: implement challenges and projects sections"`

---

### Task 5: Impact Data Visualization

**Files:**
- Create: `components/learning-sites/ImpactData.tsx`

**Step 1: Stats Grid**
Build the high-contrast data section with specific "Ecological" and "Community" growth percentages.

**Step 2: Animated Counters**
Use `framer-motion` to animate the percentage values on scroll.

**Step 3: Commit**
`git add components/learning-sites/ && git commit -m "feat: implement impact data visualization"`

---

### Task 6: Gallery & Future Goals

**Files:**
- Create: `components/learning-sites/SiteGallery.tsx`
- Create: `components/learning-sites/FutureGoals.tsx`

**Step 1: Asymmetrical Gallery**
Implement a grid-based image gallery with hover effects.

**Step 2: Italic Narrative**
Create the "Future Goals" section with stylized italic serif typography.

**Step 3: Commit**
`git add components/learning-sites/ && git commit -m "feat: implement site gallery and goals"`

---

### Task 7: Site Navigation & Homepage Sync

**Files:**
- Modify: `components/LearningSites.tsx`
- Modify: `components/Header.tsx`

**Step 1: Link Homepage Cards**
Update the homepage Learning Sites carousel to link to the new dynamic `/learning-sites/[slug]` routes.

**Step 2: Verification**
Test navigation flow, hydration stability, and scroll-to-top behavior.

**Step 3: Commit**
`git commit -m "feat: finalize learning sites template and navigation integration"`
