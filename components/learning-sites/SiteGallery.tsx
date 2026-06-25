'use client';

import React from 'react';
import { LearningSite } from '@/types/learning-site';
import { motion } from 'motion/react';
import Image from 'next/image';

export function SiteGallery({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Image Gallery</h2>
            <p className="text-muted-foreground font-serif text-lg opacity-60">Snapshots of systemic restoration in action.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {site.gallery.map((image, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 aspect-[3/4] ${
                        idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                >
                    <Image 
                        src={image} 
                        alt={`Gallery ${idx}`} 
                        fill 
                        className="object-cover hover:scale-110 transition-transform duration-1000"
                    />
                </motion.div>
            ))}
            
            {/* Placeholders if gallery is small */}
            {site.gallery.length < 4 && Array.from({ length: 4 - site.gallery.length }).map((_, i) => (
                <div key={`placeholder-${i}`} className="bg-muted/10 rounded-2xl aspect-[3/4] flex items-center justify-center border border-border/20">
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-20 italic">Visual Record Pending</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
