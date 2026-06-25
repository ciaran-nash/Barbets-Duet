'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LearningSite } from '@/types/learning-site';
import { ImpactPoint } from '@/types/shared';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';

export function ImpactGrid({ site }: { site: LearningSite }) {
  return (
    <section className="py-48 px-6 relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand mb-6 block">Ecological & Community Impact Data</span>
                <KineticReveal>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold">Measuring Transformation</h2>
                </KineticReveal>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest opacity-40">
                <Info className="w-4 h-4" /> Updated Quarterly
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-border/50 border border-border/50 overflow-hidden rounded-[3rem]">
            {/* Ecological Stats */}
            <div className="bg-background p-16 md:p-24 space-y-16">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Ecological Resilience</h3>
                </div>
                
                <div className="space-y-12">
                    {site.impactData.ecological.map((stat, idx) => (
                        <StatItem key={idx} stat={stat} />
                    ))}
                </div>
            </div>

            {/* Community Stats */}
            <div className="bg-card/5 p-16 md:p-24 space-y-16">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Community Empowerment</h3>
                </div>

                <div className="space-y-12">
                    {site.impactData.community.map((stat, idx) => (
                        <StatItem key={idx} stat={stat} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: ImpactPoint }) {
    return (
        <div className="group">
            <div className="flex items-baseline gap-4 mb-4">
                <div className="text-6xl md:text-8xl font-serif font-bold tracking-tighter group-hover:text-brand transition-colors duration-500">
                    {stat.value}
                </div>
                {stat.trend === 'up' && (
                    <ArrowUpRight className="w-8 h-8 text-brand animate-pulse" />
                )}
            </div>
            <div>
                <div className="text-sm font-mono uppercase tracking-widest mb-2 font-bold">{stat.label}</div>
                <p className="text-muted-foreground font-serif text-lg opacity-60 group-hover:opacity-100 transition-opacity italic">
                    {stat.description}
                </p>
            </div>
        </div>
    );
}
