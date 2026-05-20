import { z } from 'zod';

export const volunteerApplicationSchema = z.object({
  // Personal information
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or fewer'),

  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or fewer'),

  email: z.string()
    .email('Please enter a valid email address'),

  // Location
  country: z.string()
    .min(1, 'Country is required'),

  city: z.string()
    .min(1, 'City is required'),

  // Preferred learning site (from the 13 sites)
  preferredSiteSlug: z.enum([
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
    'any', // open to any site
  ]).optional(),

  // Availability
  availabilityType: z.enum(['full-time', 'part-time', 'occasional', 'remote-only']),

  availabilityStart: z.string()
    .min(1, 'Availability start date is required')
    .regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM format (e.g. 2026-09)'),

  availabilityDurationMonths: z.number()
    .int()
    .min(1, 'Minimum 1 month')
    .max(24, 'Maximum 24 months')
    .optional(),

  // Skills and interests
  skills: z.array(z.string()).min(1, 'Please select at least one skill area'),

  languagesSpoken: z.array(z.string()).min(1, 'Please list at least one language'),

  // Motivation
  motivationStatement: z.string()
    .min(50, 'Please write at least 50 characters about your motivation')
    .max(2000, 'Motivation statement must be 2000 characters or fewer'),

  // How did you hear about us?
  referralSource: z.string().optional(),

  // Agreement
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

export type VolunteerApplicationInput = z.infer<typeof volunteerApplicationSchema>;

export const SKILL_OPTIONS = [
  'Ecology & Conservation',
  'Agroforestry & Land Management',
  'Marine & Coastal Science',
  'Community Organising',
  'Education & Youth Work',
  'Photography & Documentation',
  'Data & Research',
  'Finance & Fundraising',
  'Web & Technology',
  'Communications & Media',
  'Legal & Policy',
  'Health & Wellbeing',
] as const;

export const AVAILABILITY_TYPES = {
  'full-time': 'Full-time (40+ hrs/week)',
  'part-time': 'Part-time (10–40 hrs/week)',
  'occasional': 'Occasional (< 10 hrs/week)',
  'remote-only': 'Remote only',
} as const;
