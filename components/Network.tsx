'use client';

import { motion } from 'motion/react';
import EarthGlobe from './EarthGlobe';

export default function Network() {
  return (
    <section id="network" className="py-32 bg-night-forest text-platinum relative overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-sm font-semibold tracking-widest uppercase mb-6 text-platinum/50">
          Global Expansion
        </h2>
        <h3 className="font-serif text-4xl lg:text-5xl font-light leading-tight mb-16 max-w-3xl">
          Originating in East Africa, our footprint is expanding into a <span className="italic font-medium">global network</span> of learning sites.
        </h3>
      </div>

      <div className="w-full mb-20 relative bg-night-forest">
        <EarthGlobe />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-platinum/10 pt-16 w-full">
          {[
            { value: "14", label: "Active Sites" },
            { value: "6", label: "Countries" },
            { value: "2M+", label: "Hectares Protected" },
            { value: "85K", label: "Community Members" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-5xl md:text-6xl font-light mb-2 text-platinum">{stat.value}</div>
              <div className="text-[10px] tracking-widest uppercase opacity-60 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
