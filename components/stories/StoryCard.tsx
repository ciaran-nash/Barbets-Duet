'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Story } from '@/types/narrative';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.slug}`}>
        <motion.div 
          className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-border/30 hover:border-brand/50 transition-all duration-700 cursor-pointer shadow-2xl"
        >
          <Image 
            src={story.image} 
            alt={story.title} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent opacity-80" />
          
          <div className="absolute inset-x-0 bottom-0 p-12 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-brand text-forest rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                    {story.category}
                </span>
                <div className="flex items-center gap-2 text-platinum/60 text-[10px] font-mono uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> {story.readTime} Read
                </div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-platinum leading-tight mb-4 group-hover:text-brand transition-colors">
                {story.title}
            </h3>
            
            <p className="text-platinum/70 text-lg font-serif italic line-clamp-2 mb-8 max-w-xl group-hover:text-platinum transition-colors">
                {story.excerpt}
            </p>
            
            <div className="flex items-center gap-2 text-brand font-mono text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                Enter Narrative <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
    </Link>
  );
}
