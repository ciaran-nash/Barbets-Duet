'use client';

import React from 'react';
import { motion } from 'motion/react';
import Header from '@/components/Header';
import CTA from '@/components/CTA';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { useMagnetic } from '@/hooks/use-magnetic';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export default function PhilosophyHistoryContent() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="pt-32 pb-20 relative">
        {/* Standardized Atmospheric Glows */}
        <ScrollGlow top="15%" left="-10%" opacity={0.15} driftX={[0, 150]} />
        <ScrollGlow top="60%" right="-5%" opacity={0.1} color="var(--accent)" driftX={[0, -100]} />

        {/* Hero Section */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-10 border border-accent/20 px-4 py-2 rounded-full"
              >
                {/* // Origins & Evolution */}
                {"// Origins & Evolution"}
              </motion.span>
              
              <KineticReveal delay={0.2}>
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1] tracking-tight">
                  Innovating for People <br />
                  <span className="italic text-muted-foreground/30">& Nature</span>
                </h1>
              </KineticReveal>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="text-xl md:text-3xl text-muted-foreground font-serif leading-relaxed max-w-2xl mt-10"
              >
                A multi-generational effort to invent new market mechanisms that reward the abundance of life.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Origins & Concept Section */}
        <section id="origins-concept" className="py-40 px-6 border-y border-border/50 bg-card/5 backdrop-blur-3xl scroll-mt-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
          
          <div className="max-w-[1600px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-7">
                <KineticReveal>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">The Historical Spark</h2>
                </KineticReveal>
                <div className="space-y-10 text-xl text-muted-foreground font-serif leading-relaxed max-w-3xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    The Barbet’s Duet grew out of the Society for International Development (SID) scenarios conducted between 1998 and 2008 in East Africa. These scenarios highlighted the urgent need to learn from both African and Western cultural traditions.
                  </motion.p>
                </div>

                {/* Year Grid with Magnetic Effect */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
                  {[
                    { year: '1998', label: 'SID Scenarios', desc: 'The Spark' },
                    { year: '2006', label: 'Concept Note', desc: 'The Blueprint' },
                    { year: '2009', label: 'Initiation', desc: 'Tanzania Launch' },
                    { year: '2014', label: 'The Jumuiya', desc: 'Lukenya Convention' },
                  ].map((item, idx) => (
                    <YearCard key={item.year} item={item} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="aspect-square bg-muted/20 border border-border/50 rounded-3xl flex items-center justify-center group overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase text-center px-12 group-hover:scale-110 transition-transform">
                    <div className="mb-4 opacity-30">[ Historical Imagery ]</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section id="core-principles" className="py-40 px-6 border-y border-border/50">
          <div className="max-w-[1600px] mx-auto mb-24">
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-muted-foreground mb-8 block">
              Core Principles
            </span>
            <KineticReveal>
              <h2 className="text-5xl md:text-7xl font-serif font-bold">How We Work</h2>
            </KineticReveal>
            <p className="text-xl text-muted-foreground font-serif leading-relaxed max-w-2xl mt-8">
              Seven operating principles distilled from twenty years of field experimentation across East Africa, Europe, and North America.
            </p>
          </div>

          <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-0 border border-border/50 rounded-3xl overflow-hidden">
            {[
              { n: '01', title: 'Consistency with Site', desc: 'Work with the specific ecology, culture, and economy of each place. No two sites are treated the same.' },
              { n: '02', title: 'Learning by Demonstration', desc: 'Real families, real ecologies, real livelihoods. Proof comes from practice, not theory.' },
              { n: '03', title: 'Just Begin Strategy', desc: 'Start with what is available now. Waiting for perfect conditions is the enemy of systemic change.' },
              { n: '04', title: 'Thinking Step-by-Step', desc: 'Each intervention builds on the last. Complexity is earned, never assumed.' },
              { n: '05', title: 'Immediate Needs Focus', desc: 'Address what the community identifies as urgent first. Trust follows demonstrated relevance.' },
              { n: '06', title: 'Least Resistance Path', desc: 'Align new market mechanisms with existing incentives wherever possible. Change works with human nature, not against it.' },
              { n: '07', title: 'Utu Net Benefits', desc: 'Utu — Swahili for humanity and interconnectedness — frames benefit beyond profit. Decisions are evaluated on whether they strengthen the web of relationships: human, ecological, and economic.' },
            ].map((p, idx) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: Math.floor(idx / 2) * 0.15 }}
                viewport={{ once: true }}
                className={`group p-10 border-border/50 hover:bg-accent/5 transition-colors ${idx % 2 === 0 ? 'border-r' : ''} ${idx < 6 ? 'border-b' : ''}`}
              >
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent mb-4 opacity-60">{p.n} //</div>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-serif text-base italic opacity-80">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy Pillars Section */}
        <section id="philosophy-pillars" className="py-40 px-6">
          <div className="max-w-[1600px] mx-auto text-center mb-32">
            <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-muted-foreground mb-8 block">
              The Framework
            </span>
            <KineticReveal>
              <h2 className="text-5xl md:text-8xl font-serif font-bold">A System for Restoration</h2>
            </KineticReveal>
          </div>

          <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-16">
            {[
              { title: 'Mosaic Rights', icon: '◈', desc: 'Collective land stewardship with seasonal, layered access. Women own food crops, herders graze after harvest, those who dug the well own the water. Biodiversity thrives in the overlap.' },
              { title: 'Column Rights', icon: '⊞', desc: 'Individual family title within a peer-governed network. Exclusive ownership incentivises long-term investment; peer review keeps it accountable to the wider Jumuiya.' },
              { title: 'The Duet', icon: '∿', desc: 'Cross-cultural collaboration on equal terms between Africa and the West. The barbet sings the same song from two traditions simultaneously.' },
              { title: 'Oak Tree Paradox', icon: '🌳', desc: 'A living oak supports 284 species but its financial value is realised only once dead. Economic systems must reward abundance, not extraction.' },
              { title: 'Activities', icon: '⟳', desc: 'Four proven restoration livelihood types: Agro-forestry, Eco-tourism, Water Harvesting, Seaweed Farming. Each aligns economic incentive with ecological health.' },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="text-5xl mb-10 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">{pillar.icon}</div>
                <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-accent transition-colors">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-serif text-lg italic opacity-80">
                  {pillar.desc}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  className="h-px bg-accent/20 mt-12 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Living Archive Section */}
        <section className="py-40 px-6 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="max-w-[1600px] mx-auto relative z-10">
            <div className="max-w-5xl">
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-60 mb-8 block">
                {"03 // Methodology"}
              </span>
              <KineticReveal>
                <h2 className="text-5xl md:text-8xl font-serif font-bold mb-16">The Living Archive</h2>
              </KineticReveal>
              <p className="text-2xl md:text-4xl font-serif italic mb-24 opacity-90 leading-[1.2] max-w-4xl">
                &quot;We believe that making mistakes is a necessary precursor to systemic invention.&quot;
              </p>

              <div className="grid md:grid-cols-3 gap-16 border-t border-primary-foreground/20 pt-16">
                {[
                  { q: 'What have you tried and how did it turn out?', label: 'Experimentation' },
                  { q: 'What was your biggest mistake?', label: 'Vulnerability' },
                  { q: 'What did you learn and what made you laugh?', label: 'Reflection' },
                ].map((prompt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    viewport={{ once: true }}
                    className="hover:opacity-60 transition-opacity cursor-help"
                  >
                    <div className="text-[10px] font-mono tracking-widest uppercase opacity-50 mb-6">Prompt 0{idx + 1}</div>
                    <div className="text-xl font-serif font-medium leading-relaxed">{prompt.q}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}

// Sub-component for Year Cards using magnetic hook
function YearCard({ item }: { item: any }) {
  const { ref, position } = useMagnetic(0.1);
  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group p-6 rounded-2xl border border-border/50 hover:border-accent/50 transition-colors cursor-default"
    >
      <div className="font-mono text-4xl font-bold text-accent mb-4 group-hover:text-foreground transition-colors">
        {item.year}
      </div>
      <div className="font-serif font-bold text-sm mb-1">{item.label}</div>
      <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{item.desc}</div>
    </motion.div>
  );
}
