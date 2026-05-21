'use client';

import React from 'react';
import Image from 'next/image';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ArrowUpRight } from 'lucide-react';

export function SiteProjects({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-24 items-start mb-32">
            <div className="lg:col-span-5 relative aspect-[3/4] bg-muted/20 rounded-[3rem] overflow-hidden group border border-border/50">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 font-mono text-[10px] tracking-[0.5em] uppercase rotate-90">Project Showcase</div>
                {site.initiatives[0]?.image && (
                   <Image 
                     src={site.initiatives[0].image} 
                     alt={site.initiatives[0].title || 'Project initiative'}
                     fill
                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                     unoptimized
                   />
                )}
            </div>
            
            <div className="lg:col-span-7 pt-12">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand mb-6 block">Current Initiatives</span>
                <KineticReveal>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold italic mb-12">Projects & Initiatives</h2>
                </KineticReveal>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {site.initiatives.map((item, idx) => (
                        <div key={idx} className="p-10 border border-border/30 rounded-3xl hover:border-brand transition-all group bg-card/5">
                            <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand transition-colors flex items-center justify-between">
                                {item.title}
                                <ArrowUpRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-muted-foreground font-serif leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
