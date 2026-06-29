---
name: Barbets Duet
description: A global ecological restoration collective working through agroforestry, reforestation, and community-led conservation.
colors:
  bark: "#2A1F14"
  moss: "#556B4E"
  linen: "#F4EFE6"
  cream: "#EDE8D8"
  soil: "#6B4C35"
  stone: "#8A8578"
  wheat: "#C9A87A"
  lichen: "#8B9E7A"
  clay: "#B07055"
  river: "#6B8E9A"
typography:
  display:
    fontFamily: "BioRhyme, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 200
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "BioRhyme, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "BioRhyme, Georgia, serif"
    fontSize: "clamp(1.25rem, 3vw, 2.25rem)"
    fontWeight: 300
    lineHeight: 1.2
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    letterSpacing: "0.15em"
rounded:
  sm: "0.5rem"
  lg: "2rem"
  pill: "9999px"
spacing:
  section: "6rem"
  card: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.wheat}"
    textColor: "{colors.bark}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.bark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.wheat}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  badge:
    backgroundColor: "{colors.lichen}"
    textColor: "{colors.bark}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.bark}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
---

# Design System: Barbets Duet

## 1. Overview

**Creative North Star: "The Field Journal"**

Barbets Duet is a global ecological restoration collective. Its interface is a field journal — not a dashboard, not a landing page, not a SaaS product. It carries the precision of scientific observation, the unhurried pace of someone who understands that a forest takes decades to return, and the earthy material weight of handmade things. Every screen is a document that lives in the world, not a UI layer that floats above it.

The system operates in two modes, each a different personality for the same collective. **Light mode** (the default) is linen in morning sun: field notes spread on a wooden table, ink-on-paper clarity, moss and soil for emphasis — Cultivated Simplicity, handmade and unhurried. It is for reading. **Dark mode** is the older "Scholarly Cycle" palette: a deep Night Forest canvas with electric Neon Lime catching the light, like bioluminescence after dark. It is for dwelling. Wabi Sabi by day, bioluminescent by night. The mode is chosen by toggle or system preference; light is the default.

The palette is called **Cultivated Simplicity**: ten earth tones, all sun-faded, none saturated past the point of nature. The typography pairs BioRhyme (a slab-serif with weight variation that reads like a typeface drawn by hand) with DM Sans (a humanist sans that belongs on the page next to it). JetBrains Mono serves metadata only — coordinates, timestamps, site codes. Motion is orchestrated and intentional, driven by `motion/react` with exponential easing curves; nothing bounces.

**This system explicitly rejects:** SaaS-cream backgrounds used as default warmth; glassmorphism as decoration; numbered section eyebrows as scaffolding; identical card grids; gradient text; any aesthetic that could be mistaken for an AI workflow tool, a fintech product, or a startup landing page. (Note: Neon Lime is permitted, but *only* as the dark-mode accent — see The Mode Rule. It is never used in light mode.) The measure of success is a user who cannot easily guess what genre of software built this.

**Key Characteristics:**
- Light mode default; dark mode an equal peer selected by toggle or system preference
- Ten-color palette, used at different weights across contexts
- BioRhyme at font-weight 200–300 only — never bold headings
- 700ms easing on interactive elements; never linear
- Tonal surface layering over box-shadow elevation
- Double-Bezel card architecture as the signature component
- Floating island navigation — never a full-width header bar
- Noise overlay at 4% opacity for analogue grain
- Density 4 (generous whitespace); Variance 8 (offset, asymmetric grids); Motion 6 (choreographed)

### Design Influences

Three overlapping aesthetic philosophies shape the system. Each contributes something distinct; the intersection is where the voice lives.

**Wabi Sabi**
Retain: acceptance of irregularity and imperfection; visible natural textures; asymmetrical compositions; appreciation of aging and weathering; generous whitespace.
Avoid: excessive austerity; dark Zen minimalism; overt Japanese symbolism.
Applied as: uneven image crops; organic card shapes; grain textures; real ecological photography over staged imagery; hand-drawn divider references in illustration.

