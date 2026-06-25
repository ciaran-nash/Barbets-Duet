'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LearningSite } from '@/types/learning-site';
import { KineticReveal } from '@/components/motion/KineticReveal';
import Image from 'next/image';

export function SiteRestorationStrategies({ site }: { site: LearningSite }) {
  if (!site.restorationStrategies) return null;
  const { description, tags, image } = site.restorationStrategies;
  if (!description && !tags?.length) return null;

  return (
    <section className="py-32 px-6 bg-platinum text-night-forest">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <KineticReveal>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-viridian mb-6 block">
                Ecological Methods
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter mb-8">
                How We Work<br />With Nature
              </h2>
            </KineticReveal>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg font-sans leading-relaxed text-night-forest/80 max-w-[580px]"
              >
                {description}
              </motion.p>
            )}

            {tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 mt-10"
              >
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-4 py-2 border border-night-forest/20 rounded-full
                               text-night-forest/70 hover:border-viridian hover:text-viridian transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src={image}
                alt={`${site.name} restoration strategies`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          )}

          {!image && (
            <div className="lg:col-span-5">
              <div className="p-10 border border-night-forest/10 rounded-2xl bg-night-forest/5">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-viridian block mb-4">
                  Restoration Approach
                </span>
                <p className="text-sm font-sans text-night-forest/60 leading-relaxed">
                  This site uses evidence-based ecological restoration informed by 20+ years of Barbets Duet network learning.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
