# Task Brief: T14

**Title:** Volunteer application form (/get-involved)
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 3/10
**Wave:** 4

---

## Objective

Build the `/get-involved` page with a multi-step volunteer application form. Submissions are validated with Zod, written to Firestore, protected by Arcjet bot/rate limiting, and trigger a Resend confirmation email to the applicant.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The volunteer application is the "Join" user journey — the second of Barbets Duet's three core conversion paths (Discover → Join → Support). Prospective volunteers need to express interest in a specific Jumuiya learning site, share their skills, and indicate availability. The form must feel welcoming but also capture enough information for Barbets Duet staff to make informed acceptance decisions.

Fields: name, email, location, preferred site (from 13 sites list), availability, skills/interests, motivation.

This task is **Wave 4** — depends on T03 (Zod schemas), T16 (Arcjet middleware), and T17 (Resend email setup). All three must be complete before starting.

---

## Research Context

### Zod Schema (from T03)

```typescript
// lib/schemas/volunteerApplication.schema.ts
// Already created in T03:
export const volunteerApplicationSchema = z.object({
  firstName, lastName, email, location,
  preferredSiteSlug, availabilityStart, durationWeeks,
  skills, motivation, linkedinUrl, portfolioUrl
});
export type VolunteerApplicationData = z.infer<typeof volunteerApplicationSchema>;
```

### Firestore Collection

Write to `volunteer_applications` collection. Each document:
```typescript
{
  ...formData,
  submittedAt: serverTimestamp(),
  status: 'pending',        // pending | accepted | rejected
  id: auto-generated
}
```

### Arcjet Protection

T16 sets up `middleware.ts` with Arcjet. The `/api/volunteer` route should also validate Arcjet token in the API route handler (defence in depth).

### Resend Email

T17 creates the `VolunteerConfirmation.tsx` email template. The API route calls Resend with:
- `to`: applicant email
- `from`: `noreply@barbetsduet.org` (or configured domain)
- `subject`: "Your volunteer application received — Barbets Duet"
- `react`: `<VolunteerConfirmation name={firstName} siteName={preferredSiteName} />`

---

## Requirements

1. Build `app/get-involved/page.tsx` with a multi-step form
2. Build `components/forms/VolunteerForm.tsx` — the form component
3. Build `app/api/volunteer/route.ts` — POST handler: Zod validate → Firestore write → Resend email
4. Multi-step flow: Step 1 (personal info) → Step 2 (site + availability) → Step 3 (skills + motivation) → Step 4 (success)
5. Zod validation on each step before advancing
6. Arcjet rate limiting checked in API route
7. Success state shown after submission (no page reload)
8. Accessible form: labels, error messages, focus management between steps

---

## Success Criteria

Criteria are split into two tiers due to the Resend domain verification DNS gate (see note below).

### Immediate (testable same day — required for PR merge)

- [ ] `/get-involved` page renders
- [ ] Form has at least 3 steps with progress indicator
- [ ] Preferred site selector populated from `learningSites` (all 13)
- [ ] Zod validation shows field-level errors before submission
- [ ] Successful submission: document appears in Firestore `volunteer_applications` collection
- [ ] Resend API call fires without error in test mode (check server logs — a 200 from Resend is sufficient even if email is not yet deliverable)
- [ ] Arcjet bot protection active on `/api/volunteer` endpoint
- [ ] Success state shown after form completion
- [ ] Mobile responsive — all steps usable on 375px
- [ ] `npx tsc --noEmit` passes

### Gated (requires Resend domain verification — ~24h DNS wait)

- [ ] Confirmation email delivered to a real inbox

**DNS gate — do not block PR merge on email delivery. Merge when all Immediate criteria pass (Firestore write success + Resend API 200). Verify email delivery in a follow-up check after DNS propagates.**

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/get-involved/page.tsx` | create | Page route |
| `components/forms/VolunteerForm.tsx` | create | Multi-step form component |
| `lib/schemas/volunteerApplication.schema.ts` | modify | Refine schema if needed after T03 stub |
| `app/api/volunteer/route.ts` | create | API route: validate + Firestore + Resend |

---

## Implementation Guidance

### Multi-Step Form State

```tsx
// components/forms/VolunteerForm.tsx
'use client';

const [step, setStep] = useState(1);
const [formData, setFormData] = useState<Partial<VolunteerApplicationData>>({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [errors, setErrors] = useState<Record<string, string>>({});

const TOTAL_STEPS = 3;
```

### Step Structure

```
Step 1: Personal Info
  - First name, last name, email, current location

Step 2: Site Preference & Availability
  - Preferred site (select from learningSites)
  - Availability start date
  - Duration (weeks)

Step 3: Background
  - Skills/disciplines (textarea)
  - Motivation (textarea)
  - LinkedIn URL (optional)
  - Portfolio URL (optional)
```

### API Route Pattern

```typescript
// app/api/volunteer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Resend } from 'resend';
import VolunteerConfirmation from '@/emails/VolunteerConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Zod validation
  const parsed = volunteerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  // Firestore write
  await addDoc(collection(db, 'volunteer_applications'), {
    ...parsed.data,
    submittedAt: serverTimestamp(),
    status: 'pending',
  });

  // Resend confirmation
  await resend.emails.send({
    from: 'noreply@barbetsduet.org',
    to: parsed.data.email,
    subject: 'Your volunteer application — Barbets Duet',
    react: VolunteerConfirmation({ name: parsed.data.firstName }),
  });

  return NextResponse.json({ success: true });
}
```

### Site Selector

```tsx
import { learningSites } from '@/lib/data/learning-sites';

<select name="preferredSiteSlug">
  <option value="">Select a learning site...</option>
  {learningSites.map(site => (
    <option key={site.slug} value={site.slug}>
      {site.name} — {site.location}
    </option>
  ))}
</select>
```

### Success State

After API returns success, show a full-step success screen:
- Confirmation message with applicant first name
- "What happens next" explanation (Barbets Duet staff will review within 2 weeks)
- Link back to `/learning-sites` and `/support-us`

### Form Styling

Follow brand styling:
- Input focus: `border-accent ring-accent/30`
- Error messages: `text-red-400 text-xs` (only place where non-brand red is acceptable)
- Progress bar: thin Neon Lime line, advances with each step completion
- Submit button: Viridian background, white text, full-width on mobile

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`, `firestore.indexes.json`
- `components/ui/`
- `lib/firebase.ts` — import from here, don't modify

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T03 | `volunteerApplicationSchema` in `lib/schemas/` | Import and verify it compiles |
| T16 | Arcjet middleware on `/api/volunteer` | Confirm `middleware.ts` has Arcjet config |
| T17 | Resend setup + `VolunteerConfirmation` email template | Confirm `emails/VolunteerConfirmation.tsx` exists |

### Downstream Impact

T27 (admin dashboard) will read from `volunteer_applications` Firestore collection.

---

## Commit Guidelines

```
feat(volunteer): build /get-involved multi-step form with Firestore and Resend

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Submit test application — document appears in Firestore console
- [ ] Confirmation email arrives in test inbox
- [ ] Form usable on mobile 375px viewport
- [ ] Arcjet rejects a rapid repeated POST to `/api/volunteer`

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T14 | Wave: 4*
