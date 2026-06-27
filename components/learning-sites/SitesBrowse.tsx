'use client';

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { LearningSite } from '@/types/learning-site';
import SiteCard from './SiteCard';

// Lazy-load the map (maplibre-gl is heavy) — keep it out of the initial bundle.
const SitesMap = dynamic(() => import('./SitesMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] animate-pulse bg-night-forest/5" aria-hidden />
  ),
});

interface SitesBrowseProps {
  sites: LearningSite[];
}

type RegionFilter = 'all' | 'east-africa' | 'international';

const EAST_AFRICA_SLUGS = [
  'molo-magode-farm',
  'lukenya-zumula-farm',
  'seme',
  'msichoke-seaweed-growers',
  'mwasama-primary-school',
  'himo',
  'sikia-community-dam',
  'arboretum-kajokoby',
  'cichlid-breeding',
  'rufiji',
  'nkoroi',
];

export default function SitesBrowse({ sites }: SitesBrowseProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [popupSlug, setPopupSlug] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');

  // Refs for scrolling to cards on pin click
  const cardRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  const getCardRef = useCallback(
    (slug: string): React.RefObject<HTMLDivElement | null> => {
      if (!cardRefs.current[slug]) {
        cardRefs.current[slug] = { current: null };
      }
      return cardRefs.current[slug];
    },
    []
  );

  const filteredSites = sites.filter((s) => {
    if (regionFilter === 'east-africa') return EAST_AFRICA_SLUGS.includes(s.slug);
    if (regionFilter === 'international') return !EAST_AFRICA_SLUGS.includes(s.slug);
    return true;
  });

  const handlePinClick = useCallback(
    (slug: string) => {
      setSelectedSlug(slug);
      setPopupSlug(slug);
      // Scroll the corresponding card into view
      const ref = cardRefs.current[slug];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    []
  );

  const handlePopupClose = useCallback(() => {
    setPopupSlug(null);
  }, []);

  const FILTER_OPTIONS: { label: string; value: RegionFilter; count: number }[] = [
    { label: 'All Sites', value: 'all', count: sites.length },
    {
      label: 'East Africa',
      value: 'east-africa',
      count: sites.filter((s) => EAST_AFRICA_SLUGS.includes(s.slug)).length,
    },
    {
      label: 'International',
      value: 'international',
      count: sites.filter((s) => !EAST_AFRICA_SLUGS.includes(s.slug)).length,
    },
  ];

  return (
    <section className="min-h-screen">
      {/* Page header */}
      <div className="px-6 pt-10 pb-6 max-w-6xl mx-auto">
        <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-3">
          The Jumuiya Network
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
          Learning Sites
        </h1>
        <p className="text-base font-sans text-foreground/60 max-w-xl">
          Thirteen real-world conservation sites across East Africa, the UK, and the USA — each a
          living classroom for ecological restoration.
        </p>
      </div>

      {/* Map + Cards layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Map — sticky on desktop, full width on mobile */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-6rem)]">
          <div className="h-[50vw] min-h-[280px] lg:h-full">
            <SitesMap
              sites={filteredSites}
              activeSiteSlug={hoveredSlug ?? selectedSlug}
              onSiteClick={handlePinClick}
              onSiteHover={setHoveredSlug}
              popupSiteSlug={popupSlug}
              onPopupClose={handlePopupClose}
            />
          </div>
        </div>

        {/* Cards panel — scrollable */}
        <div className="w-full lg:w-1/2 px-6 py-8 lg:py-12 overflow-y-auto">
          {/* Region filter tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {FILTER_OPTIONS.map(({ label, value, count }) => (
              <button
                key={value}
                onClick={() => setRegionFilter(value)}
                className={[
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-150',
                  regionFilter === value
                    ? 'bg-accent text-night-forest'
                    : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'text-[10px] font-mono',
                    regionFilter === value ? 'text-night-forest/70' : 'text-foreground/40',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Site card grid */}
          <div className="grid gap-6">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.slug}
                site={site}
                isHovered={hoveredSlug === site.slug}
                isSelected={selectedSlug === site.slug}
                onHover={() => setHoveredSlug(site.slug)}
                onLeave={() => setHoveredSlug(null)}
                cardRef={getCardRef(site.slug)}
              />
            ))}
          </div>

          {filteredSites.length === 0 && (
            <p className="text-center text-foreground/40 font-sans py-12">
              No sites match the selected filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
