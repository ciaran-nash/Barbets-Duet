'use client';

import React from 'react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import Image from 'next/image';

export function SiteChallenges({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6 bg-card/5 border-y border-border/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-brand mb-6 block">The Site Challenges</span>
            <KineticReveal>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-12">
                {site.challenges.title}
              </h2>
            </KineticReveal>
            <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed italic">
              {site.challenges.description}
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl">
              <Image 
                src={site.challenges.image} 
                alt="Environmental Challenge" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
