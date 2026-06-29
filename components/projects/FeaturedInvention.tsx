'use client';

import React from 'react';
import { motion } from 'motion/react';
import { KineticReveal } from '@/components/motion/KineticReveal';
import Image from 'next/image';
import { Lightbulb, ArrowRight } from 'lucide-react';

export function FeaturedInvention() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-forest text-band-foreground rounded-[3.5rem] overflow-hidden grid lg:grid-cols-12 items-stretch relative group">
          <div className="lg:col-span-7 p-12 md:p-24 relative z-10 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Monthly Invention Convention Highlight</span>
            </div>
            
            <KineticReveal>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
                The Mycelium <br /> Packaging Protocol
              </h2>
            </KineticReveal>
            
            <p className="text-xl md:text-2xl text-band-foreground/70 font-serif leading-relaxed mb-12 italic max-w-xl">
                A localized manufacturing system using agricultural waste and native fungal strains to replace petroleum-based shipping materials.
            </p>
            
            <div className="flex items-center gap-6">
                <button className="bg-accent text-forest px-10 py-5 rounded-full font-serif font-bold hover:bg-band-foreground transition-colors flex items-center gap-3 group/btn">
                    Read the Research Paper <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </button>
                <div className="text-[10px] font-mono uppercase tracking-widest text-band-foreground/40">Status: Systemic Scaling</div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative min-h-[500px] lg:min-h-full overflow-hidden">
            <Image 
                src="https://images.unsplash.com/photo-1599059021750-8de994966601?q=80&w=2075&auto=format&fit=crop" 
                alt="Mycelium Innovation" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
