'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Story } from '@/types/narrative';
import Image from 'next/image';
import Link from 'next/link';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { learningSites } from '@/lib/data/learning-sites';

export default function CinematicReader({ story }: { story: Story }) {
  const associatedSite = story.siteSlug
    ? learningSites.find(s => s.slug === story.siteSlug)
    : null;

  return (
    <article className="min-h-screen bg-night-forest text-platinum">
      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-forest/80 via-transparent to-night-forest" />

        <div className="relative z-10 max-w-[1200px] mx-auto text-center w-full">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
                       text-accent mb-12 hover:opacity-70 transition-opacity"
          >
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
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {story.readTime} Read
            </div>
            <div>{story.date}</div>
            <div className="px-3 py-1 border border-accent/30 rounded-full text-accent">
              {story.category}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Site backlink */}
              {associatedSite && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-12"
                >
                  <Link
                    href={`/learning-sites/${associatedSite.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
                               text-accent hover:opacity-70 transition-opacity border-b border-accent/30 pb-1"
                  >
                    <ArrowRight className="w-3 h-3" />
                    From: {associatedSite.name} Learning Site
                  </Link>
                </motion.div>
              )}

              {/* Excerpt pull-quote */}
              <p className="text-3xl font-serif leading-relaxed italic text-neon-lime/80 mb-16">
                {story.excerpt}
              </p>

              {/* Impact metrics callout (inline in body) */}
              {story.impactMetrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 my-16 p-8
                             border border-accent/20 rounded-2xl"
                >
                  {story.impactMetrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl font-serif font-bold text-accent">
                        {metric.value}
                        {metric.unit && (
                          <span className="text-sm font-normal opacity-60 ml-1">{metric.unit}</span>
                        )}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-widest text-platinum/50 mt-2">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Markdown content */}
              <div
                className="prose prose-invert max-w-none
                           prose-headings:font-serif prose-headings:text-platinum prose-headings:font-bold prose-headings:leading-tight
                           prose-h2:text-4xl prose-h3:text-2xl
                           prose-p:font-sans prose-p:text-platinum/80 prose-p:text-lg prose-p:leading-relaxed
                           prose-strong:text-accent prose-strong:font-semibold
                           prose-em:text-platinum/70 prose-em:italic
                           prose-a:text-accent prose-a:no-underline hover:prose-a:opacity-70
                           prose-ul:text-platinum/70 prose-ol:text-platinum/70
                           prose-li:font-sans prose-li:text-base
                           prose-blockquote:border-l-accent prose-blockquote:text-platinum/60 prose-blockquote:italic prose-blockquote:font-serif"
              >
                {typeof story.content === 'string' ? (
                  <ReactMarkdown>{story.content}</ReactMarkdown>
                ) : (
                  // PortableTextBlock[] — render plain text fallback until
                  // @portabletext/react is wired up for CMS-sourced stories
                  <p className="text-platinum/80 font-sans text-lg leading-relaxed italic">
                    {story.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Verified impact sidebar */}
                {story.impactMetrics.length > 0 && (
                  <div className="p-8 bg-platinum/5 rounded-2xl border border-platinum/10">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-8">
                      Verified Impact
                    </h4>
                    <div className="space-y-8">
                      {story.impactMetrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-[10px] font-mono uppercase text-platinum/40 mb-1">
                            {m.label}
                          </div>
                          <div className="text-4xl font-serif font-bold text-platinum">
                            {m.value}
                            {m.unit && (
                              <span className="text-sm font-normal opacity-50 ml-1">{m.unit}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Site origin sidebar */}
                {associatedSite && (
                  <div className="p-8 border border-platinum/10 rounded-2xl">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-platinum/40 mb-4">
                      Origin Site
                    </h4>
                    <Link
                      href={`/learning-sites/${associatedSite.slug}`}
                      className="group block"
                    >
                      <div className="text-xl font-serif font-bold group-hover:text-accent transition-colors">
                        {associatedSite.name}
                      </div>
                      <div className="text-xs font-sans text-platinum/50 mt-1">
                        {associatedSite.location}
                      </div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest
                                      text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Visit site <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Meta */}
                <div className="p-8 border border-platinum/10 rounded-2xl space-y-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-platinum/40 mb-1">Category</div>
                    <div className="text-sm font-sans text-platinum">{story.category}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-platinum/40 mb-1">Published</div>
                    <div className="text-sm font-sans text-platinum">{story.date}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-platinum/40 mb-1">Read Time</div>
                    <div className="text-sm font-sans text-platinum">{story.readTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
