'use client';

import React from 'react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';

export function FutureGoals({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6 text-center bg-card/5">
      <div className="max-w-[1200px] mx-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-brand mb-8 block">Looking Forward</span>
        <KineticReveal>
            <h2 className="text-5xl md:text-8xl font-serif font-bold italic mb-12 italic">Future Goals</h2>
        </KineticReveal>
        <div className="h-px w-24 bg-brand mx-auto mb-16" />
        <p className="text-2xl md:text-4xl text-muted-foreground font-serif leading-relaxed max-w-4xl mx-auto italic">
            &ldquo;{site.futureGoals}&rdquo;
        </p>
      </div>
    </section>
  );
}
