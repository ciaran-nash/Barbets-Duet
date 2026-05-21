/**
 * Sanity client — configured for Next.js server-side queries
 *
 * Uses next-sanity's createClient which integrates with Next.js fetch cache.
 * Cache tags are set per-query for on-demand revalidation via T21 webhooks.
 */
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  // Use CDN in production for faster reads; bypass in dev for fresh data
  useCdn: process.env.NODE_ENV === 'production',
});