**Japandi**
Retain: functional minimalism; careful spacing; restrained colour use; soft geometry; clear information hierarchy.
Avoid: sterile technology aesthetics; corporate minimalism; excessive monochrome.
Applied as: modular layouts; legible navigation; restrained iconography; generous margins; calm, sequential user flows.

**Cottagecore / Farmhouse**
Retain: celebration of local landscapes; handmade craft references; seasonal imagery; botanical motifs; warmth and hospitality.
Avoid: decorative clutter; Victorian nostalgia; kitsch rural imagery; theme-park pastoral.
Applied as: native plant illustrations; field notebook aesthetics; paper textures; editorial storytelling layouts; community photography.

**Motion character.** Animation should resemble natural processes — leaves settling in wind, sunlight shifting through cloud cover, water smoothing over stone, a page turning in a breeze. Slow transitions, exponential ease-out curves, subtle fades. Nothing bounces. Nothing flashes. Nothing accelerates.

**Voice.** Write as knowledgeable but not academic; welcoming but not sentimental; hopeful but not utopian; practical but not corporate. Preferred language: stewardship, habitat, cultivation, reciprocity, resilience, regeneration. Avoid: disruption, optimisation, scalability as a value, growth for its own sake.

---

## 2. Colors

The system carries **two palettes**, one per mode. **Light mode** uses Cultivated Simplicity — ten sun-faded earth tones. **Dark mode** uses the Scholarly Cycle — a deep Night Forest canvas with electric accents. They never mix (see The Mode Rule).

## Light Mode: The Cultivated Simplicity Palette

Ten colours, all drawn from the living world — the bark of a planted tree, the linen of a worn field notebook, the moss on a stone wall after rain. No colour is at full saturation. Every one is slightly faded, as though it has been outside for a season.

### Primary

- **Bark** (`#2A1F14`): The dark core. Warm near-black — not neutral, not cool, not pure black. Primary text colour on all light surfaces. The ink of the field journal.
- **Linen** (`#F4EFE6`): The page. Warm off-white background in light mode. Carries almost no chroma — it reads as paper, not cream.

### Secondary

- **Soil** (`#6B4C35`): Deep earth brown. The primary interactive accent in light mode — CTAs, primary buttons, links. Used sparingly (≤10% of any screen surface).
- **Moss** (`#556B4E`): Muted sun-faded green. The brand colour — used in the logo, focus rings (light mode), ecological tags, section dividers. Neither bright nor dull: it is the colour of old growth.
- **Wheat** (`#C9A87A`): Faded straw in late summer. Warm gold accent for highlights and hover transitions in light mode. Reads as handwriting in candle-light.

### Tertiary (Seasonal Accents)

Used one at a time, never in combination. These are situational — ecological data, seasonal content, tags.

- **Lichen** (`#8B9E7A`): Lichen sage. Tags, badges, ecological classification markers.
- **Clay** (`#B07055`): Clay terracotta. Seasonal accent, warm section backgrounds, event markers.
- **River** (`#6B8E9A`): River blue. Maps, ecological data visualisation, hydrological elements.

### Neutral

- **Stone** (`#8A8578`): Warm gray with a trace of bark. Structural neutrality — dividers, secondary borders, disabled states. Too warm to be a system gray; too muted to be a colour.
- **Cream** (`#EDE8D8`): Wildflower cream. Elevated surface / card layer in light mode. Slightly richer than linen — the difference between a fresh page and a well-used one.

## Dark Mode: The Scholarly Cycle Palette

Four colours. Where light mode is handmade and warm, dark mode is electric and ecological — bioluminescence after dark. This palette is reserved entirely for dark mode.

