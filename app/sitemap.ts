import type { MetadataRoute } from 'next';
import { learningSites } from '@/lib/data/learning-sites';
import { stories } from '@/lib/data/stories';
import { events } from '@/lib/data/events';
import { newsItems } from '@/lib/data/news';
import { blogPosts } from '@/lib/data/blog';

const base =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://barbets-duet-git-main-barbets.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '', '/learning-sites', '/projects', '/stories', '/events', '/news', '/blog',
    '/research', '/about', '/about/team', '/about/mission-vision',
    '/about/philosophy-history', '/about/careers', '/get-involved', '/support-us',
    '/faq', '/community', '/legal/privacy', '/legal/terms', '/legal/cookies',
    '/legal/accessibility',
  ];

  // Dynamic detail routes — sourced from static data (mirrors the build-time
  // generateStaticParams fallback). Sanity-added entries get picked up by ISR.
  const dynamicPaths = [
    ...learningSites.map((s) => `/learning-sites/${s.slug}`),
    ...stories.map((s) => `/stories/${s.slug}`),
    ...events.map((e) => `/events/${e.slug}`),
    ...newsItems.map((n) => `/news/${n.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
