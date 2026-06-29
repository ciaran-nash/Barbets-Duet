'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { LearningSite } from '@/types/learning-site';

interface SiteCardProps {
  site: LearningSite;
  isHovered: boolean;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export default function SiteCard({
  site,
  isHovered,
  isSelected,
  onHover,
  onLeave,
  cardRef,
}: SiteCardProps) {
  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={[
        'group relative rounded-2xl overflow-hidden bg-foreground/5 border transition-all duration-200',
        isSelected
          ? 'ring-2 ring-ring border-accent/40 scale-[1.01]'
          : isHovered
          ? 'border-accent/40 scale-[1.01] shadow-lg'
          : 'border-foreground/10 hover:border-accent/30',
      ].join(' ')}
    >
      <Link href={`/learning-sites/${site.slug}`} className="block">
        {/* Hero image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={site.heroImage}
            alt={site.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category pill */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-bark/80 backdrop-blur-sm text-wheat text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full">
              {site.category}
            </span>
          </div>
          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-4 right-4">
              <span className="flex items-center gap-1 bg-wheat text-bark text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-1 rounded-full">
                <MapPin className="w-2.5 h-2.5" />
                On Map
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold leading-tight mb-1 group-hover:text-accent transition-colors">
            {site.name}
          </h3>
          <p className="text-xs font-mono text-foreground/50 mb-3 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {site.location}
          </p>
          {site.overview && (
            <p className="text-sm font-sans text-foreground/70 leading-relaxed line-clamp-3 mb-4">
              {site.overview}
            </p>
          )}

          {/* Lead partners */}
          {site.leadPartners.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {site.leadPartners.slice(0, 2).map((partner) => (
                <span
                  key={partner}
                  className="text-[10px] font-sans text-foreground/50 bg-foreground/5 px-2 py-0.5 rounded-full"
                >
                  {partner}
                </span>
              ))}
              {site.leadPartners.length > 2 && (
                <span className="text-[10px] font-sans text-foreground/40">
                  +{site.leadPartners.length - 2} more
                </span>
              )}
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-accent group-hover:gap-2.5 transition-all">
            Visit Site <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </div>
  );
}
