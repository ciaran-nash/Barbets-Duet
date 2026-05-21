'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { Activity } from 'lucide-react';

export function HubHero() {
  return (
    <section className="pt-48 pb-32 px-6 border-b border-border/50">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-8">
            <div className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Live Innovation Lab — Active Status</span>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8">
            <KineticReveal>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter">
                Innovation <br /> Hub
              </h1>
            </KineticReveal>
          </div>
          
          <div className="lg:col-span-4 max-w-sm ml-auto">
            <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed italic border-l-2 border-brand pl-8 py-2">
                A centralized directory of regional inventions, economic strategies, and ecological experiments from across the global Barbets network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
