import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export const metadata: Metadata = {
  title: 'Research Hub | Barbets Duet',
  description: 'Explore Barbets Duet research into ecosystem restoration, sustainable finance, and community-led conservation.',
};

const researchAreas = [
  {
    title: 'Ecosystem Finance Models',
    description: 'Exploring how market mechanisms can align economic incentives with long-term habitat restoration.',
  },
  {
    title: 'Community Behaviour Change',
    description: 'Understanding what drives sustained conservation behaviour in rural communities.',
  },
  {
    title: 'Biodiversity Measurement',
    description: 'Developing accessible metrics for tracking species recovery and habitat health.',
  },
];

export default function ResearchPage() {
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
                Rigorous inquiry into the systems that govern ecological restoration and community resilience. Publications and findings coming soon.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="pb-48 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {researchAreas.map((area) => (
                <div
                  key={area.title}
                  className="border border-border rounded-2xl p-8 flex flex-col gap-4 bg-card"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-semibold leading-snug">{area.title}</h3>
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-accent border border-accent/30 rounded-full px-3 py-1 whitespace-nowrap">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <StickyFooter />
    </div>
  );
}
