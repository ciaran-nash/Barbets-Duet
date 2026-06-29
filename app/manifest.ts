import type { MetadataRoute } from 'next';

// PWA manifest (Next.js native metadata route → /manifest.webmanifest).
// Brand: Night Forest background (#06211A) + Neon Lime accent (#DBFF66).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Barbets Duet — Global Learning Sites',
    short_name: 'Barbets Duet',
    description:
      'A global network of ecological-restoration learning sites integrating economic activity with environmental conservation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2A1F14',
    theme_color: '#2A1F14',
    orientation: 'portrait-primary',
    categories: ['education', 'environment', 'nonprofit'],
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'maskable' },
    ],
  };
}
