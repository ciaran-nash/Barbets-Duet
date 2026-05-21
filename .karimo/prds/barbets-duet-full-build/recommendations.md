# Pre-Execution Review: barbets-duet-full-build

**Reviewed:** 2026-05-20
**Briefs reviewed:** T01–T28
**Codebase state:** verified against actual files

---

## Critical (must fix before execution)

### C1 — T02: `lat`/`lng` fields NOT in `LearningSite` type; brief assumes they may or may not be there but is ambiguous about the prior-session state

**Affected:** `briefs/T02_barbets-duet-full-build.md`, `types/learning-site.ts`

**Actual state:** `types/learning-site.ts` has no `lat` or `lng` fields. The data file (`lib/data/learning-sites.ts`, 112 lines, 2 entries) also has no coordinate data in either existing entry.

**Problem:** The T02 brief says "The LearningSite type may not yet have lat/lng fields — if not, add them as optional fields to types/learning-site.ts as part of this task." This is correct as a contingency, but the example code pattern in the implementation guidance already shows `lat: -6.44, lng: 38.90` inside the site object — suggesting to the executor that the fields already exist. They do not. The executor must add them to the type first before populating data. This must be explicit.

**Additionally:** The brief says T02 depends on T01, but lat/lng are a type change that purely affects the data layer — no brand token work is required before seeding coordinates. The dependency on T01 is logical for colour/font work that happens in the same wave, but T02 should be clear that the lat/lng type addition is its own responsibility and does not wait for T01.

**Correction needed:** Make the requirement unambiguous: "Step 0 before writing any site data: add `lat?: number` and `lng?: number` to `types/learning-site.ts`." Remove the conditional "may not yet have" hedge.

---

### C2 — T14 dependency on T16 and T17 is inverted and will block execution

**Affected:** `tasks.yaml` line 298, `execution_plan.yaml` line 63, `briefs/T14_barbets-duet-full-build.md`

**Actual state:** `tasks.yaml` has `T14: depends_on: [T03, T16, T17]`. The execution_plan `wave_4` note says "T16 + T17 can run independently. T14 depends on T03/T16/T17."

**Problem:** T16 (Arcjet middleware) and T17 (Resend email setup) have `depends_on: []` — they are independent. T14 lists them as prerequisites. This means T14 cannot start until T16 and T17 are done. Within a wave where all four tasks (T14, T15, T16, T17) are meant to run, this creates a mandatory sequencing: T16 and T17 must go first, then T14. This is architecturally correct but creates a problem: if T16 or T17 hit a blocker (e.g. Resend domain verification takes 24 hours per the T17 brief itself — "Wait for verification, typically < 24 hours"), T14 is blocked for a full day.

**The Resend blocker is real:** T17's own content states domain verification is required before emails can send, and it "typically takes < 24 hours." T14's acceptance criteria requires "Confirmation email sent to applicant" — which cannot pass if the domain is unverified.

**Correction needed:** Split T14 acceptance criteria into two tiers: (a) form validates, Firestore write succeeds, success state shows (verifiable without real email), and (b) email sends (requires verified domain). Flag in T14's brief that email verification is a human-action blocker that may require waiting. Note in the brief that T16 and T17 can be worked on in parallel with T14's form/Firestore work, with email integration being the final integration step.

---

### C3 — T15 Stripe subscription mode implementation is broken as written

**Affected:** `briefs/T15_barbets-duet-full-build.md` line ~149

**Actual state:** The implementation guidance code uses `mode: donationType === 'monthly' ? 'subscription' : 'payment'` combined with inline `price_data`. Stripe's API does not allow `price_data` with `unit_amount` in subscription mode — subscriptions require a `Price` object created in the Stripe dashboard (or via API beforehand) with `recurring.interval` set. Using `price_data` with a `unit_amount` only works for `mode: 'payment'`.

**Problem:** The code example will throw a Stripe API error at runtime for monthly donations: "You cannot provide price_data with a unit_amount for a subscription." The acceptance criterion "Test mode transactions complete successfully" cannot be met with the code as written.

**Correction needed:** Either (a) simplify to one-time payments only for the stub, noting monthly subscriptions require pre-created Stripe Price objects and documenting this as a pre-launch action, or (b) update the implementation to show `price_id` usage for subscription mode with a note that the Price must be created in Stripe first. Option (a) is safer for a stub implementation.

