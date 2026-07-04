import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { getAllResearchFromSanity, getResearchFromSanity } from '@/lib/sanity/queries';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const AREA_TITLES: Record<string, string> = {
  'ecosystem-finance': 'Ecosystem Finance Models',
  'behaviour-change': 'Community Behaviour Change',
  'biodiversity-measurement': 'Biodiversity Measurement',
};

export async function generateStaticParams() {
  const papers = await getAllResearchFromSanity();
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getResearchFromSanity(slug);
  if (!paper) return {};
  return {
    title: `${paper.title} | Barbets Duet Research`,
    description: paper.abstract,
  };
}

export default async function ResearchPaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = await getResearchFromSanity(slug);
  if (!paper) notFound();

  const paragraphs = (paper.content ?? '').split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.12} size={1000} />

        <article className="max-w-3xl mx-auto px-6 pt-48 pb-48">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Research Hub
          </Link>

          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-6 block">
            {AREA_TITLES[paper.area] ?? 'Research'}
          </span>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-8">
            {paper.title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mb-12">
            {paper.authors && <span>{paper.authors}</span>}
            {paper.published && <span>{paper.published}</span>}
          </div>

          <p className="text-lg md:text-xl font-serif italic text-muted-foreground leading-relaxed border-l-2 border-accent/40 pl-6 mb-14">
            {paper.abstract}
          </p>

          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/85">
                {para}
              </p>
            ))}
          </div>

          {paper.externalUrl && (
            <a
              href={paper.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Read the full paper <ExternalLink size={14} />
            </a>
          )}
        </article>
      </main>

      <StickyFooter />
    </div>
  );
}
