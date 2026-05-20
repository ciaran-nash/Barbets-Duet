'use client';

import React from 'react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { LearningSite } from '@/types/learning-site';
import { SiteHero } from '@/components/learning-sites/SiteHero';
import { SiteChallenges } from '@/components/learning-sites/SiteChallenges';
import { SiteProjects } from '@/components/learning-sites/SiteProjects';
import { MarketInventions } from '@/components/learning-sites/MarketInventions';
import { ImpactGrid } from '@/components/learning-sites/ImpactGrid';
import { FutureGoals } from '@/components/learning-sites/FutureGoals';
import { SiteGallery } from '@/components/learning-sites/SiteGallery';
import { SiteRestorationStrategies } from '@/components/learning-sites/SiteRestorationStrategies';
import { SiteTestimonial } from '@/components/learning-sites/SiteTestimonial';
import { ExploreOtherSites } from '@/components/learning-sites/ExploreOtherSites';
import { SiteContact } from '@/components/learning-sites/SiteContact';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export default function LearningSiteContent({ site }: { site: LearningSite }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="relative">
        <ScrollGlow top="10%" left="-5%" opacity={0.1} size={1000} />
        <ScrollGlow top="50%" right="-5%" color="var(--brand)" opacity={0.08} size={1200} />

        <SiteHero site={site} />
        
        <SiteChallenges site={site} />
        
        <SiteProjects site={site} />
        
        <MarketInventions site={site} />

        <SiteRestorationStrategies site={site} />

        <ImpactGrid site={site} />

        <FutureGoals site={site} />

        <SiteGallery site={site} />

        <SiteTestimonial site={site} />

        <ExploreOtherSites site={site} />

        <SiteContact site={site} />
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
