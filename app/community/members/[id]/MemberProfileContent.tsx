'use client';

// ============================================================
// MemberProfileContent — Wave 6, Task C3
// ============================================================

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ChevronLeft } from 'lucide-react';

import ContributionFeed from '@/components/community/ContributionFeed';
import { MEMBER_ROLE_LABELS, MEMBER_ROLE_COLOURS } from '@/types/community';
import type { Profile, LearningSiteMembership } from '@/types/community';
import type { TrialAndErrorEntry } from '@/lib/sanity/queries';

// ── Sub-components ────────────────────────────────────────────

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = (name ?? '?')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <div className="w-24 h-24 rounded-full bg-viridian/10 flex items-center justify-center text-viridian font-serif text-3xl select-none">
      {initials || '?'}
    </div>
  );
}

function TierBadge({ role }: { role: string }) {
  const label = MEMBER_ROLE_LABELS[role as keyof typeof MEMBER_ROLE_LABELS] ?? role;
  const colour = MEMBER_ROLE_COLOURS[role as keyof typeof MEMBER_ROLE_COLOURS] ?? '#2C3E35';
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-white"
      style={{ backgroundColor: colour }}
    >
      {label}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────

interface MemberProfileContentProps {
  profile: Profile;
  memberships: LearningSiteMembership[];
  contributions: TrialAndErrorEntry[];
}

export default function MemberProfileContent({
  profile,
  memberships,
  contributions,
}: MemberProfileContentProps) {
  const displayName = profile.display_name ?? profile.email ?? 'Member';
  const primarySite = memberships.find((m) => m.is_primary) ?? memberships[0];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Back nav */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors font-sans mb-8 focus:outline-none focus:ring-2 focus:ring-viridian rounded"
      >
        <ChevronLeft className="w-4 h-4" />
        Community Network
      </Link>

      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        {/* Avatar */}
        {profile.avatar_url ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
            <Image
              src={profile.avatar_url}
              alt={displayName}
              fill
              sizes="96px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <AvatarPlaceholder name={displayName} />
        )}

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h1 className="font-serif font-bold text-3xl mb-2">{displayName}</h1>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <TierBadge role={profile.role} />
            {primarySite && (
              <span className="inline-flex items-center gap-1 text-xs text-foreground/50 font-sans">
                <MapPin className="w-3 h-3 shrink-0" />
                <Link
                  href={`/community/sites/${primarySite.site_slug}`}
                  className="hover:text-viridian transition-colors"
                >
                  {primarySite.site_name}
                </Link>
                {memberships.length > 1 && (
                  <span className="text-foreground/30">
                    &nbsp;+{memberships.length - 1} more
                  </span>
                )}
              </span>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm text-foreground/70 font-sans leading-relaxed max-w-prose">
              {profile.bio}
            </p>
          )}
        </div>
      </div>

      {/* Site affiliations */}
      {memberships.length > 0 && (
        <section className="mb-10">
          <h2 className="font-serif font-semibold text-lg mb-3">Affiliated Sites</h2>
          <div className="flex flex-wrap gap-2">
            {memberships.map((m) => (
              <Link
                key={m.id}
                href={`/community/sites/${m.site_slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-viridian/10 text-viridian text-xs font-sans hover:bg-viridian/20 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
              >
                {m.site_name}
                {m.is_primary && (
                  <span className="text-[9px] font-mono text-viridian/60">(primary)</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="border-t border-foreground/10 mb-10" />

      {/* Contributions feed */}
      <ContributionFeed
        entries={contributions}
        hideSiteFilter
        heading={`${displayName}'s Contributions`}
      />
    </main>
  );
}
