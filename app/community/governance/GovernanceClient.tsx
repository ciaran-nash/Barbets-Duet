'use client';

// ============================================================
// GovernanceClient — Wave 6, Task E1-E2
// ============================================================
// /community/governance interactive governance page.
// Sections:
//  1. Explainer (Mosaic/Column, Utu Net Benefits, Circular Review)
//  2. Peer review chain visualization (RadialOrbitalTimeline)
//  3. Coordinator review submission form (with baseline checklist)
//  4. 4 Returns metrics overview
// ============================================================

import { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Users, Leaf, ArrowRight, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import FourReturnsDisplay from '@/components/community/FourReturnsDisplay';
import { supabase } from '@/lib/supabase/client';
import type { Profile } from '@/types/community';

// ── Types ─────────────────────────────────────────────────────

interface PentangleGroup {
  id: string;
  label: string;
  sites: string[];
  review_chain: string[];
  status: 'active' | 'forming';
}

interface PeerReview {
  id: string;
  reviewer_site_slug: string;
  reviewee_site_slug: string;
  year: number;
  status: 'pending' | 'submitted' | 'acknowledged';
  goals_progress: string | null;
  goals_explanation: string | null;
  natural_score: number | null;
  social_score: number | null;
  financial_score: number | null;
  inspiration_score: number | null;
  baseline_locked: boolean;
}

// ── Explainer section ─────────────────────────────────────────

function GovernanceExplainer() {
  return (
    <section className="py-16 max-w-4xl">
      <p className="text-xs font-mono text-viridian uppercase tracking-[0.2em] mb-3">
        How We Govern Ourselves
      </p>
      <h1 className="font-serif font-bold text-4xl md:text-5xl mb-6">
        Jumuiya Governance
      </h1>
      <p className="text-base text-foreground/60 font-sans leading-relaxed mb-10 max-w-2xl">
        Barbets Duet operates on the principle of <em>horizontal accountability</em>. No central
        authority determines success. Instead, each site holds its neighbour accountable through
        a circular peer review chain — grounded in the 4 Returns framework.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: GitBranch,
            title: 'Mosaic & Column Rights',
            body: 'Sites operate under one of two land rights regimes. Mosaic rights are collective — land is stewarded by the community. Column rights are individual — families hold title but participate in peer governance.',
          },
          {
            icon: Users,
            title: 'Utu Net Benefits',
            body: '"Utu" (Swahili: humanity, interconnectedness) frames benefit beyond profit. Decisions are evaluated on whether they strengthen the web of relationships — human, ecological, and economic.',
          },
          {
            icon: Leaf,
            title: 'Circular Peer Review',
            body: 'Each year, Site A reviews Site B, B reviews C, and so on around the Pentangle. No site reviews itself. Reviews are structured around the 4 Returns metrics and self-defined goals.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-viridian/5 border border-viridian/10 p-6"
          >
            <div className="w-10 h-10 rounded-full bg-viridian/10 flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-viridian" />
            </div>
            <h3 className="font-serif font-semibold text-base mb-2">{title}</h3>
            <p className="text-sm text-foreground/60 font-sans leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Chain visualization adapter ───────────────────────────────

function buildTimelineData(groups: PentangleGroup[]) {
  const activeGroups = groups.filter((g) => g.status === 'active');
  if (activeGroups.length === 0) return [];

  return activeGroups.flatMap((group, gIdx) =>
    group.review_chain.map((slug, i) => {
      const reviewsSlug = group.review_chain[(i + 1) % group.review_chain.length];
      return {
        id: gIdx * 100 + i + 1,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        date: group.label,
        content: `Reviews → ${reviewsSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`,
        category: group.id,
        icon: Leaf,
        relatedIds: [gIdx * 100 + ((i + 1) % group.review_chain.length) + 1],
        status: 'in-progress' as const,
        energy: 80,
      };
    })
  );
}

// ── Review status badge ───────────────────────────────────────

function StatusBadge({ status }: { status: PeerReview['status'] }) {
  const config = {
    pending: { label: 'Pending', className: 'bg-amber-500/10 text-amber-600' },
    submitted: { label: 'Submitted', className: 'bg-viridian/10 text-viridian' },
    acknowledged: { label: 'Acknowledged', className: 'bg-neon-lime/20 text-night-forest' },
  };
  const { label, className } = config[status];
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}

// ── Coordinator review form ───────────────────────────────────

interface ReviewFormProps {
  coordinatorSiteSlug: string;
  revieweeSlug: string;
  year: number;
  existingReview: PeerReview | null;
  profile: Profile;
}

function ReviewForm({ coordinatorSiteSlug, revieweeSlug, year, existingReview, profile }: ReviewFormProps) {
  const [expanded, setExpanded] = useState(!existingReview);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showBaseline, setShowBaseline] = useState(!existingReview?.baseline_locked);
  const [error, setError] = useState('');

  // Form state
  const [form, setForm] = useState({
    goalsProgress: existingReview?.goals_progress ?? '',
    goalsExplanation: existingReview?.goals_explanation ?? '',
    natural: existingReview?.natural_score?.toString() ?? '',
    social: existingReview?.social_score?.toString() ?? '',
    financial: existingReview?.financial_score?.toString() ?? '',
    inspiration: existingReview?.inspiration_score?.toString() ?? '',
    // Baseline fields
    baselineYear: '',
    naturalBaseline: '',
    socialBaseline: '',
    financialBaseline: '',
    inspirationBaseline: '',
    baselineNotes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload: Record<string, unknown> = {
      reviewer_site_slug: coordinatorSiteSlug,
      reviewee_site_slug: revieweeSlug,
      year,
      status: 'submitted',
      goals_progress: form.goalsProgress,
      goals_explanation: form.goalsExplanation,
      natural_score: parseFloat(form.natural) || null,
      social_score: parseFloat(form.social) || null,
      financial_score: parseFloat(form.financial) || null,
      inspiration_score: parseFloat(form.inspiration) || null,
      reviewer_id: profile.id,
      submitted_at: new Date().toISOString(),
    };

    // Include baseline on first submission
    if (showBaseline && form.baselineYear) {
      payload.baseline_year = parseInt(form.baselineYear);
      payload.natural_baseline = parseFloat(form.naturalBaseline) || null;
      payload.social_baseline = parseFloat(form.socialBaseline) || null;
      payload.financial_baseline = parseFloat(form.financialBaseline) || null;
      payload.inspiration_baseline = parseFloat(form.inspirationBaseline) || null;
      payload.baseline_notes = form.baselineNotes || null;
      payload.baseline_locked = true;
    }

    const { error: err } = existingReview
      ? await supabase.from('peer_reviews').update(payload).eq('id', existingReview.id)
      : await supabase.from('peer_reviews').insert(payload);

    setSubmitting(false);
    if (err) {
      setError('Submission failed. Please try again.');
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-2 p-4 bg-viridian/5 rounded-xl text-sm text-viridian font-sans">
        <CheckCircle className="w-4 h-4 shrink-0" />
        Review submitted for {year}.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-foreground/10 overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
      >
        <div>
          <p className="font-sans font-semibold text-sm">
            Review: {revieweeSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
          <p className="text-xs text-foreground/40 font-sans mt-0.5">Annual review {year}</p>
        </div>
        <div className="flex items-center gap-2">
          {existingReview && <StatusBadge status={existingReview.status} />}
          {expanded ? <ChevronUp className="w-4 h-4 text-foreground/30" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
        </div>
      </button>

      {expanded && (
        <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4 border-t border-foreground/10 pt-4">
          {/* Goal progress */}
          <div>
            <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1.5">
              Goal Progress
            </label>
            <textarea
              value={form.goalsProgress}
              onChange={(e) => setForm((f) => ({ ...f, goalsProgress: e.target.value }))}
              rows={3}
              placeholder="How did this site progress toward its self-defined goals?"
              className="w-full px-3 py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm resize-y focus:outline-none focus:ring-2 focus:ring-viridian"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1.5">
              Contextual Explanation
            </label>
            <textarea
              value={form.goalsExplanation}
              onChange={(e) => setForm((f) => ({ ...f, goalsExplanation: e.target.value }))}
              rows={2}
              placeholder="Any contextual factors that explain shortfalls or successes?"
              className="w-full px-3 py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm resize-y focus:outline-none focus:ring-2 focus:ring-viridian"
            />
          </div>

          {/* 4 Returns scores */}
          <div className="grid grid-cols-2 gap-3">
            {(['natural', 'social', 'financial', 'inspiration'] as const).map((key) => (
              <div key={key}>
                <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1">
                  {key} (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={500}
                  step={0.1}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder="e.g. 127"
                  className="w-full px-3 py-2 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-viridian"
                />
              </div>
            ))}
          </div>

          {/* Baseline checklist (first submission only) */}
          {showBaseline && (
            <div className="rounded-xl bg-viridian/5 border border-viridian/20 p-4 space-y-3">
              <p className="text-xs font-mono text-viridian uppercase tracking-widest">
                Coordinator Interview Checklist — Baseline Metrics
              </p>
              <p className="text-xs text-foreground/60 font-sans">
                These baseline figures will be locked after first submission. All future reviews
                calculate % change relative to these values.
              </p>
              <div>
                <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1">Baseline Year</label>
                <input
                  type="number"
                  value={form.baselineYear}
                  onChange={(e) => setForm((f) => ({ ...f, baselineYear: e.target.value }))}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 rounded-xl border border-foreground/10 bg-white/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-viridian"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['naturalBaseline', 'socialBaseline', 'financialBaseline', 'inspirationBaseline'] as const).map((key) => (
                  <div key={key}>
                    <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1">
                      {key.replace('Baseline', '')} baseline
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={0.1}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder="Raw value"
                      className="w-full px-3 py-2 rounded-xl border border-foreground/10 bg-white/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-viridian"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-1">Baseline Notes</label>
                <textarea
                  value={form.baselineNotes}
                  onChange={(e) => setForm((f) => ({ ...f, baselineNotes: e.target.value }))}
                  rows={2}
                  placeholder="Context for these baseline figures..."
                  className="w-full px-3 py-2.5 rounded-xl border border-foreground/10 bg-white/5 font-sans text-sm resize-y focus:outline-none focus:ring-2 focus:ring-viridian"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-viridian text-white text-sm font-sans font-semibold hover:bg-viridian/80 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>
            ) : (
              <>Submit review <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

interface GovernanceClientProps {
  currentProfile: Profile | null;
  pentangleGroups: PentangleGroup[];
  reviews: PeerReview[];
  currentYear: number;
  coordinatorSiteSlug: string | null;
}

export default function GovernanceClient({
  currentProfile,
  pentangleGroups,
  reviews,
  currentYear,
  coordinatorSiteSlug,
}: GovernanceClientProps) {
  const timelineData = buildTimelineData(pentangleGroups);
  const isCoordinator = currentProfile?.role === 'site_coordinator' && !!coordinatorSiteSlug;

  // Find which site this coordinator reviews (next in chain)
  let revieweeSlug: string | null = null;
  if (isCoordinator && coordinatorSiteSlug) {
    for (const group of pentangleGroups) {
      const idx = group.review_chain.indexOf(coordinatorSiteSlug);
      if (idx !== -1) {
        revieweeSlug = group.review_chain[(idx + 1) % group.review_chain.length];
        break;
      }
    }
  }

  const existingReview = reviews.find(
    (r) =>
      r.reviewer_site_slug === coordinatorSiteSlug &&
      r.reviewee_site_slug === revieweeSlug &&
      r.year === currentYear
  ) ?? null;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Section 1: Explainer */}
      <GovernanceExplainer />

      {/* Section 2: Chain visualization */}
      {timelineData.length > 0 && (
        <section className="py-12 border-t border-foreground/10">
          <div className="mb-6">
            <p className="text-xs font-mono text-viridian uppercase tracking-[0.2em] mb-2">
              Circular Review Chain
            </p>
            <h2 className="font-serif font-bold text-3xl">East African Pentangle</h2>
            <p className="text-sm text-foreground/50 font-sans mt-1">
              Each node reviews the next in the chain. Click to explore.
            </p>
          </div>
          <div className="rounded-2xl bg-night-forest/5 border border-foreground/10 overflow-hidden" style={{ height: 480 }}>
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </section>
      )}

      {/* Section 3: Coordinator dashboard */}
      {isCoordinator && coordinatorSiteSlug && revieweeSlug && (
        <section className="py-12 border-t border-foreground/10">
          <div className="mb-6">
            <p className="text-xs font-mono text-viridian uppercase tracking-[0.2em] mb-2">
              Your Review — {currentYear}
            </p>
            <h2 className="font-serif font-bold text-2xl">Coordinator Dashboard</h2>
            <p className="text-sm text-foreground/50 font-sans mt-1">
              You are reviewing:{' '}
              <strong>
                {revieweeSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </strong>
            </p>
          </div>
          <ReviewForm
            coordinatorSiteSlug={coordinatorSiteSlug}
            revieweeSlug={revieweeSlug}
            year={currentYear}
            existingReview={existingReview}
            profile={currentProfile!}
          />
        </section>
      )}

      {/* Non-coordinator signed-in members: show review status overview */}
      {currentProfile && !isCoordinator && reviews.length > 0 && (
        <section className="py-12 border-t border-foreground/10">
          <h2 className="font-serif font-bold text-2xl mb-6">Review Status — {currentYear}</h2>
          <div className="grid gap-3">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-foreground/10 bg-night-forest/5"
              >
                <span className="text-sm font-sans text-foreground/70">
                  {r.reviewer_site_slug.replace(/-/g, ' ')} →{' '}
                  {r.reviewee_site_slug.replace(/-/g, ' ')}
                </span>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: 4 Returns overview */}
      <section className="border-t border-foreground/10 pt-12">
        <FourReturnsDisplay
          metrics={null}
          showPending
          className=""
        />
      </section>
    </main>
  );
}
