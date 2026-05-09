'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="our-mission" className="py-32 px-6 bg-[#F4F4F0] text-[#111111] relative overflow-hidden text-center md:text-left">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#111111]/10 hidden md:block -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-sm mx-auto md:max-w-none group"
        >
          <div className="relative aspect-[3/4] rounded-none overflow-hidden border border-[#111111]/10 shadow-lg bg-gray-200">
            <Image 
              src="https://picsum.photos/seed/community/800/800" 
              alt="Community working in nature" 
              fill
              referrerPolicy="no-referrer"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-[#0B0F19]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-white/90 backdrop-blur-sm px-2 py-1 text-[#111111] border border-[#111111]/10 z-20">
              FIG 3.1
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full overflow-hidden border-8 border-[#F4F4F0] hidden md:block z-30 bg-gray-300">
            <Image 
              src="https://picsum.photos/seed/bird/400/400" 
              alt="Bird in nature" 
              fill
              referrerPolicy="no-referrer"
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-mono text-[10px] uppercase mb-6 text-[#111111]/50 tracking-[0.2em] flex items-center md:justify-start justify-center gap-4">
            <span className="w-8 h-[1px] bg-[#111111]/30"></span>
            The Concept
          </h2>
          <h3 className="font-serif text-4xl lg:text-6xl font-light leading-tight mb-8 text-[#111111]">
            Like the harmonized calls of <span className="italic text-[#111111]/60">barbet birds</span>, we find balance.
          </h3>
          <div className="space-y-6 text-[#111111]/80 leading-relaxed text-sm md:text-base pb-8 border-b border-[#111111]/10 font-sans">
            <div>
              <p className="mb-2">
                The Barbets Duet Global Learning Sites are a network of real-world locations where people experiment with creating sustainable livelihoods.
              </p>
              <a href="#" className="inline-flex items-center text-[10px] font-mono text-[#C7F16C] bg-[#111111] px-3 py-1.5 hover:bg-[#C7F16C] hover:text-[#111111] transition-colors uppercase tracking-[0.2em] font-semibold border border-[#111111]">
                [ Read Theory ]
              </a>
            </div>
            <div>
              <p className="mb-2">
                Originating in East Africa, our focus is on developing new institutional rules to reward ecosystem protection, rather than just exploitation. We believe in &quot;working systems&quot; where people and nature thrive together.
              </p>
              <a href="#" className="inline-flex items-center text-[10px] font-mono text-[#C7F16C] bg-[#111111] px-3 py-1.5 hover:bg-[#C7F16C] hover:text-[#111111] transition-colors uppercase tracking-[0.2em] font-semibold border border-[#111111]">
                [ View Origins ]
              </a>
            </div>
          </div>
          
          <div className="pt-8">
             <button className="group flex items-center gap-3 text-sm tracking-[0.2em] font-mono uppercase text-[#111111] mx-auto md:mx-0">
                Explore the Archive
                <div className="w-10 h-10 rounded-full border border-[#111111]/20 group-hover:border-[#C7F16C] flex items-center justify-center transition-colors">
                  <ArrowUpRight size={16} className="text-[#111111] group-hover:text-[#C7F16C]" />
                </div>
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
