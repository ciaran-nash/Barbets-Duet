'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronDown,
    ArrowRight,
    ChevronRight,
    Info,
    Box,
    ArrowLeft,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { teamMembers } from '@/lib/data/team';
import Header from '@/components/Header';
import CTA from '@/components/CTA';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { useMagnetic } from '@/hooks/use-magnetic';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { Button } from '@/components/ui/button';

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      
      <main className="relative">
        <ScrollGlow top="5%" left="-10%" opacity={0.15} size={1200} />
        <ScrollGlow top="40%" right="-10%" opacity={0.1} color="var(--accent)" size={1000} />

        {/* 1. Hero Section: Vision Statement */}
        <section className="pt-64 pb-48 px-6 text-center relative z-10">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-8 block">
                Barbets Duet – A Story of Trial, Error and Community
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-[7vw] font-serif font-bold leading-[0.9] tracking-tighter max-w-6xl mx-auto mb-12">
                  Restoring Livelihoods and Land—Innovating for People and Nature
                </h1>
              </KineticReveal>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed max-w-2xl mx-auto mb-16">
                We are creating new traditions for restoration, combining localized <br className="hidden md:block" /> knowledge with global systemic innovation.
              </p>
              
              <div className="flex flex-col items-center gap-8 cursor-pointer group">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Discover Our Journey</span>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors"
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Intro Section: The Origins */}
        <section className="py-48 px-6 border-t border-border/50 bg-card/5">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-24 items-start mb-24">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-accent mb-6 block">The Barbets Origins</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">A Collective for Ecological & Economic Renewal</h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-xl md:text-2xl text-muted-foreground font-serif leading-relaxed">
                    The Barbet’s Duet collective grew out of the Society for International Development (SID) scenarios conducted between 1998 and 2008 in East Africa, which highlighted accelerating environmental damage and the need to learn from both African and Western cultural traditions. This decade-long history has fostered a unique focus on integrating diverse cultivation practices for a regenerative future.
                </p>
              </div>
            </div>
            
            <div className="relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-platinum/10 group">
                <Image 
                  src="/origins_landscape_1778511418595.png" 
                  alt="Origins and Traditions of Barbets Duet"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest/20 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </div>
        </section>

        {/* 3. History Timeline: Origins & Concept */}
        <section className="py-48 px-6 relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-32 items-center">
            <div className="lg:col-span-7 space-y-16">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Origins & Concept</h2>
                <p className="text-xl text-muted-foreground font-serif leading-relaxed max-w-2xl">
                    Between 1998 and 2008, dialogues with the Society for International Development (SID) laid the theoretical foundation for what would become the Barbets Duet. These sessions were critical in identifying the gaps in current environmental governance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border/50 border border-border/50">
                {[
                  { year: '1998', desc: 'Concept Development' },
                  { year: '2006', desc: 'Initial Network of Learning Sites' },
                  { year: '2009', desc: 'First Convention' },
                  { year: '2025', desc: 'Charitable Foundation' },
                ].map((item) => (
                  <div key={item.year} className="bg-background p-10 group hover:bg-accent transition-colors">
                    <div className="text-4xl font-serif font-bold mb-2 group-hover:text-accent-foreground">{item.year}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/70">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] rounded-[2rem] border border-platinum/10 relative overflow-hidden group">
                <Image 
                  src="/timeline_abstract_1778511439800.png" 
                  alt="Barbets Duet Timeline Abstract"
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Conceptual Framework: A System for Restoration */}
        <section className="py-48 px-6 bg-card/5 border-y border-border/50">
          <div className="max-w-[1600px] mx-auto text-center mb-32">
            <span className="text-[10px] font-mono tracking-widest uppercase text-accent mb-6 block">Conceptual Framework</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10 italic">A System for Restoration</h2>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
                Our model integrates ancestral wisdom with modern market innovation to create a self-sustaining cycle of restoration.
            </p>
          </div>

          <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-16">
            {[
              { 
                title: 'Mosaic Rights', 
                desc: 'Shared, seasonal access to natural resources that ensures communal stewardship over individual exploitation.' 
              },
              { 
                title: 'Economic Innovation', 
                desc: 'Linking local livelihoods directly to ecological health, making restoration the most profitable path.' 
              },
              { 
                title: 'Learning Sites', 
                desc: 'Testing solutions in real communities to prove that regenerative models work across different biomes.' 
              },
            ].map((item, idx) => (
              <div key={idx} className="p-12 border border-border/30 rounded-3xl hover:border-accent transition-all group">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                  <Box className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                  {item.title}
                  <Info className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground font-serif leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Team Directory: Meet the Barbets */}
        <section className="py-48 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-24">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Current Team</h2>
              <p className="text-xl text-muted-foreground font-serif max-w-2xl">
                The Barbets Council is a collaborative body of site leaders, researchers, and inventors committed to the long-term vision.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16 mb-12">
              {teamMembers.slice(0, 3).map((member) => (
                <TeamCard key={member.slug} member={{ name: member.name, loc: member.location ?? '' }} />
              ))}
            </div>
            <div className="mb-32">
              <Link
                href="/about/team"
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em]
                           text-accent hover:opacity-70 transition-opacity border-b border-accent/30 pb-1"
              >
                Meet all {teamMembers.length} team members <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="bg-accent p-16 md:p-24 rounded-[3rem] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-accent-foreground mb-4">We’re seeking stewards!</h2>
                    <p className="text-accent-foreground/70 font-serif text-lg italic">Join the next generation of ecological inventors.</p>
                </div>
                <Button size="lg" className="rounded-full px-12 h-16 bg-background text-foreground hover:bg-background/90 text-sm font-mono tracking-widest uppercase font-bold">
                    Become a Barbet
                </Button>
            </div>
          </div>
        </section>

        {/* 6. Founders & Partners Banner */}
        <section className="py-24 px-6">
          <div className="max-w-[1600px] mx-auto rounded-[3rem] bg-clay-800 text-stone-50 p-16 md:p-32 relative overflow-hidden group">
            {/* Background Image Placeholder Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-clay-900/60" />

            <div className="relative z-10 grid md:grid-cols-2 gap-24 items-center">
                <div>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8">Meet Our Founders <br /> and Partners</h2>
                    <p className="text-xl text-stone-300 font-serif leading-relaxed max-w-lg">
                        The people who initiated the 20-year experiment and are now guiding the transition to a multi-generational jumuiya.
                    </p>
                </div>
                <div className="flex justify-center md:justify-end">
                    <Button variant="outline" className="rounded-none border-stone-50/20 hover:bg-stone-50 hover:text-clay-900 px-12 h-16 font-mono text-[10px] uppercase tracking-widest transition-all">
                        Explore Partners
                    </Button>
                </div>
            </div>
          </div>
        </section>

        {/* 7. Learning Sites Carousel: Explore Our Sites */}
        <section className="py-48 px-6 bg-card/5">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-end justify-between mb-24">
                <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-accent mb-6 block">Our Network</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold italic">Explore Our Sites</h2>
                </div>
                <div className="flex gap-4">
                    <button className="w-16 h-16 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button className="w-16 h-16 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all">
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="flex gap-12 overflow-x-auto pb-12 no-scrollbar">
                {[
                    { title: 'Msichoke Seaweed Growers', loc: 'Mlingotini, Bagamoyo, Tanzania', desc: 'A community-led project focused on sustainable seaweed farming and mangrove restoration in the coastal waters.' },
                    { title: 'Hudson Valley Restoration', loc: 'Hannacroix, New York, U.S.A', desc: 'Testing forest management and carbon sequestration models in temperate deciduous forests.' },
                    { title: 'Lukanya Dryland Network', loc: 'Machakos, Kenya', desc: 'Innovating dryland agriculture and water retention systems for semi-arid environments.' },
                ].map((site, idx) => (
                    <div key={idx} className="min-w-[400px] bg-background/40 backdrop-blur-sm border border-platinum/5 rounded-[2rem] p-10 group hover:border-accent transition-all duration-500">
                        <div className="aspect-square rounded-2xl mb-8 overflow-hidden relative border border-platinum/5">
                            <Image 
                              src="/learning_site_tanzania_1778511459409.png" 
                              alt={site.title}
                              fill
                              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-forest/20 group-hover:opacity-0 transition-opacity" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold mb-2">{site.title}</h3>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-6">{site.loc}</p>
                        <p className="text-muted-foreground font-serif text-sm opacity-70 mb-8 leading-relaxed">
                            {site.desc}
                        </p>
                        <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold group-hover:text-accent transition-colors">
                            Learn More <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-3 mt-12">
                <div className="w-12 h-1 bg-accent rounded-full" />
                <div className="w-2 h-1 bg-border rounded-full" />
                <div className="w-2 h-1 bg-border rounded-full" />
            </div>
          </div>
        </section>

        {/* 8. Newsletter Signup */}
        <section className="py-24 px-6 border-y border-border/50">
            <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-2">Join our newsletter</h2>
                        <p className="text-muted-foreground font-serif">Stay informed about our multi-generational restoration efforts.</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <form className="flex gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 bg-card/5 border border-border/50 h-16 px-8 rounded-full focus:outline-none focus:border-accent transition-colors font-serif"
                        />
                        <Button className="rounded-full px-10 h-16 font-mono text-xs uppercase tracking-widest font-bold">
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-[9px] font-mono uppercase tracking-widest opacity-40 pl-8">
                        By subscribing, you agree to our Privacy Policy.
                    </p>
                </div>
            </div>
        </section>

      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}

// Refactored TeamCard using the shared useMagnetic hook
function TeamCard({ member }: { member: any }) {
  const { ref, position } = useMagnetic<HTMLDivElement>(0.2);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative"
    >
      <div className="aspect-square border border-platinum/10 rounded-[2.5rem] mb-8 overflow-hidden relative group-hover:border-accent/30 transition-all duration-1000">
        <Image 
          src="/member_portrait_steward_1778511505484.png" 
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-forest/30 group-hover:bg-transparent transition-colors duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(199,241,108,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <div className="relative">
        <h3 className="text-3xl font-serif font-bold mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-4 italic">{member.loc}</p>
        <p className="text-muted-foreground leading-relaxed font-serif text-sm opacity-60 mb-6">
            Leading multi-generational systemic innovation across local learning sites. Testing new traditions for a regenerative future.
        </p>
        <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 transition-opacity">
            Meet {member.name.split(' ')[0]} <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