- **Night Forest** (`#06211A`): Very dark green. The dark-mode page background — deep canopy at night, never pure black.
- **Platinum** (`#F4F4F5`): Cool off-white. Primary foreground / text on Night Forest.
- **Neon Lime** (`#DBFF66`): Electric lime. The single interactive accent in dark mode — CTAs, active states, focus rings. Used on ≤10% of any screen; its electricity is the point.
- **Viridian** (`#006F53`): Deep ecological green. The dark-mode brand colour and structural secondary.

### Named Rules

**The Mode Rule.** Night Forest, Neon Lime, Viridian, and Platinum belong to **dark mode only**. The Cultivated Simplicity palette belongs to **light mode only**. The two palettes never appear together. A bark surface on a Night Forest page, or Neon Lime on linen, is a defect — the modes are separate personalities, not a shared set of swatches.

**The Single Flash Rule.** The primary accent — Soil (light) or Neon Lime (dark) — is used on ≤10% of any given screen. Its rarity is structural — overuse collapses the hierarchy.

**The Seasonal Rule.** Lichen, Clay, and River are light-mode seasonal accents. Use one per screen context, never in combination. If a screen uses River for a map, it does not also use Clay for a tag.

**The No-Pure-Black Rule.** Pure `#000000` is prohibited everywhere. Use Bark (light) or Night Forest (dark). This is not an aesthetic preference — it prevents the interface from appearing untethered from its material reference.

---

## 3. Typography

**Display / Headline Font:** BioRhyme (loaded via `next/font/google`; Georgia, serif as browser-only fallbacks)
**Body / UI Font:** DM Sans (loaded via `next/font/google`; sans-serif as fallback)
**Label / Data Font:** JetBrains Mono (loaded via `next/font/google`; monospace as fallback)

**Character:** BioRhyme at light weight is a slab-serif that reads as though it was set by hand — authoritative without rigidity. Paired with DM Sans's humanist stroke modulation, the combination reads like a well-designed scientific periodical: expressive at the display scale, precise at body. JetBrains Mono is the instrument reading; it appears only where data precision is the point.

### Hierarchy

- **Display** (weight 200, `clamp(3rem, 8vw, 6rem)`, line-height 0.95, tracking −0.03em): Hero sections, page-level statements, single-phrase impact lines. Never more than 6rem. Never bold.
- **Headline** (weight 300, `clamp(2rem, 5vw, 4rem)`, line-height 1.05, tracking −0.02em): Section headings, major content blocks. Use `text-wrap: balance` to prevent orphans.
- **Title** (weight 300, `clamp(1.25rem, 3vw, 2.25rem)`, line-height 1.2): Card headings, sub-section labels, named items.
- **Body Large** (DM Sans 400, 1.125rem, line-height 1.7): Intro paragraphs, pull quotes (prose form). Max line length: 65ch.
- **Body** (DM Sans 400, 1rem, line-height 1.7): General body copy. Max line length: 75ch. Use `text-wrap: pretty` to reduce orphaned words.
- **Body Small** (DM Sans 400, 0.875rem, line-height 1.6): Captions, secondary metadata, helper text.
- **Label / Eyebrow** (JetBrains Mono 500, 0.625rem, letter-spacing 0.15em, UPPERCASE): Section identifiers used deliberately — only where the metadata IS the content (a site code, a datum, a timestamp). Not as decorative scaffolding above every heading.
- **Micro** (JetBrains Mono 500, 0.625rem, letter-spacing 0.15em, UPPERCASE): Status chips, data badges, coordinate labels.
- **Annotation / Handwriting** `[PENDING: font TBD — Caveat recommended when first use appears]`: Occasional handwritten notes for map labels, seasonal annotations, species names, educational callouts. Use very sparingly — one or two instances per page at most. Characteristics: casual, slightly irregular, field-notebook feel. Never used for UI chrome or navigation.

### Named Rules

**The BioRhyme Rule.** BioRhyme is the display and headline font, always. Georgia and `serif` appear in the font stack as browser fallbacks only — they are never styled independently, never used intentionally, and their appearance in a rendered UI is a technical failure, not a design choice.

