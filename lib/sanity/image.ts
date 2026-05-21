/**
 * Sanity image URL builder
 *
 * Generates optimised image URLs from Sanity image assets via the Sanity CDN.
 * Automatically produces webp/avif formats via the ?auto=format query parameter.
 *
 * Usage:
 *   import { urlFor } from '@/lib/sanity/image';
 *   const src = urlFor(image).width(800).url();
 */
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Generate a responsive image URL with sensible defaults:
 * - auto=format: serves webp to browsers that support it, avif where supported
 * - fit=max: never upscales, preserves aspect ratio
 * - q=80: quality balance for CDN delivery
 */
export function urlForOptimised(
  source: SanityImageSource,
  width: number,
  height?: number
): string {
  let img = builder.image(source).width(width).auto('format').fit('max').quality(80);
  if (height) {
    img = img.height(height);
  }
  return img.url();
}
