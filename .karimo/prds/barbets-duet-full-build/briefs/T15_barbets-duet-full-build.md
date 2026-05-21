# Task Brief: T15

**Title:** Support-us donations page
**PRD:** barbets-duet-full-build
**Priority:** must
**Complexity:** 4/10
**Wave:** 4

---

## Objective

Build the `/support-us` donations page with general organisation donations and site-tagged donations. Integrate Stripe Checkout and PayPal as payment options (test mode with stubs — real keys plugged in pre-launch). Include preset and custom donation amounts, recurring option via Stripe.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

The `/support-us` page is the third conversion path — the "Support" user journey. It serves two donor types:
1. **General donors** — give to Barbets Duet as an organisation
2. **Site-specific donors** — tag their donation to a specific learning site (e.g. "I want to support Msichoke Seaweed Growers")

Both Stripe (primary) and PayPal (secondary) must be available as payment methods. All payment processing uses test mode initially — real API keys and domain verification happen pre-launch.

This task is **Wave 4** — depends on T02 (site data for selector) and T03 (Zod donation schema).

---

## Research Context

### Donation Schema (from T03)

```typescript
// lib/schemas/donation.schema.ts
export const donationSchema = z.object({
  amount: z.number().min(1).max(100000),
  currency: z.enum(['USD', 'GBP', 'EUR', 'KES', 'TZS']).default('USD'),
  donationType: z.enum(['one-time', 'monthly']).default('one-time'),
  siteSlug: z.string().optional(),
  donorEmail: z.string().email(),
  donorName: z.string().min(2),
});
```

### Stripe Integration Pattern

Stripe Checkout creates a hosted payment session — no card data touches the Next.js server. Flow:
1. User selects amount, type, site → clicks "Donate with Stripe"
2. `POST /api/create-checkout-session` creates Stripe Checkout session
3. Redirect to Stripe hosted checkout page
4. Stripe redirects back to `/support-us/success?session_id=...`

### PayPal Integration

PayPal SDK provides a `PayPalButtons` React component:
1. `POST /api/paypal-order` creates a PayPal order
2. PayPal SDK handles the button/popup UI
3. `onApprove` callback captures payment

### Site Selector

The `SiteSelector` component shows all 13 learning sites as a selectable list/grid. Selecting a site tags the donation metadata.

---

## Requirements

1. Build `app/support-us/page.tsx`
2. Build `components/donations/DonationForm.tsx` — preset amounts ($10, $25, $50, $100, custom) + one-time/monthly toggle
3. Build `components/donations/SiteSelector.tsx` — optional learning site selector
4. Build `app/api/create-checkout-session/route.ts` — Stripe Checkout session creator
5. Build `app/api/paypal-order/route.ts` — PayPal order creator (stub)
6. Zod validation before calling payment APIs
7. Build `app/support-us/success/page.tsx` — post-payment success page
8. Stripe and PayPal in test mode — document env vars needed

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `/support-us` page renders with donation form
- [ ] Preset amounts selectable ($10, $25, $50, $100) + custom input
- [ ] One-time donation flow works end-to-end in test mode (Stripe Checkout redirects, returns to success page)
- [ ] Monthly donation toggle is present in the UI but stubbed with a visible TODO comment — it does NOT attempt a Stripe subscription (subscription mode with inline price_data throws an API error)
- [ ] Site selector shows all 13 learning sites
- [ ] Stripe Checkout flow works in test mode (redirects to Stripe, returns to success page)
- [ ] PayPal button renders in test mode
- [ ] Donation amount Zod validation prevents zero/negative values
- [ ] `app/support-us/success/page.tsx` renders confirmation
- [ ] All Stripe/PayPal env vars documented in `.env.local.example`
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `app/support-us/page.tsx` | create | Donations page |
| `components/donations/DonationForm.tsx` | create | Amount selector + payment buttons |
| `components/donations/SiteSelector.tsx` | create | Optional learning site selector |
| `app/api/create-checkout-session/route.ts` | create | Stripe Checkout session API |
| `app/api/paypal-order/route.ts` | create | PayPal order creation API (stub) |
| `app/support-us/success/page.tsx` | create | Post-payment success page |
| `lib/schemas/donation.schema.ts` | modify | Refine schema if needed |
| `.env.local.example` | modify | Add Stripe/PayPal env vars |

---

## Implementation Guidance

