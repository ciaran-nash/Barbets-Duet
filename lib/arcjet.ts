import arcjet, { tokenBucket, shield, detectBot } from '@arcjet/next';

/**
 * Shared Arcjet instance — shield (common attacks) + bot detection.
 * Used by API route handlers (Node runtime). Kept OUT of Edge middleware so
 * the middleware bundle stays under Vercel's 1 MB Edge Function size limit.
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({ mode: 'LIVE', allow: ['CATEGORY:SEARCH_ENGINE'] }),
  ],
});

/** Volunteer form: max 5 submissions per IP per hour. */
export const volunteerLimiter = aj.withRule(
  tokenBucket({ mode: 'LIVE', characteristics: ['ip.src'], refillRate: 5, interval: 3600, capacity: 5 })
);

/** Checkout: max 10 requests per IP per hour. */
export const donationLimiter = aj.withRule(
  tokenBucket({ mode: 'LIVE', characteristics: ['ip.src'], refillRate: 10, interval: 3600, capacity: 10 })
);
