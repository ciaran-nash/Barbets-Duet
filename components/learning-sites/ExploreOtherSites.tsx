'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { learningSites } from '@/lib/data/learning-sites';

export function ExploreOtherSites({ site }: { site: LearningSite }) {
  if (!site.relatedSitesSlugs?.length) return null;

  const relatedSites = site.relatedSitesSlugs
    .map(slug => learningSites.find(s => s.slug === slug))
    .filter((s): s is LearningSite => s !== undefined);

  if (!relatedSites.length) return null;

  return (
    <section className="py-32 px-6 bg-background text-foreground">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <KineticReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4 block">
              Jumuiya Network
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter">
              Explore<br />Other Sites
            </h2>
          </KineticReveal>

          <Link
            href="/learning-sites"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em]
                       text-accent border-b border-accent/40 pb-1 hover:opacity-70 transition-opacity"
          >
            All 13 sites <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedSites.map((relatedSite, i) => (
            <motion.div
              key={relatedSite.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/learning-sites/${relatedSite.slug}`}
                className="group block border border-foreground/10 rounded-2xl overflow-hidden
                           hover:border-accent/40 transition-colors duration-300"
              >
                <div className="p-8">
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent block mb-3">
                    {relatedSite.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold leading-tight mb-2 group-hover:text-accent transition-colors">
                    {relatedSite.name}
                  </h3>
                  <p className="text-sm font-sans text-foreground/50 mb-6">
                    {relatedSite.location}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]
                                  text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit site <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
