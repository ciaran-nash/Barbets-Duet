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
 * All queries fall back gracefully via safeFetch(): if Sanity is unconfigured
 * OR unreachable (network error at build/runtime), the fallback value is
 * returned so pages never break and the build never crashes on CMS issues.
 * Callers still chain `?? static` for the unconfigured case.
 */
import type { LearningSite } from '@/types/learning-site';
import type { Story, BarbetsEvent } from '@/types/narrative';
import { sanityClient } from './client';

/**
 * Fault-tolerant Sanity fetch. Returns `fallback` when Sanity is not configured
 * or the request throws (e.g. DNS/network failure during a build or CMS outage).
 */
async function safeFetch<T>(
  fallback: T,
  query: string,
  params: Record<string, unknown> = {},
  options?: { next?: { tags?: string[] } }
): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params, options);
  } catch (err) {
    console.error(
      '[sanity] fetch failed, using fallback:',
      err instanceof Error ? err.message : err
    );
    return fallback;
  }
}

// ─── Learning Sites ─────────────────────────────────────────────────────────

/**
 * Fetch a single learning site by slug.
 * GROQ projection maps Sanity's reference + image types back to
 * the TypeScript LearningSite interface shape.
 */
export async function getLearningSiteFromSanity(slug: string): Promise<LearningSite | null> {
  return safeFetch<LearningSite | null>(
    null,
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
  return safeFetch<LearningSite[]>(
    [],
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
  return safeFetch<Story | null>(
    null,
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
  return safeFetch<Story[]>(
    [],
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
  return safeFetch<BarbetsEvent | null>(
    null,
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
  return safeFetch<BarbetsEvent[]>(
    [],
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

// ─── Trial & Error ───────────────────────────────────────────────────────────

export interface TrialAndErrorEntry {
  slug: string;
  title: string;
  siteSlug: string;
  authorMemberSlug: string;
  prompt1: unknown[];
  prompt2: unknown[];
  prompt3: unknown[];
  prompt4: unknown[];
  challengeType: string[];
  interventionType: string[];
  propertyRightsRegime: string | null;
  status: 'draft' | 'pending_review' | 'published' | 'rejected';
  submittedAt: string | null;
  publishedAt: string | null;
  images: { url: string; altText: string; caption?: string }[];
}

const T_AND_E_PROJECTION = `{
  "slug": slug.current,
  title,
  siteSlug,
  authorMemberSlug,
  prompt1,
  prompt2,
  prompt3,
  prompt4,
  challengeType,
  interventionType,
  propertyRightsRegime,
  status,
  submittedAt,
  publishedAt,
  "images": images[] { "url": asset->url, altText, caption }
}`;

/**
 * Fetch all published T&E entries for a given site slug.
 * Wave 6, Task C1.
 */
export async function getContributionsBySite(
  siteSlug: string
): Promise<TrialAndErrorEntry[]> {
  return safeFetch<TrialAndErrorEntry[]>(
    [],
    `*[_type == "trialAndError" && siteSlug == $siteSlug && status == "published"]
      | order(publishedAt desc) ${T_AND_E_PROJECTION}`,
    { siteSlug },
    { next: { tags: ['trialAndError', `trialAndError:site:${siteSlug}`] } }
  );
}

/**
 * Fetch all published T&E entries by a given member slug.
 * Wave 6, Task C1.
 */
export async function getContributionsByMember(
  memberSlug: string
): Promise<TrialAndErrorEntry[]> {
  return safeFetch<TrialAndErrorEntry[]>(
    [],
    `*[_type == "trialAndError" && authorMemberSlug == $memberSlug && status == "published"]
      | order(publishedAt desc) ${T_AND_E_PROJECTION}`,
    { memberSlug },
    { next: { tags: ['trialAndError', `trialAndError:member:${memberSlug}`] } }
  );
}

/**
 * Full-text search across published T&E entries.
 * Searches title + prompt text fields via GROQ text matching.
 * Wave 6, Task C1.
 */
export async function searchContributions(
  query: string
): Promise<TrialAndErrorEntry[]> {
  return safeFetch<TrialAndErrorEntry[]>(
    [],
    `*[_type == "trialAndError" && status == "published" &&
       (title match $q || pt::text(prompt1) match $q || pt::text(prompt2) match $q ||
        pt::text(prompt3) match $q || pt::text(prompt4) match $q)]
      | order(publishedAt desc) ${T_AND_E_PROJECTION}`,
    { q: `*${query}*` },
    { next: { tags: ['trialAndError'] } }
  );
}
