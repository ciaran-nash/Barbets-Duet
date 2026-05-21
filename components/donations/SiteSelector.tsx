'use client';

import { learningSites } from '@/lib/data/learning-sites';
import { MapPin } from 'lucide-react';

interface SiteSelectorProps {
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
}

/**
 * SiteSelector — optional dropdown letting donors tag their donation to one
 * of the 13 Barbets Duet learning sites. The first option ("General organisation")
 * represents an untagged donation.
 */
export default function SiteSelector({ selectedSlug, onSelect }: SiteSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-platinum/50">
        Direct your donation (optional)
      </label>

      {/* Dropdown selector */}
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <MapPin size={14} className="text-neon-lime/60" />
        </div>
        <select
          value={selectedSlug ?? ''}
          onChange={(e) => onSelect(e.target.value || null)}
          className="w-full appearance-none bg-white/5 border border-platinum/15 rounded-none pl-10 pr-8 py-3 font-sans text-sm text-platinum/90 focus:outline-none focus:border-neon-lime/50 focus:ring-1 focus:ring-neon-lime/20 transition-colors cursor-pointer"
        >
          <option value="">General organisation — Barbets Duet</option>
          {learningSites.map((site) => (
            <option key={site.slug} value={site.slug}>
              {site.name} — {site.location}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-platinum/40" />
          </svg>
        </div>
      </div>

      {/* Selected site callout */}
      {selectedSlug && (() => {
        const site = learningSites.find((s) => s.slug === selectedSlug);
        if (!site) return null;
        return (
          <div className="border border-neon-lime/20 bg-neon-lime/5 px-4 py-3">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-lime/80 mb-1">
              Selected site
            </p>
            <p className="font-serif text-sm text-platinum/90">{site.name}</p>
            <p className="font-sans text-xs text-platinum/50 mt-0.5">{site.location}</p>
          </div>
        );
      })()}
    </div>
  );
}
