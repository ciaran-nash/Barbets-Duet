import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { getAllResearchFromSanity } from '@/lib/sanity/queries';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Research Hub | Barbets Duet',
  description: 'Explore Barbets Duet research into ecosystem restoration, sustainable finance, and community-led conservation.',
};

const researchAreas = [
  {
    value: 'ecosystem-finance',
    title: 'Ecosystem Finance Models',
    description: 'Exploring how market mechanisms can align economic incentives with long-term habitat restoration.',
  },
  {
    value: 'behaviour-change',
    title: 'Community Behaviour Change',
    description: 'Understanding what drives sustained conservation behaviour in rural communities.',
  },
  {
    value: 'biodiversity-measurement',
    title: 'Biodiversity Measurement',
    description: 'Developing accessible metrics for tracking species recovery and habitat health.',
  },
];

export default async function ResearchPage() {
  const papers = await getAllResearchFromSanity();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />

        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-4xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                Research & Publications
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                  Research <br /> Hub
                </h1>
              </KineticReveal>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed">
                Rigorous inquiry into the systems that govern ecological restoration and community
                resilience.
              </p>
            </div>
          </div>
        </section>

        {/* Research areas */}
        <section className="pb-24 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {researchAreas.map((area) => {
                const areaPapers = papers.filter((p) => p.area === area.value);
                return (
                  <div
                    key={area.value}
                    className="border border-border rounded-2xl p-8 flex flex-col gap-4 bg-card"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="font-serif text-xl font-semibold leading-snug">{area.title}</h2>
                      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent border border-accent/30 rounded-full px-3 py-1 whitespace-nowrap">
                        {areaPapers.length > 0
                          ? `${areaPapers.length} paper${areaPapers.length > 1 ? 's' : ''}`
                          : 'Coming Soon'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                    {areaPapers.length > 0 && (
                      <ul className="mt-2 space-y-3 border-t border-border pt-4">
                        {areaPapers.map((paper) => (
                          <li key={paper.slug}>
                            <Link
                              href={`/research/${paper.slug}`}
                              className="group flex items-start justify-between gap-2 text-sm text-foreground hover:text-accent transition-colors"
                            >
                              <span>{paper.title}</span>
                              <ArrowRight size={14} className="mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* All publications list */}
        {papers.length > 0 && (
          <section className="pb-48 px-6">
            <div className="max-w-[1600px] mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-10 block">
                All publications
              </span>
              <div className="divide-y divide-border border-t border-b border-border">
                {papers.map((paper) => (
                  <Link
                    key={paper.slug}
                    href={`/research/${paper.slug}`}
                    className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6 hover:bg-card/60 transition-colors px-2 -mx-2"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 md:w-32">
                      {paper.published ?? ''}
                    </span>
                    <span className="font-serif text-xl md:text-2xl group-hover:text-accent transition-colors">
                      {paper.title}
                    </span>
                    {paper.authors && (
                      <span className="text-sm text-muted-foreground md:ml-auto shrink-0">
                        {paper.authors}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        {papers.length === 0 && <div className="pb-24" />}
      </main>
      <StickyFooter />
    </div>
  );
}
