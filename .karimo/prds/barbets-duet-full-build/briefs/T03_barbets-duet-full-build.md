# Task Brief: T03

**Title:** Add Zod validation library
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 1/10
**Wave:** 1

---

## Objective

Install Zod and create two initial validation schema files for the volunteer application and donation forms. These schemas are required by T14 (volunteer form) and T15 (donations page) in Wave 4.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Barbets Duet will collect sensitive data from volunteers (contact info, motivation, availability) and donors (payment intent, site tagging). Zod provides runtime type safety and validation error messages for all form submissions. The schemas created here will be the single source of truth for both frontend form validation and backend API route validation.

This task is **Wave 1 Foundation** — no dependencies, can run in parallel with T01/T02/T04/T05.

---

## Requirements

1. Install `zod` as a production dependency
2. Create `lib/schemas/` directory
3. Create `lib/schemas/volunteerApplication.schema.ts` with a full volunteer form schema
4. Create `lib/schemas/donation.schema.ts` with a donation form schema (stub — refined in T15)
5. Export inferred TypeScript types from both schemas

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `zod` appears in `package.json` dependencies (not devDependencies)
- [ ] `lib/schemas/volunteerApplication.schema.ts` exists with a named export `volunteerApplicationSchema`
- [ ] `lib/schemas/donation.schema.ts` exists with a named export `donationSchema`
- [ ] Both schema files export inferred TypeScript types (`VolunteerApplicationData`, `DonationData`)
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | Add `zod` dependency |
| `lib/schemas/volunteerApplication.schema.ts` | create | Volunteer form Zod schema |
| `lib/schemas/donation.schema.ts` | create | Donation form Zod schema (stub) |

---

## Implementation Guidance

### Install Command

```bash
npm install zod
```

### Volunteer Application Schema

```typescript
// lib/schemas/volunteerApplication.schema.ts
import { z } from 'zod';

export const volunteerApplicationSchema = z.object({
  // Personal info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Please enter your current location'),

  // Site preference
  preferredSiteSlug: z.string().min(1, 'Please select a preferred learning site'),

  // Availability
  availabilityStart: z.string().min(1, 'Please indicate your availability start date'),
  durationWeeks: z.number().min(1).max(52).optional(),

  // Background
  skills: z.string().min(10, 'Please describe your skills (minimum 10 characters)'),
  motivation: z.string().min(30, 'Please tell us your motivation (minimum 30 characters)'),

  // Optional
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

export type VolunteerApplicationData = z.infer<typeof volunteerApplicationSchema>;
```

### Donation Schema (Stub)

```typescript
// lib/schemas/donation.schema.ts
import { z } from 'zod';

export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1').max(100000),
  currency: z.enum(['USD', 'GBP', 'EUR', 'KES', 'TZS']).default('USD'),
  donationType: z.enum(['one-time', 'monthly']).default('one-time'),
  // Optional: tag to a specific learning site
  siteSlug: z.string().optional(),
  // Donor info (collected pre-payment)
  donorEmail: z.string().email('Please enter a valid email address'),
  donorName: z.string().min(2, 'Please enter your name'),
});

export type DonationData = z.infer<typeof donationSchema>;
```

### Usage Pattern (for T14/T15 reference)

```typescript
// In API route (app/api/volunteer/route.ts)
import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema';

const parsed = volunteerApplicationSchema.safeParse(body);
if (!parsed.success) {
  return Response.json({ errors: parsed.error.flatten() }, { status: 400 });
}
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

None — no dependencies.

### Downstream Impact

Tasks T14 (volunteer form) and T15 (donation page) both import from `lib/schemas/`. T16 (Arcjet) uses the same API routes that validate with these schemas.

---

## Commit Guidelines

```
feat(validation): install zod and create volunteer + donation schemas

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] `import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema'` resolves without error

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T03 | Wave: 1*
