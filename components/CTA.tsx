'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section id="get-involved" className="bg-[#0B0F19] text-[#F4F4F0] pt-32 pb-32 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C7F16C] mb-8 border border-[#C7F16C]/20 px-4 py-1">
            [ NEXT STEPS ]
          </div>
          <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-white hover:text-[#0B0F19] transition-colors duration-500">
            <ArrowUpRight size={32} />
          </div>
          <h2 className="font-serif text-5xl md:text-8xl font-light mb-8">
            <span className="italic text-white/60">Join the</span> Collective
          </h2>
          <p className="max-w-xl mx-auto text-[#F4F4F0]/70 leading-relaxed text-base font-sans mb-12">
            Whether you are a researcher, community organizer, or funder, join us in building systems that reward ecological restoration.
          </p>
          
          <Button asChild size="lg" className="rounded-none bg-[#C7F16C] text-[#0B0F19] hover:bg-[#D9F99D] font-mono text-[10px] uppercase tracking-widest px-8 h-12 transition-all duration-300 font-bold border border-[#0B0F19]/20">
             <Link href="#contact">
               [ Initiate Contact ]
               <ArrowRight className="ml-3 w-4 h-4" />
             </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
