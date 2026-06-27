import type { MetadataRoute } from 'next';

const base =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://barbets-duet-git-main-barbets.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private / authenticated / tooling surfaces — keep out of the index.
      disallow: ['/admin', '/superadmin', '/studio', '/community/dashboard', '/api/', '/403'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
