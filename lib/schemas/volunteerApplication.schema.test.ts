import { describe, it, expect } from 'vitest';
import { volunteerApplicationSchema } from './volunteerApplication.schema';

const valid = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  location: 'London, UK',
  preferredSiteSlug: 'woodland-valley-farm',
  availabilityStart: '2026-07-01',
  skills: 'Soil science and field data collection',
  motivation: 'I want to help restore degraded land and learn from the network.',
};

describe('volunteerApplicationSchema', () => {
  it('accepts a valid application', () => {
    expect(volunteerApplicationSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a too-short first name', () => {
    expect(volunteerApplicationSchema.safeParse({ ...valid, firstName: 'A' }).success).toBe(false);
  });

  it('rejects an invalid email', () => {
    expect(volunteerApplicationSchema.safeParse({ ...valid, email: 'bad' }).success).toBe(false);
  });

  it('rejects a too-short motivation', () => {
    expect(volunteerApplicationSchema.safeParse({ ...valid, motivation: 'too short' }).success).toBe(false);
  });

  it('allows empty optional URL fields', () => {
    expect(
      volunteerApplicationSchema.safeParse({ ...valid, linkedinUrl: '', portfolioUrl: '' }).success
    ).toBe(true);
  });

  it('rejects a malformed optional URL', () => {
    expect(volunteerApplicationSchema.safeParse({ ...valid, linkedinUrl: 'notaurl' }).success).toBe(false);
  });
});