**The Weight Rule.** BioRhyme headings use weight 200 (display) or 300 (headline / title). Never `font-bold`, never `font-semibold`. The weight is deliberate: heaviness belongs to the world outside, not to the type on the page.

**The Case Rule.** Sentence case on all headings, always. Title Case On Section Headings is prohibited. The JetBrains Mono label/eyebrow role is the only UPPERCASE exception, and only when the label is ≤3 words.

---

## 4. Elevation

Barbets Duet uses **tonal surface layering**, not box-shadow elevation. Depth is expressed by darkening or lightening the surface — bark to cream to linen — not by lifting elements out of the plane.

The one exception is `.shadow-paper`: `box-shadow: 0 2px 8px rgba(42, 31, 20, 0.08), 0 1px 2px rgba(42, 31, 20, 0.06)`. This is a warm, bark-tinted diffuse shadow used only for interactive elevation — a hovered card, a focused input, a floating navigation pill. It reads as paper weight, not material elevation.

### Surface Stack (dark mode, light to heavy)

- **Base** (`--background`, Bark `#2A1F14`): The page canvas. The ground.
- **Surface** (`--surface`, cream at 4% opacity): Barely-visible wash. Background tinting behind grouped content.
- **Card Outer** (`bg-white/5 ring-1 ring-white/10`): The Double-Bezel outer shell — a thin translucent ring holding space around the card interior.
- **Card Inner** (`--card`, Bark `#2A1F14` + inset highlight): The readable surface. Content lives here. The inset `box-shadow: inset 0 1px 1px rgba(255,255,255,0.08)` creates a subtle top-edge catch-light.
- **Elevated / Interactive** (`.shadow-paper`): A hovered card or focused element lifts out of the stack with a warm bark shadow.

### Surface Stack (light mode)

- **Base** (`--background`, Linen `#F4EFE6`): The page. The paper.
- **Surface** (`--surface`, bark at 4% opacity): Subtle warm tinting behind grouped sections.
- **Card** (`--card`, Cream `#EDE8D8`): The readable elevated surface. Richer than linen — a used page rather than a fresh one.
- **Secondary** (`--secondary`, `#D8D0BB`): A deeper warm neutral for secondary button surfaces and tier-two information containers.
- **Elevated / Interactive** (`.shadow-paper`): Same warm bark diffuse shadow as dark mode.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. `.shadow-paper` appears only as a state response — hover, focus, or floating (navigation). A design that adds shadow to static content has confused weight with importance.

**The No-Glow Rule.** Coloured outer glows (`box-shadow: 0 0 Xpx #C9A87A`) are prohibited. Wheat and Moss do not glow; they illuminate. Tinted diffuse shadows only.

---

## 5. Components

### Buttons

Tactile and committed — they feel like pressing something real, not clicking a surface.

- **Shape:** Fully pill (`border-radius: 9999px`). No square or rounded-lg buttons in this system.
- **Primary (dark mode):** Wheat background (`#C9A87A`), Bark text (`#2A1F14`). Padding `12px 24px`. On hover: shifts toward Cream (`#EDE8D8`), same text.
- **Primary (light mode):** Soil background (`#6B4C35`), Linen text (`#F4EFE6`). On hover: darkens toward Bark.
- **Ghost:** Transparent background, Wheat text (dark) / Bark text (light), `border: 1px solid currentColor` at 25% opacity. Hover: fills subtly with muted surface wash.
- **Transition:** `transition: all 700ms cubic-bezier(0.32, 0.72, 0, 1)` — slow entry, very fast exit. `active:scale-[0.98]` on press.
- **Focus:** `outline: 2px solid` Wheat (dark) / Moss (light), `outline-offset: 3px`. Never remove focus outlines.

### Cards: The Double-Bezel Architecture

The signature structural component. Two concentric rounded rectangles — an outer shell and an inner surface — creating a bezel effect that reads as physical depth without shadows.