### Install Commands

```bash
npm install stripe @stripe/stripe-js @paypal/react-paypal-js
```

### Env Variables Required

```bash
# .env.local.example
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_sandbox_client_id
```

### Stripe Checkout Session

```typescript
// app/api/create-checkout-session/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid data' }, { status: 400 });
  }

  const { amount, currency, donationType, siteSlug, donorEmail } = parsed.data;

  // IMPORTANT: Only use mode:'payment' with inline price_data.
  // mode:'subscription' does NOT work with price_data + unit_amount — Stripe will throw an API error.
  // Monthly subscriptions require a pre-created Price object in the Stripe dashboard.
  // For this task, implement one-time payments only. Monthly is stubbed with a TODO.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',  // Always 'payment' — do not use 'subscription' with price_data
    customer_email: donorEmail,
    line_items: [{
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: siteSlug
            ? `Donation — ${siteSlug} Learning Site`
            : 'Donation — Barbets Duet',
        },
        unit_amount: amount * 100,  // Stripe uses cents
      },
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support-us/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support-us`,
    metadata: {
      siteSlug: siteSlug || '',
      // TODO(post-launch): add donationType to metadata for monthly upgrade path
    },
  });
  // TODO(post-launch — monthly subscriptions): Create a Price object in the Stripe dashboard
  // with recurring.interval='month', then pass { price: 'price_xxxxx' } instead of price_data.

  return Response.json({ url: session.url });
}
```

### PayPal API Route (Stub)

```typescript
// app/api/paypal-order/route.ts
// Stub implementation — real PayPal SDK server-side integration in Wave 5/pre-launch
export async function POST(request: Request) {
  // TODO: Implement PayPal Orders API
  // For now: return a stub order ID for UI testing
  return Response.json({
    id: 'STUB_ORDER_ID',
    status: 'CREATED'
  });
}
```

### DonationForm Component Structure

```tsx
'use client';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

const [selectedAmount, setSelectedAmount] = useState<number>(25);
const [customAmount, setCustomAmount] = useState<string>('');
const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
const [selectedSiteSlug, setSelectedSiteSlug] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

const effectiveAmount = customAmount ? parseInt(customAmount) : selectedAmount;

const handleStripeCheckout = async () => {
  setIsLoading(true);
  // Note: donorEmail and donorName are omitted here — Stripe collects them on the hosted
  // checkout page. Remove donorEmail/donorName from the pre-redirect Zod schema or make
  // them optional, because the API call will fail validation if sent as empty strings.
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({
      amount: effectiveAmount,
      currency: 'USD',
      donationType: 'one-time',  // Always one-time for now — monthly is post-launch (see API route note)
      siteSlug: selectedSiteSlug || undefined,
      // donorEmail: collected by Stripe hosted page
      // donorName: collected by Stripe hosted page
    }),
  });
  const { url } = await res.json();
  window.location.href = url;
};
```

### SiteSelector Component

```tsx
// components/donations/SiteSelector.tsx
import { learningSites } from '@/lib/data/learning-sites';

interface SiteSelectorProps {
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

// Show a grid of site names/locations the donor can optionally select.
// Include "General donation" as the first/unselected option.
```

### Page Visual Treatment

Apply `high-end-visual-design` skill sensibility:
- Dark Night Forest background for the entire page
- Donation amount buttons: large, circular, Neon Lime selected state
- "Give to a specific site" section below the general donation form
- Site selector: compact site cards with image thumbnails
- Trust signals: "100% goes to restoration work" etc.

---

## Boundaries

### Files You MUST NOT Touch

- `.env*` actual files
- `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`
- `lib/firebase.ts`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T02 | All 13 sites for SiteSelector | `learningSites.length === 13` |
| T03 | `donationSchema` in `lib/schemas/` | Import and verify it compiles |

### Downstream Impact

T27 (admin dashboard) will display donation records. T16 (Arcjet) adds rate limiting to the checkout session endpoint.

---

## Commit Guidelines

```
feat(donations): build /support-us page with Stripe and PayPal test integration

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Stripe test checkout completes with test card 4242 4242 4242 4242
- [ ] Redirect to `/support-us/success` after Stripe checkout
- [ ] PayPal button renders
- [ ] Site selector shows all 13 learning sites
- [ ] Mobile layout usable on 375px

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T15 | Wave: 4*
