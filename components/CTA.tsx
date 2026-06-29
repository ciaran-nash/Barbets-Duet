'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="get-involved" className="bg-band text-band-foreground pt-32 pb-32 px-6 border-t border-band-border/10 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,244,245,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,244,245,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem]"></div>

      {/* Atmospheric glow — tinted to palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(219,255,102,0.04)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-foreground/40 mb-12 border border-band-border/10 px-6 py-2 rounded-full">
            [ Next steps ]
          </div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 45 }}
            className="w-24 h-24 rounded-full border border-band-border/20 flex items-center justify-center mx-auto mb-12 cursor-pointer hover:bg-band-foreground hover:text-band transition-all duration-700 ease-[0.16,1,0.3,1]"
          >
            <ArrowUpRight size={32} strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-serif text-5xl md:text-8xl font-light mb-12 leading-[0.9] tracking-tight">
            <span className="italic text-band-foreground/40">Join the</span><br />Collective
          </h2>

          <p className="max-w-xl mx-auto text-band-foreground/60 leading-relaxed text-base font-sans mb-16">
            Whether you are a researcher, community organiser, or funder, join us in building systems that reward ecological restoration and local innovation.
          </p>

          <Button asChild size="lg" className="rounded-none bg-band-foreground text-band hover:bg-band-foreground/90 font-mono text-[11px] uppercase tracking-[0.2em] px-12 h-14 transition-all duration-500 font-bold group active:scale-[0.98]">
             <Link href="/get-involved" className="flex items-center">
               [ Get involved ]
               <motion.span
                 animate={shouldReduceMotion ? {} : { x: [0, 5, 0] }}
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
