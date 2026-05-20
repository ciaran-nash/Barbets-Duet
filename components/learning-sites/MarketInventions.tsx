'use client';

import React from 'react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { Target, Lightbulb, Box } from 'lucide-react';

export function MarketInventions({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6 bg-forest text-platinum rounded-[4rem] mx-6 mb-48 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grid-background" />
      
      <div className="max-w-[1200px] mx-auto relative z-10 text-center">
        <span className="text-[10px] font-mono tracking-widest uppercase text-accent mb-8 block">Invention Convention Outcomes</span>
        <KineticReveal>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">Site-specific Market <br /> Invention Strategies</h2>
        </KineticReveal>
        <p className="text-xl text-platinum/70 font-serif max-w-2xl mx-auto mb-24 leading-relaxed italic">
            {site.marketStrategies.description}
        </p>

        <div className="grid md:grid-cols-3 gap-12 text-left">
            {site.marketStrategies.strategies.map((strategy, idx) => (
                <div key={idx} className="p-8 border border-platinum/10 rounded-3xl bg-platinum/5 backdrop-blur-sm hover:bg-platinum/10 transition-all group">
                    <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                        <Target className="w-6 h-6 text-accent group-hover:text-forest" />
                    </div>
                    <p className="text-lg font-serif font-bold leading-snug group-hover:text-accent transition-colors">
                        {strategy}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
