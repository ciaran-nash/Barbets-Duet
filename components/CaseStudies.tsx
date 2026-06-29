'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SaveButton from './SaveButton';

const cases = [
  {
    id: "case-msichoke-01",
    location: "Mlingotini, Tanzania",
    title: "Seaweed Farming to Soap Production",
    category: "Enterprise Stacking",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    index: "CS-01"
  },
  {
    id: "case-woodland-valley-01",
    location: "Cornwall, UK",
    title: "353 Tons of Carbon — Farming as Sequestration",
    category: "Market Mechanism",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800",
    index: "CS-02"
  },
  {
    id: "case-hannacroix-01",
    location: "New York, USA",
    title: "Beavers Return to the Hudson River",
    category: "Ecosystem Rewards",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    index: "CS-03"
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-32 px-6 bg-band text-band-foreground border-t border-band-border relative overflow-hidden">
      {/* Background diagram */}
      <div className="absolute opacity-5 pointer-events-none -right-64 -top-64">
        <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.1">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="30" />
          <path d="M 50 2 L 50 98" />
          <path d="M 2 50 L 98 50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="eyebrow border border-band-accent/30 text-band-accent mb-6">Case Studies</span>
            <h3 className="font-serif text-4xl lg:text-7xl font-light leading-none [text-wrap:balance]">
              Scholarly <br />
              <span className="italic text-band-foreground/50">Observations</span>.
            </h3>
          </div>
          <Link href="/case-studies" className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase font-semibold pb-2 border-b border-band-accent/50 hover:border-band-accent text-band-accent transition-colors duration-500 self-start md:self-end">
            [ Read Full Ledger ] <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {cases.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-none border border-band-border mb-6">
                <div className="absolute inset-0 bg-bark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0 [will-change:filter]"
                />
                <div className="absolute top-4 left-4 z-20 bg-bark/80 backdrop-blur-md px-3 py-1.5 border border-cream/20">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-cream shadow-sm">
                    {study.location}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <SaveButton eventId={study.id} title={study.title} date={study.location} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-mono text-xs text-band-accent">
                  [{study.index}]
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-band-foreground/50 mb-2">{study.category}</p>
                  <h4 className="font-serif text-2xl font-light leading-snug [text-wrap:balance]">{study.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
