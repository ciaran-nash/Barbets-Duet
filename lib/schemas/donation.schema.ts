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
