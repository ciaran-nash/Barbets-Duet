import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events } from '@/lib/data/events';
import { getEventFromSanity, getAllEventsFromSanity } from '@/lib/sanity/queries';
import EventDetail from '@/components/events/EventDetail';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event =
    (await getEventFromSanity(slug)) ?? events.find((e) => e.slug === slug);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.title} | Barbets Duet`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [{ url: event.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const sanityEvents = await getAllEventsFromSanity();
  const allEvents = sanityEvents.length > 0 ? sanityEvents : events;
  return allEvents.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event =
    (await getEventFromSanity(slug)) ?? events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <EventDetail event={event} />
      </main>
      <CTA />
      <StickyFooter />
    </div>
  );
}
