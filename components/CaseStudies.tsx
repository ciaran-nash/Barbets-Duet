'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import SaveButton from './SaveButton';

const cases = [
  {
    id: "case-kenya-01",
    location: "Kenya",
    title: "Eco-tourism & Reforestation",
    category: "Community Enterprise",
    image: "https://picsum.photos/seed/kenya/800/800",
    index: "CS-01"
  },
  {
    id: "case-tanzania-01",
    location: "Tanzania",
    title: "Sustainable Agriculture Markets",
    category: "Market Mechanism",
    image: "https://picsum.photos/seed/tanzania/800/800",
    index: "CS-02"
  },
  {
    id: "case-uganda-01",
    location: "Uganda",
    title: "Wetland Protection Incentives",
    category: "Ecosystem Rewards",
    image: "https://picsum.photos/seed/uganda/800/800",
    index: "CS-03"
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-32 px-6 bg-[#0B0F19] text-white border-t border-white/10 relative overflow-hidden">
      {/* Background diagram */}
      <div className="absolute opacity-5 pointer-events-none -right-64 -top-64">
        <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.1">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="30" />
          <path d="M 50 2 L 50 98" />
          <path d="M 2 50 L 98 50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-[#C7F16C] flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#C7F16C]"></span>
              Case Studies
            </h2>
            <h3 className="font-serif text-4xl lg:text-7xl font-light leading-none">
              Scholarly <br />
              <span className="italic text-white/50">Observations</span>.
            </h3>
          </div>
          <button className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase font-semibold pb-2 border-b border-[#C7F16C]/50 hover:border-[#C7F16C] text-[#C7F16C] transition-colors self-start md:self-end">
            [ Read Full Ledger ] <ArrowRight size={14} />
          </button>
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
              <div className="relative aspect-[3/4] overflow-hidden rounded-none border border-white/10 mb-6">
                <div className="absolute inset-0 bg-[#0B0F19]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image 
                  src={study.image} 
                  alt={study.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 z-20 bg-[#0B0F19]/80 backdrop-blur-md px-3 py-1.5 border border-white/20">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white shadow-sm">
                    {study.location}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SaveButton eventId={study.id} title={study.title} date={study.location} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-mono text-xs text-[#C7F16C]">
                  [{study.index}]
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">{study.category}</p>
                  <h4 className="font-serif text-2xl font-light leading-snug">{study.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
