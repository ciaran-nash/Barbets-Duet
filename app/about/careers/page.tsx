import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Careers & Opportunities | Barbets Duet',
  description: 'Join the Barbets Duet Jumuiya network as an intern, Site Communications Administrator, or youth programme participant.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-48 pb-24 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-[900px]">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-8 block">
                Careers &amp; Opportunities
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-8">
                Work With Nature.<br />Leave a Legacy.
              </h1>
              <p className="text-xl font-sans leading-relaxed text-foreground/70 max-w-[600px]">
                Barbets Duet is a 20-year experiment in ecological stewardship and economic innovation. We are looking for people who want to be part of the next chapter.
              </p>
            </div>
          </div>
        </section>

        {/* Internship Programme */}
        <section className="py-24 px-6 bg-platinum text-night-forest">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-viridian mb-6 block">
                  01 — Internship Programme
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-[0.9] tracking-tighter">
                  Learn by Doing
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg font-sans leading-relaxed text-night-forest/80 mb-8">
                  Our internship programme places you at one of the Jumuiya learning sites for 4–12 weeks. You work alongside the site manager on real restoration and innovation projects — not shadowing, not filing: doing.
                </p>
                <div className="space-y-3 mb-10">
                  {[
                    'Ecology, agroforestry and land management',
                    'Community organising and cooperative development',
                    'Data science, research and monitoring',
                    'Communications, photography and documentation',
                    'Finance, fundraising and enterprise development',
                  ].map((discipline, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-viridian mt-2.5 shrink-0" />
                      <span className="text-sm font-sans text-night-forest/70">{discipline}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-mono text-night-forest/50 mb-8">
                  Duration: 4–12 weeks &nbsp;·&nbsp; On-site &nbsp;·&nbsp; Stipend available for qualifying placements
                </p>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 bg-night-forest text-platinum font-sans font-semibold
                             px-8 py-4 rounded-full hover:bg-night-forest/90 active:scale-[0.98] transition-all"
                >
                  Apply for an Internship <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SCA Role */}
        <section className="py-24 px-6 bg-background text-foreground">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-6 block">
                  02 — Site Communications
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-[0.9] tracking-tighter">
                  Site Communications<br />Administrator
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg font-sans leading-relaxed text-foreground/70 mb-8">
                  The Site Communications Administrator (SCA) is a local role — one at each Jumuiya learning site — responsible for documenting and communicating the site&apos;s ecological and economic activities to the wider network.
                </p>
                <div className="space-y-6 mb-10">
                  {[
                    {
                      label: 'Documentation',
                      desc: 'Record ecological data, restoration milestones, and community stories in the site&apos;s knowledge archive.',
                    },
                    {
                      label: 'Network Reporting',
                      desc: 'Contribute to the Barbets Duet circular peer review chain — sharing findings and receiving knowledge from partner sites.',
                    },
                    {
                      label: '2028 Target',
                      desc: 'A trained SCA at every one of the 13 Jumuiya sites by 2028 — the communications backbone of the generational handover.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-accent pl-6">
                      <div className="text-sm font-mono uppercase tracking-widest text-accent mb-1">{item.label}</div>
                      <div className="text-sm font-sans text-foreground/70">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 border border-foreground/20 text-foreground font-sans font-semibold
                             px-8 py-4 rounded-full hover:border-accent hover:text-accent active:scale-[0.98] transition-all"
                >
                  Express Interest <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Youth Programme */}
        <section className="py-24 px-6 bg-night-forest text-platinum">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neon-lime mb-6 block">
                  03 — Youth Programme
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold leading-[0.9] tracking-tighter">
                  The 2028<br />Legacy
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg font-sans leading-relaxed text-platinum/80 mb-8">
                  Barbets Duet is building toward a generational handover — a structured programme that connects East African youth to ecological stewardship and economic innovation by 2028.
                </p>
                <div className="grid sm:grid-cols-3 gap-8 mb-10">
                  {[
                    { label: 'Curriculum', desc: 'A youth-focused learning programme built from 20 years of Jumuiya network knowledge.' },
                    { label: 'The Barbets Game', desc: 'An interactive learning tool that teaches ecological systems thinking through play.' },
                    { label: 'Youth-Led Restoration', desc: 'Building the next generation of site leaders, starting at Mwasama and expanding network-wide.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-platinum/10 rounded-2xl p-6">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neon-lime mb-2">{item.label}</div>
                      <p className="text-sm font-sans text-platinum/70 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 bg-neon-lime text-night-forest font-sans font-semibold
                             px-8 py-4 rounded-full hover:bg-neon-lime/90 active:scale-[0.98] transition-all"
                >
                  Get Involved <ArrowRight className="w-4 h-4" />
                </Link>
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
