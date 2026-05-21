'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import Image from 'next/image';
import { ArrowUpRight, Gauge } from 'lucide-react';

export function ProjectCard({ 
    project,
    onClick
}: { 
    project: Project,
    onClick: () => void
}) {
  const maturityColors = {
    Idea: 'bg-platinum/50 text-forest',
    Pilot: 'bg-accent/20 text-accent',
    Scaling: 'bg-brand/20 text-brand',
    Systemic: 'bg-forest text-platinum'
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-card/5 border border-border/30 rounded-[2.5rem] overflow-hidden hover:border-brand/50 transition-all duration-700 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
        />
        <div className="absolute top-6 left-6 flex gap-2 z-10">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold backdrop-blur-md ${maturityColors[project.maturity]}`}>
                {project.maturity}
            </span>
            <span className="px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-forest/80 text-platinum backdrop-blur-md">
                {project.category}
            </span>
        </div>
      </div>

      <div className="p-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-serif font-bold leading-tight group-hover:text-brand transition-colors duration-500">
                {project.title}
            </h3>
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 group-hover:text-forest transition-colors" />
            </div>
        </div>

        <p className="text-muted-foreground font-serif text-lg leading-relaxed italic mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
            {project.description}
        </p>

        <div className="mt-auto pt-8 border-t border-border/30 grid grid-cols-2 gap-8">
            {project.impactMetrics.map((metric, i) => (
                <div key={i}>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{metric.label}</div>
                    <div className="text-2xl font-serif font-bold">
                        {metric.value} <span className="text-xs font-normal opacity-40">{metric.unit}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
