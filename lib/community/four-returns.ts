// ============================================================
// Four Returns Calculation Service — Wave 6, Task E4
// ============================================================
// Calculates 4 Returns metrics for a learning site.
// Inputs: seeded site data + annual coordinator peer review submissions
// Outputs: { natural, social, financial, inspiration } (%)
//          relative to the site's own locked baseline year.
//
// Calculation:
//   metric % = (current_score / baseline) * 100
//
// Where:
//   current_score = most recent submitted peer_review[metric_score]
//   baseline      = peer_review[metric_baseline] from the locked row
//
// Display states:
//   - "Baseline pending": no baseline_locked row exists yet
//   - "N/A": scores present but no baseline to compare against
//   - Numeric %: calculated result
//
// Usage:
//   const metrics = await getFourReturnsForSite('woodland-valley-farm');
//   // → { natural: 127, social: 132, financial: 161, inspiration: 94 }
//   // or null if baseline pending
// ============================================================

import { createClient } from '@supabase/supabase-js';
import type { FourReturnsMetrics } from '@/components/community/FourReturnsDisplay';

// Server-side Supabase client (no cookie needed — public data)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Types ─────────────────────────────────────────────────────

export interface FourReturnsResult {
  metrics: FourReturnsMetrics | null;
  /** True if the coordinator has not yet submitted a baseline */
  baselinePending: boolean;
  /** The year the baseline was established */
  baselineYear: number | null;
  /** The most recent review year with submitted scores */
  latestReviewYear: number | null;
}

// ── Core calculation ──────────────────────────────────────────

function calculatePercentage(
  current: number | null,
  baseline: number | null
): number | null {
  if (current === null || baseline === null || baseline === 0) return null;
  return Math.round((current / baseline) * 100 * 10) / 10; // 1 decimal place
}

// ── Main function ─────────────────────────────────────────────

/**
 * Get the 4 Returns metrics for a site.
 * Fetches the latest submitted peer review + the locked baseline.
 *
 * Returns null metrics when no baseline has been established.
 */
export async function getFourReturnsForSite(
  siteSlug: string
): Promise<FourReturnsResult> {
  // Get the baseline-locked row (first annual review submission)
  const { data: baselineRow } = await supabase
    .from('peer_reviews')
    .select(
      'baseline_year, natural_baseline, social_baseline, financial_baseline, inspiration_baseline'
    )
    .eq('reviewee_site_slug', siteSlug)
    .eq('baseline_locked', true)
    .order('baseline_year', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!baselineRow) {
    return {
      metrics: null,
      baselinePending: true,
      baselineYear: null,
      latestReviewYear: null,
    };
  }

  // Get the most recent submitted review with scores
  const { data: latestReview } = await supabase
    .from('peer_reviews')
    .select('year, natural_score, social_score, financial_score, inspiration_score')
    .eq('reviewee_site_slug', siteSlug)
    .eq('status', 'submitted')
    .order('year', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!latestReview) {
    return {
      metrics: null,
      baselinePending: false,
      baselineYear: baselineRow.baseline_year,
      latestReviewYear: null,
    };
  }

  const metrics: FourReturnsMetrics = {
    natural: calculatePercentage(latestReview.natural_score, baselineRow.natural_baseline),
    social: calculatePercentage(latestReview.social_score, baselineRow.social_baseline),
    financial: calculatePercentage(
      latestReview.financial_score,
      baselineRow.financial_baseline
    ),
    inspiration: calculatePercentage(
      latestReview.inspiration_score,
      baselineRow.inspiration_baseline
    ),
  };

  return {
    metrics,
    baselinePending: false,
    baselineYear: baselineRow.baseline_year,
    latestReviewYear: latestReview.year,
  };
}

/**
 * Get 4 Returns metrics for multiple sites.
 * Efficient: one query per metric type across all sites.
 */
export async function getFourReturnsForSites(
  siteSlugs: string[]
): Promise<Record<string, FourReturnsResult>> {
  const results: Record<string, FourReturnsResult> = {};

  // Parallel fetches per site
  await Promise.all(
    siteSlugs.map(async (slug) => {
      results[slug] = await getFourReturnsForSite(slug);
    })
  );

  return results;
}

/**
 * Get network-wide 4 Returns averages (for dashboard display).
 */
export async function getNetworkFourReturnsAverages(): Promise<FourReturnsMetrics> {
  const { data: reviews } = await supabase
    .from('peer_reviews')
    .select('natural_score, social_score, financial_score, inspiration_score')
    .eq('status', 'submitted')
    .eq('baseline_locked', true);

  if (!reviews || reviews.length === 0) {
    return { natural: null, social: null, financial: null, inspiration: null };
  }

  const avg = (key: keyof typeof reviews[0]) => {
    const vals = reviews
      .map((r) => r[key] as number | null)
      .filter((v): v is number => v !== null);
    if (vals.length === 0) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  };

  return {
    natural: avg('natural_score'),
    social: avg('social_score'),
    financial: avg('financial_score'),
    inspiration: avg('inspiration_score'),
  };
}
