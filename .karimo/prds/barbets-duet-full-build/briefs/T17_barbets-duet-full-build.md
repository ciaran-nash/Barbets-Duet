# Task Brief: T17

**Title:** Resend email setup
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 2/10
**Wave:** 4

---

## Objective

Install Resend, configure the domain for transactional email, and create two email templates using React Email: a volunteer application confirmation and a donation receipt. These templates are called by T14 and T15 respectively.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

Every volunteer application submission and every completed donation should trigger a transactional confirmation email. Resend is the email provider (3k emails/month free tier), and React Email provides a component-based templating system that renders to valid HTML email markup compatible with Gmail, Apple Mail, and Outlook.

Domain verification is required for Resend to send from a custom domain (e.g. `noreply@barbetsduet.org`). DNS records must be added to the domain registrar — this is a pre-requisite for the emails to send in production.

This task is **Wave 4** — no hard upstream dependencies (Resend setup is independent).

---

## Requirements

1. Install `resend` and `@react-email/components`
2. Create `lib/email/resend.ts` — Resend client singleton
3. Create `emails/VolunteerConfirmation.tsx` — volunteer application confirmation template
4. Create `emails/DonationReceipt.tsx` — donation receipt template
5. Document domain verification DNS records needed
6. Store `RESEND_API_KEY` in environment variables

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `resend` and `@react-email/components` in `package.json`
- [ ] `lib/email/resend.ts` exports a Resend client
- [ ] `emails/VolunteerConfirmation.tsx` exports a React Email component
- [ ] `emails/DonationReceipt.tsx` exports a React Email component
- [ ] Both templates render valid HTML with correct brand styling
- [ ] `RESEND_API_KEY` documented in `.env.local.example`
- [ ] Domain DNS verification documented (as a comment or README note)
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | Add `resend`, `@react-email/components` |
| `lib/email/resend.ts` | create | Resend client singleton |
| `emails/VolunteerConfirmation.tsx` | create | Volunteer confirmation email |
| `emails/DonationReceipt.tsx` | create | Donation receipt email |
| `.env.local.example` | modify | Document `RESEND_API_KEY` |

---

## Implementation Guidance

### Install

```bash
npm install resend @react-email/components
```

### Resend Client

```typescript
// lib/email/resend.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### Volunteer Confirmation Email

```tsx
// emails/VolunteerConfirmation.tsx
import {
  Body, Container, Head, Heading, Html, Preview,
  Section, Text, Link, Hr
} from '@react-email/components';

interface VolunteerConfirmationProps {
  name: string;
  siteName?: string;
  email?: string;
}

export default function VolunteerConfirmation({ name, siteName }: VolunteerConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your volunteer application has been received — Barbets Duet</Preview>
      <Body style={{ backgroundColor: '#06211A', fontFamily: 'Georgia, serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#DBFF66', fontSize: '32px', marginBottom: '24px' }}>
            Application Received
          </Heading>
          <Text style={{ color: '#F4F4F5', fontSize: '16px', lineHeight: '1.6' }}>
            Dear {name},
          </Text>
          <Text style={{ color: '#F4F4F5', fontSize: '16px', lineHeight: '1.6' }}>
            Thank you for your interest in volunteering with Barbets Duet
            {siteName ? ` at ${siteName}` : ''}. We have received your application
            and will review it within 2 weeks.
          </Text>
          <Hr style={{ borderColor: '#006F53', margin: '32px 0' }} />
          <Section>
            <Heading as="h2" style={{ color: '#DBFF66', fontSize: '20px' }}>
              What happens next
            </Heading>
            <Text style={{ color: '#F4F4F5/80', fontSize: '14px' }}>
              Our team will review your application and contact you to arrange
              a brief conversation about your interest and availability.
            </Text>
          </Section>
          <Hr style={{ borderColor: '#006F53', margin: '32px 0' }} />
          <Text style={{ color: '#F4F4F5', fontSize: '12px', opacity: 0.6 }}>
            Barbets Duet — 13 Learning Sites, One Jumuiya
          </Text>
          <Link
            href="https://barbetsduet.org"
            style={{ color: '#DBFF66', fontSize: '12px' }}
          >
            barbetsduet.org
          </Link>
        </Container>
      </Body>
    </Html>
  );
}
```

### Donation Receipt Email

```tsx
// emails/DonationReceipt.tsx
interface DonationReceiptProps {
  donorName: string;
  amount: number;
  currency: string;
  donationType: 'one-time' | 'monthly';
  siteName?: string;
}

// Similar structure to VolunteerConfirmation:
// - "Thank you for your donation" heading
// - Amount + currency confirmation
// - If site-tagged: "Your gift supports [site name]"
// - If monthly: "Your monthly donation will recur each month"
// - "Your generosity directly funds restoration work" message
```

### Domain Verification Notes

Add to README or as comments in `lib/email/resend.ts`:

```
# Resend Domain Verification (pre-launch action required)
# 1. Go to resend.com → Domains → Add Domain
# 2. Enter: barbetsduet.org
# 3. Add the following DNS records to your domain registrar:
#    - TXT record: (Resend provides value)
#    - DKIM CNAME records: (Resend provides 2-3 records)
# 4. Wait for verification (typically < 24 hours)
# 5. Once verified, emails can be sent from noreply@barbetsduet.org
```

### Sending from Resend (used in T14/T15)

```typescript
// Pattern for T14 to use:
import { resend } from '@/lib/email/resend';
import VolunteerConfirmation from '@/emails/VolunteerConfirmation';

await resend.emails.send({
  from: 'Barbets Duet <noreply@barbetsduet.org>',
  to: applicantEmail,
  subject: 'Your volunteer application — Barbets Duet',
  react: <VolunteerConfirmation name={firstName} siteName={preferredSiteName} />,
});
```

---

## Boundaries

### Files You MUST NOT Touch

- `.env*` actual files
- `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

None — Resend setup is independent.

### Downstream Impact

T14 (volunteer form) imports `VolunteerConfirmation` and uses the Resend client. T15 (donations page) may import `DonationReceipt`.

---

## Commit Guidelines

```
feat(email): install Resend and create volunteer + donation email templates

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Preview: `npx email dev` (react-email CLI) renders both templates correctly
- [ ] Test send via Resend dashboard to verify template HTML output

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T17 | Wave: 4*
