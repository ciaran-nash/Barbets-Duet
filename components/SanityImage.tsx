/**
 * SanityImage — Next.js Image wrapper for Sanity CDN assets
 *
 * Drop-in replacement for the static img tags wherever Sanity image assets
 * are displayed. Automatically serves webp/avif, applies Next.js image
 * optimisation, and prevents layout shift by requiring width + height.
 *
 * Usage:
 *   import { SanityImage } from '@/components/SanityImage';
 *   <SanityImage image={site.heroImage} width={1200} height={600} alt="..." />
 *
 * For images where only a URL string is available (legacy static data),
 * use the standard Next.js <Image> component directly.
 */
import Image from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '@/lib/sanity/image';

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: SanityImageProps) {
  const src = urlFor(image)
    .width(width * 2) // 2x for retina
    .height(height * 2)
    .auto('format')
    .fit('max')
    .quality(80)
    .url();

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes ?? `(max-width: 768px) 100vw, ${width}px`}
    />
  );
}

/**
 * SanityImageFill — fills its parent container (use with position: relative parent)
 *
 * Usage:
 *   <div className="relative aspect-video">
 *     <SanityImageFill image={site.heroImage} alt="..." />
 *   </div>
 */
interface SanityImageFillProps {
  image: SanityImageSource;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SanityImageFill({
  image,
  alt,
  className,
  priority = false,
  sizes = '100vw',
}: SanityImageFillProps) {
  const src = urlFor(image).width(1600).auto('format').quality(80).url();

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: 'cover' }}
    />
  );
}
