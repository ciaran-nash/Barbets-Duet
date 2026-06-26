import React from 'react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { StoryCard } from '@/components/stories/StoryCard';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { stories as staticStories } from '@/lib/data/stories';
import { getAllStoriesFromSanity } from '@/lib/sanity/queries';

export default async function StoriesPage() {
  const sanityStories = await getAllStoriesFromSanity();
  const stories = sanityStories.length > 0 ? sanityStories : staticStories;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />
        <ScrollGlow top="60%" left="-10%" color="var(--brand)" opacity={0.1} size={1500} />

        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
            <div className="max-w-[1600px] mx-auto text-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                    The Barbets Archive
                </span>
                <KineticReveal>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                        Impact <br /> Stories
                    </h1>
                </KineticReveal>
                <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-3xl mx-auto leading-relaxed">
                    Cinematic deep-dives into the systemic shifts occurring across our global learning network.
                </p>
            </div>
        </section>

        {/* Stories Grid */}
        <section className="pb-48 px-6">
            <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-12">
                {stories.map((story) => (
                    <StoryCard key={story.slug} story={story} />
                ))}
            </div>
        </section>
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
