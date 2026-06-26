import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { newsItems as staticNews } from '@/lib/data/news';
import { getAllNewsFromSanity, getNewsFromSanity } from '@/lib/sanity/queries';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const sanityNews = await getAllNewsFromSanity();
  const items = sanityNews.length > 0 ? sanityNews : staticNews;
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getNewsFromSanity(slug)) ?? staticNews.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Barbets Duet News`,
    description: item.summary,
  };
}

export default async function NewsItemPage({ params }: Props) {
  const { slug } = await params;
  const item = (await getNewsFromSanity(slug)) ?? staticNews.find((n) => n.slug === slug);
  if (!item) notFound();

  const paragraphs = item.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.12} size={1000} />

        {/* Hero image */}
        <div className="relative w-full h-[50vh] min-h-[320px] mt-20">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 pb-48 -mt-24 relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to News
          </Link>

          <Badge variant="secondary" className="mb-4">
            {item.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight tracking-tight mb-6">
            {item.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-6 border-b border-border">
            <span>{item.date}</span>
          </div>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none font-sans leading-relaxed">
            {paragraphs.map((para, i) => (
              <p key={i} className="mb-6 text-base md:text-lg text-foreground/90 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </article>
      </main>

      <StickyFooter />
    </div>
  );
}
