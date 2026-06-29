'use client';

import { motion } from 'motion/react';
import EarthGlobe from './EarthGlobe';

export default function Network() {
  return (
    <section id="network" className="py-32 bg-band text-band-foreground relative overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h3 className="font-serif text-4xl lg:text-5xl font-light leading-tight mb-16 max-w-3xl [text-wrap:balance]">
          Originating in East Africa, our footprint is expanding into a <span className="italic font-medium">global network</span> of learning sites.
        </h3>
      </div>

      <div className="w-full mb-20 relative bg-band">
        <EarthGlobe />
      </div>

      <div className="w-full border-t border-band-border/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-band-border/10">
          {[
            { value: "5", label: "Active Sites" },
            { value: "4", label: "Countries" },
            { value: "9", label: "Conventions Held" },
            { value: "2006", label: "Year Founded" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center px-8 py-12 text-center"
            >
              <span className="font-serif text-5xl md:text-6xl font-light text-band-foreground mb-2">{stat.value}</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-band-foreground/50">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