- **Outer Shell:** `border-radius: 2rem`, `ring-1 ring-white/10`, `bg-white/5`, `padding: 0.375rem`. This is the frame.
- **Inner Surface (`CardInner`):** `border-radius: calc(2rem - 0.375rem)`, `background: var(--card)`, `box-shadow: inset 0 1px 1px rgba(255,255,255,0.08)`. Content lives here.
- **Dark mode:** The outer ring is a ghost of linen; the inner surface is Bark. Content floats above the page in a warm depression.
- **Light mode:** The outer ring uses `ring-bark/10`; the inner surface is Cream on a Linen page. Content sits on a slightly richer paper.
- **Never:** Nested Double-Bezel cards. Cards inside cards is always wrong.

### Navigation: The Floating Island

- **Structure:** `position: fixed`, `top: 1.5rem`, centred. A pill-shaped nav island that floats over page content.
- **Background:** `backdrop-blur-xl` with `bg-bark/90` (dark) or `bg-linen/80` (light). It belongs to the surface below it, not to the sky above.
- **Border:** `ring-1 ring-linen/10` (dark) / `ring-1 ring-bark/10` (light).
- **Active state:** Structural underline indicator (`height: 2px`, colour matched to primary text). Never colour-only active state.
- **Mobile:** Collapses to a sheet (`Sheet` component) opened by a menu trigger. Never a hamburger emoji.

### Badges / Chips

- **Shape:** Rounded-full pill.
- **Default:** Lichen sage (`#8B9E7A`) background, Bark text. Reads as an ecological tag.
- **Variants:** Soil (primary action chips), Stone (neutral/disabled), Clay (seasonal/event).
- **Size:** Compact — `padding: 4px 12px`, `font-size: 0.625rem`, JetBrains Mono, UPPERCASE, `letter-spacing: 0.1em`.

### Inputs / Fields

- **Label:** Above the field, always. Never floating labels.
- **Background:** `var(--input)` — platinum at 12% on Night Forest (dark) / bark at 10% on linen (light). Subtle wash, not a white box.
- **Border:** `1px solid var(--border)` at rest. On focus: shifts to `var(--ring)` — Neon Lime (dark) / Moss (light).
- **Focus ring:** `ring-2 ring-offset-1 ring-[var(--ring)]`. Always visible.
- **Error:** Text below field, inline. Destructive red (`#ef4444`). Structural position only — never colour-only error signalling.
- **Radius:** `0.5rem` (rounded-sm). Not pill, not sharp.

### Eyebrow / Section Labels

Used one way: `JetBrains Mono`, `10px`, `UPPERCASE`, `letter-spacing: 0.15em`, inside a `rounded-full` pill tag. Appears before a heading only when the label IS data — a site name, a datum, a location code. An eyebrow above every section heading as structural scaffolding is prohibited.

### Illustrations

When illustrations appear, they should resemble: field guide sketches, herbarium specimen drawings, ecological diagrams, hand-inked maps, botanical marginalia. Characteristics: fine ink lines (1–1.5px stroke), restrained colour fills (one or two palette tones at low opacity), scientific clarity, slight intentional irregularity. Not decorative infographics; not icon sets; not flat cartoon style. Illustrations earn their place by conveying ecological information — species identification, site geography, restoration diagrams — not by adding visual warmth.

---

## 6. Do's and Don'ts

### Do:

- **Do** use Bark (`#2A1F14`) everywhere pure black would go. Including `fill`, `stroke`, `color`, `background-color`.
- **Do** use BioRhyme at weight 200–300 for all display and headline text. Georgia and serif are in the stack for browser safety only.
- **Do** use sentence case on all headings, labels, and navigation items. UPPERCASE is for JetBrains Mono metadata labels only.
- **Do** use `transition: all 700ms cubic-bezier(0.32, 0.72, 0, 1)` on interactive elements. This easing curve is part of the brand voice. 300ms linear is not.
- **Do** wrap display headings in `text-wrap: balance` and body paragraphs in `text-wrap: pretty`.
- **Do** cap body copy at `max-w-[65ch]` to `max-w-[75ch]`. Measure is part of legibility.
- **Do** use the Double-Bezel card (outer shell + CardInner) for elevated content surfaces.
- **Do** keep the floating island nav pill — `fixed top-6`, backdrop-blur, ring border. Never replace it with a full-width header bar.
- **Do** honour `prefers-reduced-motion: reduce` — all animation-duration and transition-duration set to 0.01ms in the media query.
- **Do** use `icon strokeWidth={1.5}` on all Lucide icons, consistently.
- **Do** test every heading at every breakpoint for overflow. A heading word that wraps past its container is a shipped bug.

