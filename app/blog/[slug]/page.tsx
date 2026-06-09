import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { blogPosts } from '@/lib/data/blog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Barbets Duet Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = (post.content as string).split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.12} size={1000} />

        {/* Hero image */}
        <div className="relative w-full h-[50vh] min-h-[320px] mt-20">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 pb-48 -mt-24 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Blog
          </Link>

          <Badge variant="secondary" className="mb-4">
            {post.label}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12 pb-6 border-b border-border">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{post.published}</span>
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
