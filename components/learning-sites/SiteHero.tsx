'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import Image from 'next/image';

export function SiteHero({ site }: { site: LearningSite }) {
  return (
    <section className="pt-48 pb-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-end mb-24">
          <div className="lg:col-span-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
              Learning Site Profile — {site.location}
            </span>
            <KineticReveal>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-8">
                {site.name}
              </h1>
            </KineticReveal>
          </div>
          
          <div className="lg:col-span-4 border-l border-border pl-12 pb-4">
            <div className="space-y-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Founded</div>
                <div className="text-xl font-serif font-bold">{site.founded}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Category</div>
                <div className="text-xl font-serif font-bold">{site.category}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Lead Partners</div>
                <div className="text-xl font-serif font-bold">{site.leadPartners.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-9 relative aspect-[21/9] rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-forest/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <Image 
                src={site.heroImage} 
                alt={site.name} 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
          <div className="lg:col-span-3 relative aspect-square rounded-3xl overflow-hidden hidden lg:block">
            {site.accentImage && (
                <Image 
                    src={site.accentImage} 
                    alt="Detail" 
                    fill 
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
