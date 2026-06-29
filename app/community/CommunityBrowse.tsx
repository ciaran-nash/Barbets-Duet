'use client';

// ============================================================
// CommunityBrowse — Wave 6, Task B3
// ============================================================
// /community page client shell:
//   - Bento-grid hero (impact stats + montage)
//   - 50/50 sticky-map + scrollable SiteCard panel
//   - Filter tabs: region, challenge type, restoration type
// Reuses SitesBrowse and SitesMap from learning-sites.
// ============================================================

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { TreePine, Users, Globe, ArrowRight } from 'lucide-react';
import SiteCard from '@/components/learning-sites/SiteCard';

// Lazy-load the map (maplibre-gl is heavy) — keep it out of the initial bundle.
const SitesMap = dynamic(() => import('@/components/learning-sites/SitesMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] animate-pulse bg-foreground/5" aria-hidden />
  ),
});
import type { LearningSite } from '@/types/learning-site';

// ── Impact stats ────────────────────────────────────────────

const IMPACT_STATS = [
  { label: 'Learning Sites', value: '13', icon: Globe },
  { label: 'Hectares Restored', value: '2,400+', icon: TreePine },
  { label: 'Active Members', value: '120+', icon: Users },
];

// ── Filter types ─────────────────────────────────────────────

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

// ── Bento hero section ───────────────────────────────────────

function BentoHero() {
  return (
    <section className="px-6 pt-10 pb-8 max-w-6xl mx-auto">
      {/* Eyebrow */}
      <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-3">
        The Jumuiya Network
      </p>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 max-w-2xl">
        A Living Network of Land Stewards
      </h1>
      <p className="text-base font-sans text-foreground/60 max-w-xl mb-10">
        Thirteen real-world sites across East Africa, the UK, and the USA — each a regenerative
        classroom practising the 4 Returns model of ecological and community restoration.
      </p>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Large media tile */}
        <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden min-h-[220px] bg-foreground/10">
          <Image
            src="https://picsum.photos/seed/community-hero/800/500"
            alt="Community of land stewards"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bark/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white/90 font-serif font-semibold text-lg leading-snug">
              Practising Jumuiya — horizontal governance across borders
            </p>
          </div>
        </div>

        {/* Impact stat tiles */}
        {IMPACT_STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl bg-accent/5 border border-accent/10 p-5 flex flex-col justify-between min-h-[100px]"
          >
            <Icon className="w-5 h-5 text-accent mb-3" />
            <div>
              <p className="font-serif text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-foreground/50 font-sans mt-0.5">{label}</p>
            </div>
          </div>
        ))}

        {/* Join CTA tile */}
        <div className="col-span-2 md:col-span-1 rounded-2xl bg-secondary flex flex-col justify-between p-5 min-h-[100px]">
          <p className="font-serif font-semibold text-foreground text-base leading-snug">
            Become a member
          </p>
          <Link
            href="/community/sign-up"
            className="inline-flex items-center gap-1.5 text-foreground text-sm font-semibold mt-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent rounded"
          >
            Join the network <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main component ───────────────────────────────────────────

interface CommunityBrowseProps {
  sites: LearningSite[];
}

export default function CommunityBrowse({ sites }: CommunityBrowseProps) {
  const [hoveredSlug, setHoveredSlug]   = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [popupSlug, setPopupSlug]       = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');

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

  const handlePinClick = useCallback((slug: string) => {
    setSelectedSlug(slug);
    setPopupSlug(slug);
    const ref = cardRefs.current[slug];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

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
    <>
      <BentoHero />

      {/* Divider */}
      <div className="border-t border-foreground/10 mx-6 mb-0" />

      {/* Map + Cards */}
      <div className="flex flex-col lg:flex-row">
        {/* Sticky map */}
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

        {/* Scrollable cards */}
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
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'text-[10px] font-mono',
                    regionFilter === value ? 'text-white/70' : 'text-foreground/40',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Site cards */}
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
    </>
  );
}
