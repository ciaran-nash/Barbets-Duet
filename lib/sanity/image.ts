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