---

### C4 — T05 Header state is confirmed but brief has one wrong route assumption

**Affected:** `briefs/T05_barbets-duet-full-build.md`, `components/Header.tsx:70`

**Actual state:** The Header has exactly three `href="#"` values (verified: `Community & Partnerships`, `Education & Resources`, `Economic Opportunities`). The brief correctly identifies these. However, the brief states at line ~70: `menuItems` has `{ label: 'Get Involved', href: '/support-us' }` — this is verified accurate (line 70 of Header.tsx).

The brief also says the `aboutDropdownData` contains `/learning-sites` — this is confirmed. However, there is a secondary issue the brief does not mention: `app/learning-sites/page.tsx` does not exist yet (confirmed: only `[slug]` subdirectory exists). So `/learning-sites` in the Header's aboutDropdownData already points to a route that 404s. T12 builds it in Wave 3.

**Problem:** T05 is Wave 1 and its acceptance criteria says "All existing working links remain unchanged" — but `/learning-sites` in the Header already doesn't work (it 404s). The brief does not address this. A developer executing T05 who click-tests may flag this as a pre-existing 404 that T05 didn't cause, but it's confusing.

**Correction needed:** Add a note to T05: "Note: `/learning-sites` in aboutDropdownData 'Our Work' will 404 until T12 (Wave 3) creates the page. This is expected and does not need to be fixed in T05 — do not remove or comment out this link."

---

### C5 — T07 brief says `app/stories/[slug]/page.tsx` needs building — it already exists

**Affected:** `briefs/T07_barbets-duet-full-build.md`

**Actual state:** `app/stories/[slug]/page.tsx` already exists and is a complete, functioning page with `generateStaticParams`, `generateMetadata`, and a `CinematicReader` render (verified by reading the file). The research/findings.md also confirms `/stories/[slug]` is listed under "What exists and works."

**Problem:** The T07 brief says the task is to "Complete the /stories/[slug] detail page" — which is actually accurate framing (it exists but needs work). However, the files-to-modify table does NOT list `app/stories/[slug]/page.tsx` as a file to modify — it lists only `CinematicReader.tsx` and `types/narrative.ts`. This is correct. But the T07 brief title and objective say "Complete /stories/[slug] detail page" in a way that implies creating it. The confusion could cause an executor to either try to recreate the page or miss that it already exists.

**Correction needed:** Add explicit note to T07 context: "Note: `app/stories/[slug]/page.tsx` ALREADY EXISTS and should not be recreated. The upgrade work is entirely in `components/stories/CinematicReader.tsx`."

---

### C6 — T08 `app/events/[slug]/page.tsx` correctly identified as missing, but `app/events/page.tsx` pattern reference may mislead

**Affected:** `briefs/T08_barbets-duet-full-build.md`

**Actual state:** `app/events/page.tsx` exists. `app/events/[slug]/` does not exist at all (confirmed). The T08 brief correctly identifies this gap.

However, the brief lists `components/events/EventDetail.tsx` as a file to create — but `components/events/` already exists as a directory (from the git status listing). The brief does not mention checking what is already in `components/events/`.

**Correction needed:** Add a check step: "Before creating `EventDetail.tsx`, verify `components/events/` for any existing components that may partially address this requirement."

---

### C7 — T10 references `AboutContent.tsx` but the About team data to extract may not be hardcoded in that file

**Affected:** `briefs/T10_barbets-duet-full-build.md`

**Actual state:** `app/about/AboutContent.tsx` exists (confirmed). However, the brief assumes team names are hardcoded in this component. The actual content of `AboutContent.tsx` has not been verified to contain the specific team names listed (Barbara Heinzen, James Magode Ikuya, etc.). The research findings and the learning sites data have these names, but the About page may not.

**Problem:** If team names are NOT hardcoded in `AboutContent.tsx`, step 4 of T10 ("Remove hardcoded names from AboutContent.tsx") becomes a no-op and the executor may be confused about what to remove.

**Correction needed:** Add a verification step: "First, read `app/about/AboutContent.tsx` to identify which team names are currently hardcoded. If none are found, skip the removal step and note it in the commit."

---

## Warnings (should fix)

