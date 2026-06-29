'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LearningSite } from '@/types/learning-site';
import Image from 'next/image';

export function SiteTestimonial({ site }: { site: LearningSite }) {
  if (!site.testimonial) return null;
  const { quote, authorName, authorPosition, authorAvatar } = site.testimonial;

  return (
    <section className="py-32 px-6 bg-band text-band-foreground">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-[960px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              aria-hidden="true"
              className="block font-serif text-[120px] md:text-[180px] leading-none text-band-accent/20
                         select-none mb-[-2rem]"
            >
              &ldquo;
            </span>

            <blockquote className="font-serif italic text-3xl md:text-5xl leading-snug text-band-foreground mb-12">
              {quote}
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            {authorAvatar && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-band-accent/30">
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <div className="text-left">
              <div className="text-sm font-sans font-semibold tracking-widest uppercase text-band-foreground">
                {authorName}
              </div>
              {authorPosition && (
                <div className="text-xs font-mono text-band-foreground/50 mt-0.5">
                  {authorPosition}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
