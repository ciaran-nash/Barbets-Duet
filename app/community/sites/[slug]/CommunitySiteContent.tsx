'use client';

// ============================================================
// CommunitySiteContent — Wave 6, Task B2
// ============================================================
// Client shell for /community/sites/[slug].
// 9 sections per Learning_Sites_Page.jpg wireframe:
//  1. Header + Hero
//  2. Challenges
//  3. Projects & Initiatives
//  4. Restoration Strategies
//  5. 4 Returns Metrics (FourReturnsDisplay — NEW)
//  6. Future Goals
//  7. Image Gallery (keyboard-accessible, WCAG 2.1 AA)
//  8. Testimonial
//  9. Contact + Featured Site + Explore Others
//
// Reuses all existing learning-sites section components.
// Adds community-specific: back nav, member count, forum link,
// FourReturnsDisplay.
// ============================================================

import Link from 'next/link';
import { ChevronLeft, MessageSquare, Users } from 'lucide-react';

import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

import { SiteHero }                  from '@/components/learning-sites/SiteHero';
import { SiteChallenges }            from '@/components/learning-sites/SiteChallenges';
import { SiteProjects }              from '@/components/learning-sites/SiteProjects';
import { SiteRestorationStrategies } from '@/components/learning-sites/SiteRestorationStrategies';
import { FutureGoals }               from '@/components/learning-sites/FutureGoals';
import { SiteGallery }               from '@/components/learning-sites/SiteGallery';
import { SiteTestimonial }           from '@/components/learning-sites/SiteTestimonial';
import { ExploreOtherSites }         from '@/components/learning-sites/ExploreOtherSites';
import { SiteContact }               from '@/components/learning-sites/SiteContact';

import FourReturnsDisplay, { type FourReturnsMetrics } from '@/components/community/FourReturnsDisplay';
import type { LearningSite } from '@/types/learning-site';

// ── Community meta bar ───────────────────────────────────────

function CommunityMetaBar({
  site,
}: {
  site: LearningSite;
}) {
  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-6 flex items-center justify-between flex-wrap gap-4">
      {/* Back nav */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors font-sans focus:outline-none focus:ring-2 focus:ring-viridian rounded"
      >
        <ChevronLeft className="w-4 h-4" />
        Community Network
      </Link>

      {/* Right: member count + forum link */}
      <div className="flex items-center gap-4">
        {site.memberCount !== undefined && site.memberCount > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs text-foreground/50 font-sans">
            <Users className="w-3.5 h-3.5" />
            {site.memberCount} member{site.memberCount !== 1 ? 's' : ''}
          </span>
        )}
        {site.forumLink ? (
          <Link
            href={site.forumLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-viridian text-white text-xs font-sans font-medium hover:bg-viridian/80 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Site Forum
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/30 text-xs font-sans">
            <MessageSquare className="w-3.5 h-3.5" />
            Forum coming soon
          </span>
        )}
      </div>
    </div>
  );
}

// ── Accessible keyboard gallery wrapper ──────────────────────
// SiteGallery already renders keyboard-navigable images.
// This wrapper adds a visible focus indicator section heading.

function AccessibleGallerySection({ site }: { site: LearningSite }) {
  return (
    <section aria-label={`Image gallery for ${site.name}`}>
      <SiteGallery site={site} />
    </section>
  );
}

// ── Main component ───────────────────────────────────────────

interface CommunitySiteContentProps {
  site: LearningSite;
  fourReturns: FourReturnsMetrics | null;
}

export default function CommunitySiteContent({
  site,
  fourReturns,
}: CommunitySiteContentProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="10%" left="-5%" opacity={0.1} size={1000} />
        <ScrollGlow top="50%" right="-5%" color="var(--color-viridian)" opacity={0.08} size={1200} />

        {/* Community context meta bar */}
        <CommunityMetaBar site={site} />

        {/* Section 1: Header + Hero */}
        <SiteHero site={site} />

        {/* Section 2: Challenges */}
        <SiteChallenges site={site} />

        {/* Section 3: Projects & Initiatives */}
        <SiteProjects site={site} />

        {/* Section 4: Restoration Strategies */}
        <SiteRestorationStrategies site={site} />

        {/* Section 5: 4 Returns Metrics */}
        <div className="max-w-[1600px] mx-auto px-6">
          <FourReturnsDisplay
            metrics={fourReturns}
            showPending={fourReturns === null}
          />
        </div>

        {/* Section 6: Future Goals */}
        <FutureGoals site={site} />

        {/* Section 7: Image Gallery (WCAG 2.1 AA — keyboard accessible) */}
        <AccessibleGallerySection site={site} />

        {/* Section 8: Testimonial */}
        <SiteTestimonial site={site} />

        {/* Section 9: Contact + Featured Site + Explore Others */}
        <ExploreOtherSites site={site} />
        <SiteContact site={site} />
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
