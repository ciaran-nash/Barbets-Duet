'use client';

import React from 'react';
import { motion } from 'motion/react';

const categories = ['All', 'Mariculture', 'Agroforestry', 'Urban', 'Bio-Materials'];

interface Props {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProjectFilters({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-border/30 pb-8">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mr-8">Filter by Ecosystem</span>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`px-6 py-2 rounded-full text-sm font-serif transition-all duration-300 relative group ${
              activeFilter === cat 
                ? 'text-forest font-bold' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {activeFilter === cat && (
              <motion.div 
                layoutId="filter-pill"
                className="absolute inset-0 bg-brand rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