### W1 — T02: Slug inconsistency between research findings and existing data file

**Affected:** `research/findings.md`, `lib/data/learning-sites.ts`

**Actual state:** The existing `lib/data/learning-sites.ts` uses slug `arboretum-kajokoby` (confirmed on line 57). The research/findings.md refers to this site in the existing codebase state section as `arboretum-kajok` (truncated). The T02 brief correctly lists `arboretum-kajokoby` as the canonical slug.

**Risk:** Minor confusion only — the brief has the correct slug. The research findings typo could trip up an executor who cross-references. No code change needed, but worth noting the research findings have a truncated slug reference.

**Correction needed:** Update `research/findings.md` line 80 to use the full slug `arboretum-kajokoby` instead of `arboretum-kajok`.

---

### W2 — T09 references `app/projects/InnovationHubContent.tsx` as "or page.tsx" — it exists as a separate file

**Affected:** `briefs/T09_barbets-duet-full-build.md` files-to-modify table

**Actual state:** `app/projects/InnovationHubContent.tsx` is confirmed to exist as a file separate from `page.tsx`. The brief's files table says `app/projects/InnovationHubContent.tsx (or page.tsx)` — the "or page.tsx" is unnecessary hedging that could cause an executor to modify the wrong file.

**Correction needed:** Remove "(or page.tsx)" from the T09 files table. The file to modify is `app/projects/InnovationHubContent.tsx` specifically.

---

### W3 — T12/T13 wave ordering in execution_plan.yaml is ambiguous about sequencing within Wave 3

**Affected:** `execution_plan.yaml` wave_3 section

**Actual state:** Wave 3 tasks are listed as `[T12, T13]`. The note says "T13 (MapLibre setup) must complete before T12 (browse page)." However, the task list order shows T12 before T13, which could mislead a parallel executor into starting T12 before T13 is done.

**Correction needed:** Reorder Wave 3 task list to `[T13, T12]` to reflect actual execution order, or add an explicit `sequential: true` flag with `T13 → T12` noted.

---

### W4 — T13 hardcodes brand hex values in component code instead of using CSS variables

**Affected:** `briefs/T13_barbets-duet-full-build.md` implementation guidance

**Actual state:** The `SitesMap.tsx` example code uses `bg-[#DBFF66] border-2 border-[#06211A]` directly. By Wave 3, T01 will have established CSS variables. Using hardcoded hex in the map component contradicts T01's acceptance criteria that "No hardcoded hex values" remain in components.

**Correction needed:** Update the pin marker class example to use brand token classes (`bg-neon-lime border-night-forest`) instead of hex literals, consistent with the pattern T01 establishes.

---

### W5 — T15 `donorEmail` and `donorName` are collected but DonationForm leaves them as empty strings before Stripe redirect

**Affected:** `briefs/T15_barbets-duet-full-build.md` DonationForm component section

**Actual state:** The example `handleStripeCheckout` code sends `donorEmail: ''` and `donorName: ''` to the API route. The Zod schema requires `donorEmail: z.string().email()` and `donorName: z.string().min(2)`. This will fail Zod validation at the API route for every Stripe checkout attempt.

**Problem:** There is no form field in the DonationForm example for collecting donor email/name before the Stripe redirect. The acceptance criteria includes "Donation amount Zod validation prevents zero/negative values" but implicitly also requires the schema to pass — which it won't with empty strings.

**Correction needed:** Add a "donor details" step or inline fields (email, name) to the DonationForm before the payment buttons render, or note that Stripe can collect these on the hosted checkout page and remove them from the pre-redirect Zod schema.

---

### W6 — T27 depends on Firestore donation records from T15, but T15 doesn't write to Firestore

**Affected:** `briefs/T27_barbets-duet-full-build.md`, `briefs/T15_barbets-duet-full-build.md`

**Actual state:** T15 (donations) uses Stripe Checkout — payment data lives in Stripe, not Firestore. T15 has no `addDoc` to Firestore for donations. T27 says it will show "Donation records overview" and its upstream dependency table says "T15 — Donation records (may be Stripe records, not Firestore)."

**Problem:** The T27 brief's `DonationsOverview` component will need to call the Stripe API (list charges/payment intents) rather than read Firestore. This requires a Stripe server-side API call in the admin dashboard, which T27's implementation guidance does not address at all.

