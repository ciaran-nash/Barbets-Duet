import { describe, it, expect } from 'vitest';
import { donationSchema } from './donation.schema';

describe('donationSchema', () => {
  it('accepts a valid donation', () => {
    expect(
      donationSchema.safeParse({ amount: 50, currency: 'USD', donationType: 'one-time' }).success
    ).toBe(true);
  });

  it('defaults currency to USD and type to one-time', () => {
    const r = donationSchema.parse({ amount: 10 });
    expect(r.currency).toBe('USD');
    expect(r.donationType).toBe('one-time');
  });

  it('rejects amount below the $1 minimum', () => {
    expect(donationSchema.safeParse({ amount: 0 }).success).toBe(false);
  });

  it('rejects amount above the max', () => {
    expect(donationSchema.safeParse({ amount: 100001 }).success).toBe(false);
  });

  it('rejects an unsupported currency', () => {
    expect(donationSchema.safeParse({ amount: 10, currency: 'JPY' }).success).toBe(false);
  });

  it('rejects an invalid donor email', () => {
    expect(donationSchema.safeParse({ amount: 10, donorEmail: 'not-an-email' }).success).toBe(false);
  });
});
