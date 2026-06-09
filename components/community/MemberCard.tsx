'use client';

// ============================================================
// MemberCard — Wave 6, Task B3
// ============================================================
// Forked from SiteCard. Displays a community member profile:
// avatar, display name, tier badge, affiliated sites, bio,
// and contribution count.
// ============================================================

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Profile, LearningSiteMembership, MemberRole } from '@/types/community';
import { MEMBER_ROLE_LABELS, MEMBER_ROLE_COLOURS } from '@/types/community';

// ── Placeholder avatar ──────────────────────────────────────

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = (name ?? '?')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <div className="w-14 h-14 rounded-full bg-viridian/10 flex items-center justify-center text-viridian font-serif text-lg select-none shrink-0">
      {initials || '?'}
    </div>
  );
}

// ── Tier badge ──────────────────────────────────────────────

function TierBadge({ role }: { role: MemberRole }) {
  const label = MEMBER_ROLE_LABELS[role] ?? role;
  const colour = MEMBER_ROLE_COLOURS[role] ?? '#2C3E35';
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white"
      style={{ backgroundColor: colour }}
    >
      {label}
    </span>
  );
}

// ── Props ───────────────────────────────────────────────────

export interface MemberCardData {
  profile: Profile;
  memberships: LearningSiteMembership[];
  contributionCount?: number;
}

interface MemberCardProps {
  member: MemberCardData;
  isHovered?: boolean;
  isSelected?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

// ── Component ───────────────────────────────────────────────

export default function MemberCard({
  member,
  isHovered = false,
  isSelected = false,
  onHover,
  onLeave,
  cardRef,
}: MemberCardProps) {
  const { profile, memberships, contributionCount = 0 } = member;
  const displayName = profile.display_name ?? profile.email ?? 'Unknown Member';
  const primarySite = memberships.find((m) => m.is_primary) ?? memberships[0];

  return (
    <div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={[
        'group relative rounded-2xl overflow-hidden bg-night-forest/5 border transition-all duration-200',
        isSelected
          ? 'ring-2 ring-neon-lime border-neon-lime/40 scale-[1.01]'
          : isHovered
          ? 'border-viridian/40 scale-[1.01] shadow-lg'
          : 'border-foreground/10 hover:border-viridian/30',
      ].join(' ')}
    >
      <Link
        href={`/community/members/${profile.id}`}
        className="block p-5 focus:outline-none focus:ring-2 focus:ring-viridian rounded-2xl"
      >
        {/* Top row: avatar + name + badge */}
        <div className="flex items-start gap-4 mb-3">
          {profile.avatar_url ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
              <Image
                src={profile.avatar_url}
                alt={displayName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          ) : (
            <AvatarPlaceholder name={displayName} />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-lg leading-tight truncate mb-1">
              {displayName}
            </h3>
            <TierBadge role={profile.role} />
          </div>

          <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-viridian transition-colors shrink-0 mt-1" />
        </div>

        {/* Bio snippet */}
        {profile.bio && (
          <p className="text-sm text-foreground/60 font-sans line-clamp-2 mb-3">
            {profile.bio}
          </p>
        )}

        {/* Site affiliation */}
        {primarySite && (
          <div className="flex items-center gap-1.5 text-xs text-foreground/50 font-sans mb-1">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{primarySite.site_name}</span>
            {memberships.length > 1 && (
              <span className="text-foreground/40">
                +{memberships.length - 1} more
              </span>
            )}
          </div>
        )}

        {/* Contribution count */}
        {contributionCount > 0 && (
          <p className="text-xs text-viridian font-mono mt-2">
            {contributionCount} contribution{contributionCount !== 1 ? 's' : ''}
          </p>
        )}
      </Link>
    </div>
  );
}
