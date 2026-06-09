import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stories } from '@/lib/data/stories';
import { getStoryFromSanity, getAllStoriesFromSanity } from '@/lib/sanity/queries';
import CinematicReader from '@/components/stories/CinematicReader';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story =
    (await getStoryFromSanity(slug)) ?? stories.find((s) => s.slug === slug);

  if (!story) return { title: 'Story Not Found' };

  return {
    title: `${story.title} | Barbets Impact Stories`,
    description: story.excerpt,
  };
}

export async function generateStaticParams() {
  const sanityStories = await getAllStoriesFromSanity();
  const allStories = sanityStories.length > 0 ? sanityStories : stories;
  return allStories.map((s) => ({ slug: s.slug }));
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story =
    (await getStoryFromSanity(slug)) ?? stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="bg-forest min-h-screen">
      <Header />
      <main>
        <CinematicReader story={story} />
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
