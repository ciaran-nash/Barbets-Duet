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
