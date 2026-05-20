import { z } from 'zod';

// Donation amount validation
const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500] as const;

export const donationAmountSchema = z.union([
  z.enum(PRESET_AMOUNTS.map(String) as [string, ...string[]]),
  z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount').refine(
    (val) => parseFloat(val) >= 1,
    'Minimum donation is £1'
  ).refine(
    (val) => parseFloat(val) <= 100000,
    'Maximum donation is £100,000'
  ),
]);

export const donationSchema = z.object({
  // Amount
  amount: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount')
    .refine((val) => parseFloat(val) >= 1, 'Minimum donation is £1')
    .refine((val) => parseFloat(val) <= 100000, 'Maximum donation is £100,000'),

  currency: z.enum(['GBP', 'USD', 'EUR', 'KES', 'TZS', 'UGX']).default('GBP'),

  // Donation type
  frequency: z.enum(['one-time', 'monthly', 'annual']).default('one-time'),

  // Optional: tag donation to a specific learning site
  taggedSiteSlug: z.enum([
    'woodland-valley-farm',
    'hannacroix-creek',
    'molo-magode-farm',
    'lukenya-zumula-farm',
    'seme',
    'msichoke-seaweed-growers',
    'mwasama-primary-school',
    'himo',
    'sikia-community-dam',
    'arboretum-kajokoby',
    'cichlid-breeding',
    'rufiji',
    'nkoroi',
  ]).optional(),

  // Payment method
  paymentMethod: z.enum(['stripe', 'paypal']),

  // Donor information
  donorEmail: z.string()
    .email('Please enter a valid email address'),

  donorName: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),

  // Gift aid (UK)
  giftAid: z.boolean().default(false),

  // Message to organisation (optional)
  message: z.string()
    .max(500, 'Message must be 500 characters or fewer')
    .optional(),

  // Agree to privacy policy
  agreeToPrivacyPolicy: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy' }),
  }),
});

export type DonationInput = z.infer<typeof donationSchema>;

// Stripe-specific checkout session schema
export const stripeCheckoutSchema = z.object({
  amount: z.number().int().positive(), // amount in pence/cents
  currency: z.string().length(3),
  frequency: z.enum(['one-time', 'monthly', 'annual']),
  donorEmail: z.string().email(),
  donorName: z.string(),
  taggedSiteSlug: z.string().optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export type StripeCheckoutInput = z.infer<typeof stripeCheckoutSchema>;

// PayPal order schema
export const paypalOrderSchema = z.object({
  amount: z.string(), // PayPal uses string amounts
  currency: z.string().length(3),
  donorEmail: z.string().email(),
  donorName: z.string(),
  taggedSiteSlug: z.string().optional(),
});

export type PaypalOrderInput = z.infer<typeof paypalOrderSchema>;

export const DONATION_PRESET_AMOUNTS = PRESET_AMOUNTS;

export const DONATION_FREQUENCIES = {
  'one-time': 'One-time',
  'monthly': 'Monthly',
  'annual': 'Annual',
} as const;
