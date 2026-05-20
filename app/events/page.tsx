'use client';

import React from 'react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { EventCard } from '@/components/events/EventCard';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { events } from '@/lib/data/events';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />
        <ScrollGlow top="40%" left="-10%" color="var(--brand)" opacity={0.1} size={1500} />

        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
            <div className="max-w-[1600px] mx-auto">
                <div className="max-w-4xl">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                        Network Engagements
                    </span>
                    <KineticReveal>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                            Conventions <br /> & Labs
                        </h1>
                    </KineticReveal>
                    <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed">
                        Join the restoration front. Find upcoming summits, invention conventions, and community workshops.
                    </p>
                </div>
            </div>
        </section>

        {/* Events Grid */}
        <section className="pb-48 px-6">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-12">
                {events.map((event) => (
                    <EventCard key={event.slug} event={event} />
                ))}
            </div>
        </section>
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
