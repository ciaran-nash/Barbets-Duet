'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const steps = [
  {
    number: "FIG 2.1",
    title: "Market Mechanisms",
    description: "Developing economic structures that directly incentivize the preservation of ecosystems instead of resource extraction.",
    image: "https://picsum.photos/seed/market/800/800"
  },
  {
    number: "FIG 2.2",
    title: "Local Knowledge",
    description: "Centering indigenous and local practices to inform conservation strategies, ensuring solutions are culturally anchored.",
    image: "https://picsum.photos/seed/local/800/800"
  },
  {
    number: "FIG 2.3",
    title: "Modern Science",
    description: "Backing community-led initiatives with robust ecological data and modern conservation science methodologies.",
    image: "https://picsum.photos/seed/science/800/800"
  }
];

export default function Mechanism() {
  return (
    <section id="the-mechanism" className="py-32 px-6 bg-background text-foreground relative overflow-hidden">
      {/* Decorative fine lines */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/5 hidden lg:block -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 flex flex-col md:flex-row gap-8 justify-between md:items-end">
          <div className="md:w-2/3">
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground/50 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-foreground/30"></span>
              The Mechanism
            </h2>
            <h3 className="font-serif text-4xl lg:text-6xl font-light leading-tight">
              Aligning economic activity <br className="hidden lg:block"/>
              with <span className="italic text-foreground/60">environmental prosperity</span>.
            </h3>
          </div>
          <div className="md:w-1/3 flex md:justify-end">
             <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center relative hover:border-accent transition-colors group cursor-pointer bg-white animate-[spin_15s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text className="font-mono text-[10px] tracking-widest uppercase fill-foreground group-hover:fill-accent transition-colors">
                    <textPath href="#circlePath" startOffset="0%">
                      READ THE CYCLE • EXPLORE •
                    </textPath>
                  </text>
                </svg>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative z-10 w-full max-w-[280px] mx-auto aspect-square rounded-full overflow-hidden mb-8 border-[6px] border-card shadow-xl group-hover:border-white transition-all duration-500 bg-foreground">
                <div className="absolute inset-0 bg-transparent group-hover:bg-bark/30 transition-colors duration-500 z-10 rounded-full" />
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0 rounded-full" 
                />
              </div>
              <div className="font-mono text-[10px] text-foreground/50 tracking-[0.2em] mb-4 uppercase border px-3 py-1 rounded-full border-border bg-white">
                {step.number}
              </div>
              <h4 className="font-serif text-2xl font-light mb-4 text-foreground">{step.title}</h4>
              <p className="text-foreground/70 leading-relaxed text-sm font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
          
          {/* Connecting lines between circles on desktop */}
          <div className="absolute top-[140px] left-1/6 right-1/6 h-[1px] bg-foreground/10 hidden md:block -z-10" style={{width: '66%', left: '17%'}} />
        </div>
      </div>
    </section>
  );
}
