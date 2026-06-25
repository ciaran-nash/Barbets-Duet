'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import CTA from '@/components/CTA';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { useMagnetic } from '@/hooks/use-magnetic';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export default function MissionVisionContent() {
  const missions = [
    {
      title: 'Economic Incentives',
      description: 'Shifting institutional systems so that people are financially rewarded for protecting ecosystems. Conservation as a rational economic choice.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
      tag: 'Systemic'
    },
    {
      title: 'Learning Sites',
      description: 'Testing practical strategies for sustainable living—balancing ecology, livelihoods, and community needs in living laboratories.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
      tag: 'Practical'
    },
    {
      title: 'Market Mechanisms',
      description: 'Inventing governance structures and frameworks that recognize and reward biodiversity conservation across global scales.',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80',
      tag: 'Innovation'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 pb-20 relative">
        {/* Standardized Atmospheric Glows */}
        <ScrollGlow top="15%" right="-10%" opacity={0.15} driftX={[0, 150]} />
        <ScrollGlow top="60%" left="-5%" opacity={0.1} color="var(--accent)" driftX={[0, -100]} />

        {/* Hero Section */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-accent mb-10"
              >
                {/* // Purpose & Promise */}
                {"// Purpose & Promise"}
              </motion.span>
              
              <KineticReveal delay={0.2}>
                <h1 className="text-6xl md:text-[10vw] font-serif font-bold leading-[0.9] tracking-tighter">
                  Mission <span className="italic text-muted-foreground/30">&</span> <br />
                  Vision
                </h1>
              </KineticReveal>

              <div className="grid lg:grid-cols-12 gap-12 items-end">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="lg:col-span-6 text-xl md:text-3xl text-muted-foreground font-serif leading-relaxed"
                >
                  Restoring ecosystems through collaborative innovation. We find balance like the harmonized calls of barbet birds.
                </motion.p>
                <div className="lg:col-span-6 flex flex-col items-start lg:items-end gap-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 128 }}
                    className="h-px bg-accent/30"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {"Scaling to 2050 // Global Constellation"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-40 px-6 border-y border-border/50 bg-card/5 backdrop-blur-3xl relative z-10">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4 sticky top-40">
              <span className="text-[10px] font-mono tracking-widest uppercase text-accent mb-8 block">
                The Model
              </span>
              <KineticReveal>
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                  Perfect <br />
                  Sync
                </h2>
              </KineticReveal>
            </div>
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-4xl font-serif italic text-muted-foreground leading-snug mb-16">
                &quot;The Barbet&apos;s duet is a symbol of perfect synchronization. This is our model for restoration: a collaborative, multi-voiced approach.&quot;
              </p>
              <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-border/20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">Harmony</h4>
                  <p className="text-muted-foreground font-serif leading-relaxed">Aligning human needs with ecological boundaries through deep listening and cross-cultural respect.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">Innovation</h4>
                  <p className="text-muted-foreground font-serif leading-relaxed">Creating new rules and market mechanisms that value the abundance of life over the logic of extraction.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Pillars with Standardized Magnetic Spell */}
        <section className="py-40 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-32">
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4 block">
                {"01 // Strategic"}
              </span>
              <KineticReveal>
                <h2 className="text-5xl md:text-8xl font-serif font-bold">The Pillars</h2>
              </KineticReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {missions.map((mission, idx) => (
                <PillarCard key={mission.title} mission={mission} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-48 px-6 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="max-w-[1600px] mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="text-[10px] font-mono tracking-[0.5em] uppercase opacity-60 mb-12 block">
                {"Towards // 2050"}
              </span>
              <KineticReveal>
                <h2 className="text-4xl md:text-7xl font-serif font-bold mb-16 leading-[1.1] max-w-5xl mx-auto">
                  A global network of learning sites where people and nature thrive together.
                </h2>
              </KineticReveal>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                className="h-px bg-primary-foreground/40 mx-auto mb-16"
              />
              <p className="text-xl md:text-2xl font-serif italic opacity-80 max-w-2xl mx-auto leading-relaxed">
                Our vision is to scale the Barbets Duet model to every continent, creating a resilient tapestry of restored ecosystems.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}

// Refactored PillarCard using the shared hooks
function PillarCard({ mission, idx }: { mission: any, idx: number }) {
  const { ref, position } = useMagnetic(0.15);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="group"
    >
      <div className="aspect-[4/5] bg-muted/20 border border-border/50 rounded-3xl mb-10 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
        <Image
          src={mission.image}
          alt={mission.title}
          fill
          className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
          unoptimized
        />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-background/90 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest border border-border">
            {mission.tag}
          </span>
        </div>
      </div>
      <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-accent transition-colors">{mission.title}</h3>
      <p className="text-muted-foreground leading-relaxed font-serif text-lg opacity-80 group-hover:opacity-100 transition-opacity mb-8">
        {mission.description}
      </p>
      <motion.div 
        whileHover={{ x: 10 }}
        className="flex items-center gap-3 text-accent cursor-pointer"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">[ Read Theory ]</span>
        <ArrowUpRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}
