import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { newsItems as staticNews } from '@/lib/data/news';
import { getAllNewsFromSanity } from '@/lib/sanity/queries';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News | Barbets Duet',
  description:
    'The latest announcements, updates, and press releases from Barbets Duet.',
};

export default async function NewsPage() {
  const sanityNews = await getAllNewsFromSanity();
  const newsItems = sanityNews.length > 0 ? sanityNews : staticNews;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />
        <ScrollGlow top="60%" left="-10%" color="var(--brand)" opacity={0.1} size={1500} />

        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-[1600px] mx-auto">
            <div className="max-w-4xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block">
                Press & Announcements
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                  News
                </h1>
              </KineticReveal>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed">
                Announcements, programme updates, and press releases from Barbets Duet.
              </p>
            </div>
          </div>
        </section>

        {/* News list */}
        <section className="pb-48 px-6">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-10">
            {newsItems.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group grid md:grid-cols-[280px_1fr] gap-8 border border-border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[200px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8 gap-3">
                  <Badge variant="secondary" className="self-start">
                    {item.category}
                  </Badge>
                  <h2 className="font-serif text-2xl font-semibold leading-snug group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <span className="flex items-center text-sm font-semibold text-accent">
                      Read more <ArrowRight className="ml-1 size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <StickyFooter />
    </div>
  );
}
