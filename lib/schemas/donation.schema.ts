import { z } from 'zod';

export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1').max(100000),
  currency: z.enum(['USD', 'GBP', 'EUR', 'KES', 'TZS']).default('USD'),
  donationType: z.enum(['one-time', 'monthly']).default('one-time'),
  // Optional: tag to a specific learning site
  siteSlug: z.string().optional(),
  // Donor info — optional here because Stripe collects these on the hosted checkout page.
  // donorEmail and donorName are NOT collected in the pre-checkout form.
  donorEmail: z.string().email('Please enter a valid email address').optional(),
  donorName: z.string().min(2, 'Please enter your name').optional(),
});

export type DonationData = z.infer<typeof donationSchema>;
