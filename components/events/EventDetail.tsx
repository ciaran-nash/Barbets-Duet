'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Clock, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { BarbetsEvent } from '@/types/narrative';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { learningSites } from '@/lib/data/learning-sites';

const statusConfig = {
  'Open': {
    label: 'Registration Open',
    className: 'bg-accent text-accent-foreground',
    buttonClassName: 'bg-accent text-accent-foreground hover:bg-accent/90',
    buttonLabel: 'Register Now',
  },
  'Waitlist': {
    label: 'Join Waitlist',
    className: 'bg-amber-500 text-bark',
    buttonClassName: 'bg-amber-500 text-bark hover:bg-amber-400',
    buttonLabel: 'Join Waitlist',
  },
  'Closed': {
    label: 'Registration Closed',
    className: 'bg-foreground/40 text-foreground/40',
    buttonClassName: 'bg-foreground/10 text-foreground/30 cursor-not-allowed',
    buttonLabel: 'Registrations Closed',
  },
} as const;

interface Props {
  event: BarbetsEvent;
}

export default function EventDetail({ event }: Props) {
  const site = event.siteSlug
    ? learningSites.find(s => s.slug === event.siteSlug)
    : null;

  const status = statusConfig[event.registrationStatus];

  return (
    <article className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end p-6 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <div className="relative z-10 max-w-[1600px] mx-auto w-full pb-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
                       text-accent mb-10 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-[800px]">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4 block">
                {event.type}
              </span>
              <KineticReveal>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.88] tracking-tighter">
                  {event.title}
                </h1>
              </KineticReveal>
            </div>

            <span
              className={`px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold shrink-0
                          ${status.className}`}
            >
              {status.label}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-24 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main */}
            <div className="lg:col-span-7">
              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap gap-8 mb-12 pb-12 border-b border-foreground/10"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Date</div>
                    <div className="text-sm font-sans font-medium">{event.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Time</div>
                    <div className="text-sm font-sans font-medium">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Location</div>
                    <div className="text-sm font-sans font-medium">{event.location}</div>
                  </div>
                </div>
              </motion.div>

              {/* Associated learning site */}
              {site && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-10"
                >
                  <Link
                    href={`/learning-sites/${site.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
                               text-accent hover:opacity-70 transition-opacity border-b border-accent/30 pb-1"
                  >
                    <ArrowRight className="w-3 h-3" />
                    Hosted at: {site.name}
                  </Link>
                </motion.div>
              )}

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-xl font-sans leading-relaxed text-foreground/80"
              >
                {event.description}
              </motion.p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <div className="p-10 border border-foreground/10 rounded-2xl space-y-8">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 block mb-2">
                      Registration Status
                    </span>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* CTA button */}
                  {event.registrationStatus !== 'Closed' && event.link ? (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-full
                                  font-sans font-semibold text-sm transition-all duration-200
                                  active:scale-[0.98] ${status.buttonClassName}`}
                    >
                      {status.buttonLabel}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href="/get-involved"
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-full
                                  font-sans font-semibold text-sm transition-all duration-200
                                  active:scale-[0.98]
                                  ${event.registrationStatus === 'Closed'
                                    ? status.buttonClassName
                                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                                  }`}
                    >
                      {event.registrationStatus === 'Closed' ? status.buttonLabel : status.buttonLabel}
                      {event.registrationStatus !== 'Closed' && <ArrowRight className="w-4 h-4" />}
                    </Link>
                  )}

                  {/* Site link in sidebar */}
                  {site && (
                    <div className="pt-6 border-t border-foreground/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/40 block mb-3">
                        Hosted At
                      </span>
                      <Link
                        href={`/learning-sites/${site.slug}`}
                        className="group block"
                      >
                        <div className="text-base font-serif font-bold group-hover:text-accent transition-colors">
                          {site.name}
                        </div>
                        <div className="text-xs font-sans text-foreground/50 mt-0.5">
                          {site.location}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest
                                        text-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          View site <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
