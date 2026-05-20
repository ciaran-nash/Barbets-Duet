'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Story } from '@/types/narrative';
import Image from 'next/image';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CinematicReader({ story }: { story: Story }) {
  return (
    <article className="min-h-screen bg-forest text-platinum">
        <section className="relative h-screen w-full flex items-center justify-center p-6 overflow-hidden">
            <Image 
                src={story.image} 
                alt={story.title} 
                fill 
                className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-transparent to-forest" />
            
            <div className="relative z-10 max-w-[1200px] text-center">
                <Link href="/stories" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-12 hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-4 h-4" /> Back to Archive
                </Link>
                
                <KineticReveal>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-8">
                        {story.title}
                    </h1>
                </KineticReveal>
                
                <p className="text-2xl md:text-4xl font-serif italic text-platinum/80 mb-12">
                    {story.subtitle}
                </p>
                
                <div className="flex justify-center items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-platinum/50">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {story.readTime} Read</div>
                    <div>{story.date}</div>
                </div>
            </div>
        </section>

        <section className="py-32 px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <p className="text-3xl font-serif leading-relaxed italic text-brand mb-16">
                            {story.excerpt}
                        </p>
                        
                        <div className="prose prose-invert prose-2xl font-serif text-platinum/70 leading-relaxed space-y-12">
                            {story.content}
                            <p>This is where the long-form narrative would be dynamically rendered from our CMS or data layer. It supports pull-quotes, high-fidelity image breaks, and technical sidebars.</p>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-12">
                            <div className="p-10 bg-platinum/5 rounded-[2.5rem] border border-platinum/10">
                                <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-8">Verified Impact</h4>
                                <div className="space-y-10">
                                    {story.impactMetrics.map((m, i) => (
                                        <div key={i}>
                                            <div className="text-[10px] font-mono uppercase text-platinum/40 mb-2">{m.label}</div>
                                            <div className="text-4xl font-serif font-bold text-platinum">
                                                {m.value} <span className="text-sm font-normal opacity-50">{m.unit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {story.siteSlug && (
                                <div className="p-10 border border-platinum/10 rounded-[2.5rem]">
                                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-platinum/40 mb-4">Origin Site</h4>
                                    <div className="text-xl font-serif font-bold">{story.siteSlug}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </article>
  );
}
