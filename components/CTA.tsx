'use client';

import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section id="get-involved" className="bg-[#2C3E35] text-[#FAF9F6] pt-32 pb-32 px-6 border-t border-[#FAF9F6]/10 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF9F605_1px,transparent_1px),linear-gradient(to_bottom,#FAF9F605_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>
      
      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(250,249,246,0.03)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FAF9F6]/40 mb-12 border border-[#FAF9F6]/10 px-6 py-2 rounded-full">
            [ NEXT STEPS ]
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 45 }}
            className="w-24 h-24 rounded-full border border-[#FAF9F6]/20 flex items-center justify-center mx-auto mb-12 cursor-pointer hover:bg-[#FAF9F6] hover:text-[#2C3E35] transition-all duration-700 ease-[0.16,1,0.3,1]"
          >
            <ArrowUpRight size={32} strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-serif text-5xl md:text-8xl font-light mb-12 leading-[0.9] tracking-tight">
            <span className="italic text-[#FAF9F6]/40">Join the</span><br />Collective
          </h2>
          
          <p className="max-w-xl mx-auto text-[#FAF9F6]/60 leading-relaxed text-base font-sans mb-16">
            Whether you are a researcher, community organizer, or funder, join us in building systems that reward ecological restoration and local innovation.
          </p>
          
          <Button asChild size="lg" className="rounded-none bg-[#FAF9F6] text-[#2C3E35] hover:bg-[#FAF9F6]/90 font-mono text-[11px] uppercase tracking-[0.2em] px-12 h-14 transition-all duration-500 font-bold group">
             <Link href="#contact" className="flex items-center">
               [ Initiate Contact ]
               <motion.span
                 animate={{ x: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
               >
                 <ArrowRight className="ml-4 w-4 h-4" />
               </motion.span>
             </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

