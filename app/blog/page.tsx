import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { KineticReveal } from '@/components/motion/KineticReveal';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { blogPosts as staticBlog } from '@/lib/data/blog';
import { getAllBlogFromSanity } from '@/lib/sanity/queries';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Barbets Duet',
  description:
    'Discover the latest news on ecological restoration, community successes, and sustainable finance from the Barbets Duet team.',
};

export default async function BlogPage() {
  const sanityBlog = await getAllBlogFromSanity();
  const blogPosts = sanityBlog.length > 0 ? sanityBlog : staticBlog;

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
                Latest Updates
              </span>
              <KineticReveal>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.85] tracking-tighter mb-12">
                  Blog
                </h1>
              </KineticReveal>
              <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-2xl leading-relaxed">
                Insights on ecological restoration, sustainable finance, and community-led conservation from the Barbets Duet team.
              </p>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-48 px-6">
          <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-border rounded-2xl overflow-hidden bg-card hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <Badge variant="secondary" className="self-start">
                    {post.label}
                  </Badge>
                  <h2 className="font-serif text-xl font-semibold leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                    <span className="text-xs text-muted-foreground">{post.published}</span>
                    <span className="flex items-center text-sm font-semibold text-accent transition-colors">
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