**Correction needed:** Update T27 to either (a) add a step in T15 to write a donation record to Firestore on successful webhook verification, or (b) explicitly state that `DonationsOverview` reads from Stripe API and document the API call pattern required.

---

### W7 — T11 and T10 both modify `components/Header.tsx` in Wave 2 — potential merge conflict

**Affected:** `briefs/T10_barbets-duet-full-build.md`, `briefs/T11_barbets-duet-full-build.md`

**Actual state:** T10 says to add `/about/team` to `aboutDropdownData` in `components/Header.tsx`. T11 says to add `/about/careers` to the same `aboutDropdownData`. Both are Wave 2 tasks that list `components/Header.tsx` as a file to modify.

**Problem:** If these run in parallel (which Wave 2 allows), both will try to modify the same `aboutDropdownData` constant. Whichever commits second will need to reconcile the other's change.

**Correction needed:** Note in both T10 and T11 that they share a Header modification and should be executed sequentially or the executor should be aware of the conflict. Alternatively, run T11 after T10 (T11 has no explicit dependency on T10 but this sequencing avoids the conflict).

---

## Observations (nice to have)

### O1 — T01 claims "No Inter font reference" as a criterion but Inter is not currently loaded

**Actual state:** `app/layout.tsx` imports `DM_Sans`, `BioRhyme`, and `JetBrains_Mono` — no Inter import. The existing `globals.css` off-brand token values relate to colours, not fonts. The "remove Inter" criterion in T01 is likely a safety check that will pass trivially.

**Note:** No action needed. The criterion is harmless to include but the executor should not spend time searching for Inter if it isn't there.

---

### O2 — T13 fallback `lib/map/style.json` is intentionally minimal

**Actual state:** The T13 brief correctly documents that the local `style.json` is a placeholder background-only style. This is appropriate for development without a Stadia API key. Executors should not mistake the minimal local style for the finished map style.

---

### O3 — T02 Msichoke and Arboretum data already exists — executor should update, not recreate

**Actual state:** `lib/data/learning-sites.ts` has 2 existing entries. T02 adds 11 new entries. The brief says "alongside the existing 2" which is correct. The executor should be aware the file already has imports and a `learningSites` array — they are adding to it, not replacing it.

---

### O4 — T18 Sanity SDK install (`npm install @sanity/client...`) may conflict with T19 which also configures Sanity

**Actual state:** T18 includes an install command for `@sanity/client @sanity/image-url next-sanity sanity`. T19 (Sanity Studio setup) will also need `sanity` installed and configured. These should be idempotent if run in sequence, but the SDK install in T18 could be moved to a Wave 5 preamble step to avoid duplication.

---

### O5 — T16 Arcjet `tokenBucket` implementation creates three separate `arcjet()` instances

**Actual state:** The T16 implementation guidance creates `aj`, `volunteerLimiter`, and `donationLimiter` as three separate Arcjet instances. The `aj` instance with `shield` and `detectBot` is never called in the `middleware()` function — only the two rate limiters are used. The shield/bot detection is defined but not applied.

**Note:** The executor should apply shield/bot detection within each limiter rather than as a separate unused instance, or call `aj.protect()` as a first-pass check before the specific limiters.

---

### O6 — T12 acceptance criterion "East Africa filter shows 11 sites, International shows 2" is hardcoded against the 13-site count

**Actual state:** This is correct given the 13 confirmed sites (11 East Africa, 2 International). No problem — just noting this criterion will need updating if site count changes.

---

### O7 — T28 says to run "after all other waves complete" but its dependency is only T01

**Actual state:** `tasks.yaml` lists `T28: depends_on: [T01]`. The execution_plan places T28 in Wave 6. This is intentional — T28 can technically start after T01 but produces a better document if run last. This is a design choice, not a defect. The brief itself notes "Best run last."

---

## Summary

| Category | Count |
|---|---|
| Critical | 7 |
| Warnings | 7 |
| Observations | 7 |

**Execution clearance: HOLD on C3 (Stripe subscription bug will cause runtime failure) and C2 (T14 dependency chain creates a real-world 24-hour blocker). C1, C4, C5, C6, C7 should be corrected in briefs before execution begins. Warnings W1–W7 should be addressed where feasible. Observations require no action.**
