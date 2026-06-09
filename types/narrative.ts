import type { ImpactPoint } from '@/types/shared';
import type { PortableTextBlock } from '@portabletext/types';

/** @deprecated Use ImpactPoint from @/types/shared directly */
export type ImpactMetric = ImpactPoint;

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  /**
   * Story body content.
   * - `string` — plain text (legacy static data, still valid)
   * - `PortableTextBlock[]` — Sanity CMS rich text (future CMS integration)
   */
  content: string | PortableTextBlock[];
  image: string;
  category: 'Restoration' | 'Community' | 'Innovation';
  date: string;
  readTime: string;
  impactMetrics: ImpactPoint[];
  siteSlug?: string;
}

export interface BarbetsEvent {
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Convention' | 'Workshop' | 'Lab Day' | 'Summit';
  image: string;
  link?: string;
  registrationStatus: 'Open' | 'Waitlist' | 'Closed';
  /**
   * The slug of the learning site this event belongs to.
   *
   * In Sanity, events reference a `learningSite` document (a `reference` field).
   * When fetched via GROQ, the reference is resolved to a string slug using a
   * projection: `"siteSlug": learningSite->slug.current`.
   *
   * At the component layer this is a plain `string`, not a Sanity reference object.
   * If absent, the event is not associated with any specific learning site.
   */
  siteSlug?: string;
}