### Don't:

- **Don't** use pure `#000000` anywhere — not in fills, not in text, not in shadows. Use Bark.
- **Don't** use `text-white` or `bg-white` or `text-black` — use brand token equivalents (`text-linen`, `bg-bark`).
- **Don't** use Tailwind `gray-*` classes — use Bark/Stone/Linen opacity variants instead (`text-bark/70`, `text-linen/50`).
- **Don't** add coloured box-shadow glows (`box-shadow: 0 0 20px #C9A87A`). Tinted diffuse warm shadows only. `.shadow-paper` is the system shadow.
- **Don't** use gradient text (`background-clip: text` with a gradient). Wheat and Soil are solid. Emphasis through weight or size.
- **Don't** use glassmorphism decoratively. Backdrop-blur is used on the floating nav only, for functional surface grounding — not on cards, modals, or content sections.
- **Don't** place an eyebrow label above every section heading. JetBrains Mono eyebrows are for data labels, not structural scaffolding.
- **Don't** use numbered section markers (`01 / 02 / 03`) as decorative scaffolding. Numbers earn their place only when the section is a real sequence where order carries meaning.
- **Don't** use `border-left` greater than `1px` as a coloured accent stripe on cards, callouts, or list items. Rewrite with full borders, background tints, or nothing.
- **Don't** use the three-equal-columns feature card grid. Use offset grids, asymmetric `3fr 2fr` columns, or bento structures.
- **Don't** use `h-screen` — use `min-h-[100dvh]` to survive iOS Safari's viewport jump.
- **Don't** mix the two palettes. Neon Lime, Night Forest, Viridian, and Platinum are dark-mode only; Cultivated Simplicity is light-mode only. See **The Mode Rule** in Colors. Neon Lime on a linen page, or Bark on a Night Forest page, is a defect.
- **Don't** add off-brand hex values to `globals.css` or Tailwind theme config. The ten Cultivated Simplicity tokens plus the four Scholarly Cycle dark-mode tokens are the complete set.
- **Don't** use `Inter` anywhere in the font stack.
- **Don't** animate `top`, `left`, `width`, or `height`. Animate only `transform` and `opacity`.
- **Don't** use AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Revolutionise".
- **Don't** use exclamation marks in success messages.
- **Don't** use `href="#"` — all links point to real routes.
- **Don't** write copy using: disruption, optimise, scale, game-changer, unleash, seamless, next-gen. Use: stewardship, habitat, cultivation, reciprocity, resilience, regeneration.
- **Don't** use stock photography — staged smiles, drone hero shots as dominant perspective, heavily edited colours. Use real ecological work, candid community moments, natural light, cloudy skies, soft contrast, imperfect framing.
- **Don't** use illustration styles that read as: flat cartoon, decorative icon set, tech infographic. Field guide and herbarium styles only.

**The One-Sentence Test.** If a design decision feels as though it belongs equally in a botanical field journal, a Scandinavian community workshop, and a restored farmhouse kitchen, it belongs in the brand. If it feels like a technology startup, a luxury lifestyle magazine, or a nostalgic theme-park version of rural life, it does not.

---

*Design system: Cultivated Simplicity — Barbets Duet*
*North Star: "The Field Journal"*
*Last updated: 2026-06-28*
*Generated from live codebase — `app/globals.css`, `components/ui/`, `app/layout.tsx`*
