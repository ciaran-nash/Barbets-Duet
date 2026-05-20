'use client';

import { useRef, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LearningSite } from '@/types/learning-site';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// TODO: awaiting-credentials — NEXT_PUBLIC_STADIA_API_KEY
// When Stadia API key is available, replace the tile URL in the map style.
// The map will still render with open tiles in dev mode.
const STADIA_API_KEY = process.env.NEXT_PUBLIC_STADIA_API_KEY ?? '';

const MAP_STYLE = STADIA_API_KEY
  ? `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${STADIA_API_KEY}`
  : 'https://demotiles.maplibre.org/style.json'; // Fallback: open demo tiles (no key required)

interface SitesMapProps {
  sites: LearningSite[];
  activeSiteSlug?: string | null;
  onSiteClick?: (slug: string) => void;
  onSiteHover?: (slug: string | null) => void;
  popupSiteSlug?: string | null;
  onPopupClose?: () => void;
}

export default function SitesMap({
  sites,
  activeSiteSlug,
  onSiteClick,
  onSiteHover,
  popupSiteSlug,
  onPopupClose,
}: SitesMapProps) {
  const mapRef = useRef<MapRef | null>(null);

  // Only show sites that have coordinates
  const mappableSites = sites.filter(
    (s): s is LearningSite & { lat: number; lng: number } =>
      typeof s.lat === 'number' && typeof s.lng === 'number'
  );

  const popupSite = popupSiteSlug
    ? mappableSites.find((s) => s.slug === popupSiteSlug)
    : null;

  const handleMarkerClick = useCallback(
    (slug: string) => {
      onSiteClick?.(slug);
    },
    [onSiteClick]
  );

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Map */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 35,
          latitude: 0,
          zoom: 3,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />

        {/* Site markers */}
        {mappableSites.map((site) => {
          const isActive = activeSiteSlug === site.slug;
          const isPopup = popupSiteSlug === site.slug;

          return (
            <Marker
              key={site.slug}
              longitude={site.lng}
              latitude={site.lat}
              anchor="center"
            >
              <button
                onClick={() => handleMarkerClick(site.slug)}
                onMouseEnter={() => onSiteHover?.(site.slug)}
                onMouseLeave={() => onSiteHover?.(null)}
                className="group relative flex items-center justify-center focus:outline-none"
                aria-label={`${site.name} — ${site.location}`}
              >
                {/* Pulse ring for active/hover */}
                {(isActive || isPopup) && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-neon-lime/40" />
                )}

                {/* Marker dot */}
                <span
                  className={[
                    'relative block rounded-full border-2 transition-all duration-200',
                    isActive || isPopup
                      ? 'w-4 h-4 bg-neon-lime border-night-forest shadow-[0_0_12px_rgba(219,255,102,0.6)]'
                      : 'w-3 h-3 bg-viridian border-neon-lime/40 group-hover:bg-neon-lime group-hover:border-night-forest group-hover:w-4 group-hover:h-4',
                  ].join(' ')}
                />
              </button>
            </Marker>
          );
        })}

        {/* Popup */}
        {popupSite && popupSite.lat && popupSite.lng && (
          <Popup
            longitude={popupSite.lng}
            latitude={popupSite.lat}
            anchor="bottom"
            offset={16}
            onClose={onPopupClose}
            closeButton={false}
            className="karimo-map-popup"
          >
            <div className="bg-night-forest text-platinum rounded-xl p-4 min-w-[220px] max-w-[280px]">
              <button
                onClick={onPopupClose}
                className="absolute top-2 right-2 text-platinum/40 hover:text-platinum text-xs leading-none"
                aria-label="Close popup"
              >
                ✕
              </button>

              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neon-lime mb-1 block">
                {popupSite.category}
              </span>
              <h3 className="text-sm font-serif font-bold leading-tight mb-1">
                {popupSite.name}
              </h3>
              <p className="text-[11px] font-sans text-platinum/60 mb-3">
                {popupSite.location}
              </p>
              <Link
                href={`/learning-sites/${popupSite.slug}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold
                           bg-neon-lime text-night-forest px-3 py-1.5 rounded-full
                           hover:bg-neon-lime/90 transition-colors"
              >
                Visit Site <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Popup>
        )}
      </Map>

      {/* Attribution */}
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-platinum/30 pointer-events-none">
        &copy; Stadia Maps &copy; OpenStreetMap
      </div>
    </div>
  );
}
