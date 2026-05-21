import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { KineticReveal } from '@/components/motion/KineticReveal';

export const metadata: Metadata = {
  title: 'Careers & Opportunities | Barbets Duet',
  description:
    'Join the Barbets Duet Jumuiya network as an intern, Site Communications Administrator, or youth programme participant.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main>
        {/* 1. Hero: Join the 20-Year Experiment */}
        <section className="pt-64 pb-48 px-6 bg-night-forest text-platinum relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto relative z-10">
            <KineticReveal>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neon-lime mb-8 block">
                Careers &amp; Opportunities
              </span>
            </KineticReveal>
            <KineticReveal delay={0.1}>
              <h1 className="text-6xl md:text-8xl lg:text-[7vw] font-serif font-bold leading-[0.9] tracking-tighter max-w-5xl mb-12">
                Join the 20-Year Experiment
              </h1>
            </KineticReveal>
            <KineticReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-platinum/70 font-serif leading-relaxed max-w-2xl mb-16">
                Barbets Duet has spent two decades building a regenerative model for people and nature.
                Now we&apos;re opening it up — to interns, communicators, and the next generation of stewards.
              </p>
            </KineticReveal>
            <KineticReveal delay={0.3}>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-3 bg-neon-lime text-night-forest font-mono text-xs uppercase tracking-widest font-bold px-10 h-14 rounded-full hover:bg-neon-lime/90 active:scale-[0.98] transition-all"
              >
                Apply as Volunteer <ArrowRight className="w-4 h-4" />
              </Link>
            </KineticReveal>
          </div>
        </section>

        {/* 2. Internship Programme */}
        <section className="py-48 px-6 border-b border-border/50">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5">
                <KineticReveal>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
                    01 — Internship Programme
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    Learn By Doing — At a Living Site
                  </h2>
                </KineticReveal>
              </div>
              <div className="lg:col-span-7 space-y-10">
                <KineticReveal delay={0.1}>
                  <p className="text-xl text-muted-foreground font-serif leading-relaxed">
                    Structured 4–12 week placements at a Jumuiya Learning Site put you at the centre
                    of real restoration work. Internships are a core revenue stream for our sites —
                    knowledge sharing that sustains communities and ecosystems alike.
                  </p>
                </KineticReveal>

                <KineticReveal delay={0.15}>
                  <div className="border border-border/30 rounded-3xl p-10 space-y-6">
                    <h3 className="text-xl font-serif font-bold">What You Learn</h3>
                    <ul className="space-y-4">
                      {[
                        'Ecological restoration and land stewardship in practice',
                        'Mosaic rights and community-based resource governance',
                        'Community-led stewardship models across different biomes',
                        'Agronomy, dryland farming, and water retention systems',
                        'Data science, communications, and site documentation',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-4 font-serif text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </KineticReveal>

                <KineticReveal delay={0.2}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        label: 'Students',
                        desc: 'Undergraduate and postgraduate learners across ecology, development, and data fields.',
                      },
                      {
                        label: 'Researchers',
                        desc: 'Field researchers seeking access to active restoration sites and long-term data sets.',
                      },
                      {
                        label: 'Practitioners',
                        desc: 'Conservation professionals expanding into community-led and mosaic-rights models.',
                      },
                    ].map((item) => (
                      <div key={item.label} className="p-8 bg-card/5 border border-border/30 rounded-2xl">
                        <h4 className="text-sm font-mono uppercase tracking-widest text-accent mb-3">{item.label}</h4>
                        <p className="text-sm font-serif text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </KineticReveal>

                <KineticReveal delay={0.25}>
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center gap-2 border border-accent text-accent font-mono text-[10px] uppercase tracking-widest px-8 h-12 rounded-full hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all"
                  >
                    Apply as Volunteer <ArrowRight className="w-3 h-3" />
                  </Link>
                </KineticReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Site Communications Administrator */}
        <section className="py-48 px-6 bg-card/5 border-b border-border/50">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5">
                <KineticReveal>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
                    02 — The SCA Role
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    Site Communications Administrator
                  </h2>
                </KineticReveal>
              </div>
              <div className="lg:col-span-7 space-y-10">
                <KineticReveal delay={0.1}>
                  <p className="text-xl text-muted-foreground font-serif leading-relaxed">
                    Each learning site has a Site Communications Administrator — a local role that sits at the
                    intersection of community life, ecological science, and knowledge sharing. SCAs are the voice
                    of their site within the wider Jumuiya circular peer review chain.
                  </p>
                </KineticReveal>

                <KineticReveal delay={0.15}>
                  <div className="grid grid-cols-2 gap-px bg-border/50 border border-border/50 rounded-2xl overflow-hidden">
                    {[
                      {
                        title: 'Record Keeping',
                        desc: 'Ecological data logs, site activity reports, and visitor documentation.',
                      },
                      {
                        title: 'Visitor Coordination',
                        desc: 'Hosting interns, researchers, and delegations at the learning site.',
                      },
                      {
                        title: 'Knowledge Sharing',
                        desc: 'Feeding site learnings into the Jumuiya peer review network.',
                      },
                      {
                        title: 'Ecological Monitoring',
                        desc: 'Tracking restoration indicators and reporting to the wider network.',
                      },
                    ].map((item) => (
                      <div key={item.title} className="bg-background p-10 group hover:bg-accent transition-colors">
                        <h4 className="text-sm font-mono uppercase tracking-widest mb-3 group-hover:text-accent-foreground">
                          {item.title}
                        </h4>
                        <p className="text-sm font-serif text-muted-foreground leading-relaxed group-hover:text-accent-foreground/70">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </KineticReveal>

                <KineticReveal delay={0.2}>
                  <div className="border border-accent/30 bg-accent/5 rounded-2xl p-10">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-4">2028 Target</p>
                    <p className="font-serif text-lg leading-relaxed">
                      By 2028, Barbets Duet aims to have a Site Communications Administrator at every one
                      of its 13 Jumuiya Learning Sites — a cornerstone of our generational handover plan.
                    </p>
                  </div>
                </KineticReveal>

                <KineticReveal delay={0.25}>
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center gap-2 border border-foreground/20 text-foreground font-mono text-[10px] uppercase tracking-widest px-8 h-12 rounded-full hover:border-accent hover:text-accent active:scale-[0.98] transition-all"
                  >
                    Express Interest <ArrowRight className="w-3 h-3" />
                  </Link>
                </KineticReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Youth Engagement Programme */}
        <section className="py-48 px-6 border-b border-border/50">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              <div className="lg:col-span-5">
                <KineticReveal>
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
                    03 — Youth Programme
                  </span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    Building the Next Generation of Stewards
                  </h2>
                </KineticReveal>
              </div>
              <div className="lg:col-span-7 space-y-10">
                <KineticReveal delay={0.1}>
                  <p className="text-xl text-muted-foreground font-serif leading-relaxed">
                    Our 2028 Legacy programme connects youth aged 16–25 across East Africa to ecological
                    stewardship — combining 20 years of learning into a structured curriculum built
                    for the communities that will carry it forward.
                  </p>
                </KineticReveal>

                <KineticReveal delay={0.15}>
                  <div className="space-y-4">
                    {[
                      {
                        label: 'Internships',
                        desc: 'Structured site placements tailored for young participants with mentorship from experienced stewards.',
                      },
                      {
                        label: 'Barbets Game Facilitation',
                        desc: 'Youth train as facilitators for the Barbets Game — our primary tool for ecological systems learning.',
                      },
                      {
                        label: 'SCA Training Pathway',
                        desc: 'A structured journey toward becoming a Site Communications Administrator by 2028.',
                      },
                      {
                        label: 'Youth-Led Restoration Networks',
                        desc: 'Peer learning circles that build the foundation for the next multi-generational Jumuiya.',
                      },
                    ].map((item, idx) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-8 p-8 border border-border/30 rounded-2xl hover:border-accent transition-all group"
                      >
                        <span className="text-3xl font-serif font-bold text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="font-mono text-sm uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">
                            {item.label}
                          </h4>
                          <p className="font-serif text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </KineticReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <section className="py-48 px-6 bg-night-forest text-platinum">
          <div className="max-w-[1600px] mx-auto text-center">
            <KineticReveal>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neon-lime mb-8 block">
                Ready?
              </span>
            </KineticReveal>
            <KineticReveal delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter max-w-3xl mx-auto mb-10">
                Start Your Journey
              </h2>
            </KineticReveal>
            <KineticReveal delay={0.2}>
              <p className="text-xl text-platinum/60 font-serif max-w-xl mx-auto mb-16">
                Whether you&apos;re a student, researcher, or young person in East Africa —
                there is a place for you in the Jumuiya.
              </p>
            </KineticReveal>
            <KineticReveal delay={0.3}>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-3 bg-neon-lime text-night-forest font-mono text-xs uppercase tracking-widest font-bold px-12 h-16 rounded-full hover:bg-neon-lime/90 active:scale-[0.98] transition-all"
              >
                Get Involved <ArrowRight className="w-4 h-4" />
              </Link>
            </KineticReveal>
          </div>
        </section>
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
