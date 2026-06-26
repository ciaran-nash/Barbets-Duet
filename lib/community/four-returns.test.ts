import { describe, it, expect } from 'vitest';
import { calculatePercentage } from './four-returns';

describe('calculatePercentage', () => {
  it('computes a metric as (current / baseline) * 100', () => {
    expect(calculatePercentage(120, 100)).toBe(120);
    expect(calculatePercentage(50, 200)).toBe(25);
  });

  it('rounds to one decimal place', () => {
    expect(calculatePercentage(1, 3)).toBe(33.3);
  });

  it('returns null when current or baseline is null', () => {
    expect(calculatePercentage(null, 100)).toBeNull();
    expect(calculatePercentage(100, null)).toBeNull();
  });

  it('returns null when baseline is zero (no divide-by-zero)', () => {
    expect(calculatePercentage(100, 0)).toBeNull();
  });
});
