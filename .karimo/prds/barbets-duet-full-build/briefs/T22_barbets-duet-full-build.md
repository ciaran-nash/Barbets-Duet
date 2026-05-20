# Task Brief: T22

**Title:** Sanity image pipeline
**PRD:** barbets-duet-full-build
**Priority:** should
**Complexity:** 2/10
**Wave:** 5

---

## Objective

Configure Sanity image CDN delivery with automatic webp/avif transformation and integrate it with the Next.js `<Image>` component via the `@sanity/image-url` builder. Replace raw Sanity CDN URLs with optimised image references throughout the app.

---

## Context

**Parent Feature:** Barbets Duet — Full Platform Build

When staff upload images via Sanity Studio, they are stored on Sanity's CDN as raw files. Without optimisation, these will be uncompressed full-resolution images that slow page loads. The `@sanity/image-url` builder generates optimised URLs with format conversion (webp/avif), dimension transformations, and hotspot-based cropping. Next.js `<Image>` then handles lazy loading and layout shift prevention.

This task is **Wave 5** — depends on T19 (Sanity Studio configured with image uploads).

---

## Requirements

1. Install `@sanity/image-url`
2. Create `lib/sanity/image.ts` — `imageUrl` builder and helper functions
3. Create `components/SanityImage.tsx` — a Next.js `<Image>` wrapper that accepts Sanity image references
4. Replace hardcoded Unsplash URLs in learning site components with `SanityImage` where data comes from Sanity
5. Configure `next.config.js` to allow Sanity CDN hostnames

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `@sanity/image-url` in `package.json`
- [ ] `lib/sanity/image.ts` exports `urlFor` builder function
- [ ] `components/SanityImage.tsx` exists and accepts Sanity image reference objects
- [ ] `next.config.js` includes `cdn.sanity.io` in `images.remotePatterns`
- [ ] Sanity images render as webp format (verify in Network tab)
- [ ] No layout shift from images (dimensions specified on all `<Image>` components)
- [ ] `npx tsc --noEmit` passes

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | modify | Add `@sanity/image-url` |
| `lib/sanity/image.ts` | create | Sanity image URL builder utilities |
| `components/SanityImage.tsx` | create | Next.js Image wrapper for Sanity images |
| `next.config.js` / `next.config.ts` | modify | Add Sanity CDN to allowed image domains |

---

## Implementation Guidance

### Install

```bash
npm install @sanity/image-url
```

### Image URL Builder

```typescript
// lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Convenience helpers:
export function urlForHero(source: SanityImageSource, width = 1600) {
  return urlFor(source).width(width).auto('format').quality(85).url();
}

export function urlForThumbnail(source: SanityImageSource, width = 400) {
  return urlFor(source).width(width).height(300).fit('crop').auto('format').quality(80).url();
}
```

### SanityImage Component

```tsx
// components/SanityImage.tsx
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface SanityImageProps {
  source: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  quality?: number;
  priority?: boolean;
}

export function SanityImage({
  source,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className,
  quality = 85,
  priority = false,
}: SanityImageProps) {
  const imageUrl = urlFor(source)
    .width(width)
    .height(fill ? undefined : height)
    .auto('format')
    .quality(quality)
    .url();

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
```

### Next.js Config Update

```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',  // keep existing Unsplash support
      },
    ],
  },
};
```

### Usage Pattern

When a component receives a Sanity image reference (from T20 queries):

```tsx
// Before (raw URL from lib/data):
<Image src={site.heroImage} alt={site.name} fill />

// After (Sanity image reference):
<SanityImage
  source={site.heroImage}  // Sanity image reference object
  alt={site.name}
  fill
  priority={true}  // hero images above fold
/>
```

Note: The `heroImage` field in Sanity will be a Sanity image reference object, not a URL string. The `SanityImage` component handles this conversion. When fetching from `lib/data/*.ts` (plain URLs), continue using `<Image src={url} />` directly.

---

## Boundaries

### Files You MUST NOT Touch

- `.env*`, `firebase-applet-config.json`, `firestore.rules`
- `components/ui/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| T19 | Sanity Studio with image CDN | Confirm Sanity `projectId` and CDN URL work |

### Downstream Impact

All Wave 6 components that display images should use `SanityImage`.

---

## Commit Guidelines

```
feat(sanity): add image pipeline with CDN delivery and SanityImage component

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npx tsc --noEmit` passes
- [ ] Upload an image via Studio → `SanityImage` renders it as webp
- [ ] Network tab: image served from `cdn.sanity.io`
- [ ] No layout shift (CLS = 0 for images with explicit dimensions)

---

*Generated by KARIMO Brief Writer*
*PRD: barbets-duet-full-build | Task: T22 | Wave: 5*
