'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';

export function SiteContact({ site }: { site: LearningSite }) {
  if (!site.contact) return null;
  const { intro, buttonLabel, contactLink } = site.contact;

  return (
    <section className="py-32 px-6 bg-neon-lime text-night-forest">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-[800px]">
          <KineticReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-night-forest/50 mb-6 block">
              Get Involved
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter mb-8">
              Connect With<br />{site.name}
            </h2>
          </KineticReveal>

          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg font-sans leading-relaxed text-night-forest/70 mb-12 max-w-[560px]"
            >
              {intro}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: intro ? 0.35 : 0.2 }}
          >
            <Link
              href={contactLink}
              className="group inline-flex items-center gap-3 bg-night-forest text-neon-lime
                         font-sans font-semibold text-base px-8 py-4 rounded-full
                         hover:bg-night-forest/90 active:scale-[0.98] transition-all duration-200"
            >
              {buttonLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
