/**
 * GROQ queries for all content types
 *
 * All queries include next: { tags } for on-demand revalidation via T21 webhooks.
 * Cache tag strategy:
 *   'learningSite'           — invalidates all site queries
 *   'learningSite:{slug}'    — invalidates one site's cached page
 *   'story'                  — invalidates all story queries
 *   'story:{slug}'           — invalidates one story's cached page
 *   'event'                  — invalidates all event queries
 *   'event:{slug}'           — invalidates one event's cached page
 *
 * All queries fall back gracefully — callers should use ?? static data fallback
 * so existing pages never break if Sanity is not yet configured.
 */
import type { LearningSite } from '@/types/learning-site';
import type { Story, BarbetsEvent } from '@/types/narrative';
import { sanityClient } from './client';

// ─── Learning Sites ─────────────────────────────────────────────────────────

/**
 * Fetch a single learning site by slug.
 * GROQ projection maps Sanity's reference + image types back to
 * the TypeScript LearningSite interface shape.
 */
export async function getLearningSiteFromSanity(slug: string): Promise<LearningSite | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  return sanityClient.fetch<LearningSite | null>(
    `*[_type == "learningSite" && slug.current == $slug][0]{
      "slug": slug.current,
      name,
      location,
      founded,
      category,
      leadPartners,
      lat,
      lng,
      "heroImage": heroImage.asset->url,
      heroVideo,
      "accentImage": accentImage.asset->url,
      visionEyebrow,
      visionStatement,
      overview,
      focusAreas,
      restorationGoals,
      founderNames,
      memberNames,
      websiteUrl,
      socialLinks,
      challenges {
        title,
        description,
        "image": image.asset->url,
        tags
      },
      restorationStrategies {
        description,
        tags,
        "image": image.asset->url
      },
      initiativesIntro,
      initiatives[] {
        title,
        description,
        "image": image.asset->url,
        icon
      },
      "initiativesImage": initiativesImage.asset->url,
      marketStrategies {
        title,
        description,
        strategies
      },
      impactIntro,
      impactReports,
      impactData {
        ecological[] { label, value, description, trend },
        community[] { label, value, description, trend }
      },
      "impactImages": impactImages[].asset->url,
      futureGoals,
      "futureGoalsImage": futureGoalsImage.asset->url,
      galleryText,
      "gallery": gallery[].asset->url,
      testimonial {
        quote,
        authorName,
        authorPosition,
        "authorAvatar": authorAvatar.asset->url
      },
      contact {
        intro,
        buttonLabel,
        contactLink
      },
      "featuredSiteSlug": featuredSite->slug.current,
      "relatedSitesSlugs": relatedSites[]->slug.current
    }`,
    { slug },
    { next: { tags: ['learningSite', `learningSite:${slug}`] } }
  );
}

/**
 * Fetch all learning sites for the browse page and generateStaticParams.
 */
export async function getAllLearningSitesFromSanity(): Promise<LearningSite[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];

  return sanityClient.fetch<LearningSite[]>(
    `*[_type == "learningSite"] | order(name asc) {
      "slug": slug.current,
      name,
      location,
      founded,
      category,
      leadPartners,
      lat,
      lng,
      "heroImage": heroImage.asset->url,
      visionEyebrow,
      visionStatement,
      focusAreas,
      impactData {
        ecological[] { label, value, description, trend },
        community[] { label, value, description, trend }
      }
    }`,
    {},
    { next: { tags: ['learningSite'] } }
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/**
 * Fetch a single story by slug.
 * content returns PortableTextBlock[] — components must handle both
 * string (legacy static data) and PortableTextBlock[] (Sanity).
 */
export async function getStoryFromSanity(slug: string): Promise<Story | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  return sanityClient.fetch<Story | null>(
    `*[_type == "story" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      subtitle,
      excerpt,
      content,
      "image": image.asset->url,
      category,
      date,
      readTime,
      impactMetrics[] { label, value, unit },
      "siteSlug": associatedSite->slug.current
    }`,
    { slug },
    { next: { tags: ['story', `story:${slug}`] } }
  );
}

/**
 * Fetch all stories for index page and generateStaticParams.
 */
export async function getAllStoriesFromSanity(): Promise<Story[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];

  return sanityClient.fetch<Story[]>(
    `*[_type == "story"] | order(date desc) {
      "slug": slug.current,
      title,
      subtitle,
      excerpt,
      "image": image.asset->url,
      category,
      date,
      readTime,
      "siteSlug": associatedSite->slug.current
    }`,
    {},
    { next: { tags: ['story'] } }
  );
}

// ─── Events ──────────────────────────────────────────────────────────────────

/**
 * Fetch a single event by slug.
 */
export async function getEventFromSanity(slug: string): Promise<BarbetsEvent | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;

  return sanityClient.fetch<BarbetsEvent | null>(
    `*[_type == "barbetsEvent" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      description,
      date,
      time,
      location,
      type,
      "image": image.asset->url,
      link,
      registrationStatus,
      "siteSlug": associatedSite->slug.current
    }`,
    { slug },
    { next: { tags: ['event', `event:${slug}`] } }
  );
}

/**
 * Fetch all events for index page and generateStaticParams.
 */
export async function getAllEventsFromSanity(): Promise<BarbetsEvent[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];

  return sanityClient.fetch<BarbetsEvent[]>(
    `*[_type == "barbetsEvent"] | order(date asc) {
      "slug": slug.current,
      title,
      description,
      date,
      time,
      location,
      type,
      "image": image.asset->url,
      registrationStatus,
      "siteSlug": associatedSite->slug.current
    }`,
    {},
    { next: { tags: ['event'] } }
  );
}
