'use client';

// ============================================================
// ContributionFeed — Wave 6, Task C3
// ============================================================
// Filterable T&E entry list.
// Filters: site, author tier, date, challenge type.
// Used on:
//   - /community/sites/[slug] (embedded, site-scoped)
//   - /community/trials (global feed)
//   - /community/members/[id] (member-scoped)
// ============================================================

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, X, Calendar, MapPin, Tag } from 'lucide-react';
import type { TrialAndErrorEntry } from '@/lib/sanity/queries';
import { MEMBER_ROLE_LABELS, type MemberRole } from '@/types/community';

// ── Tag pill ─────────────────────────────────────────────────

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-all duration-150',
        active
          ? 'bg-viridian text-white'
          : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground',
      ].join(' ')}
    >
      {label}
      {active && <X className="w-3 h-3 ml-0.5" />}
    </button>
  );
}

// ── Entry card ───────────────────────────────────────────────

function EntryCard({ entry }: { entry: TrialAndErrorEntry }) {
  const date = entry.publishedAt
    ? new Date(entry.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <article
      className="rounded-2xl border border-foreground/10 bg-night-forest/5 p-5 hover:border-viridian/30 transition-all duration-150"
      aria-label={entry.title}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <Link
            href={`/community/trials/${entry.slug}`}
            className="font-serif font-semibold text-base leading-snug hover:text-viridian transition-colors focus:outline-none focus:ring-2 focus:ring-viridian rounded"
          >
            {entry.title}
          </Link>
          <div className="flex items-center flex-wrap gap-3 mt-1.5 text-xs text-foreground/50 font-sans">
            {entry.siteSlug && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <Link
                  href={`/community/sites/${entry.siteSlug}`}
                  className="hover:text-viridian transition-colors"
                >
                  {entry.siteSlug.replace(/-/g, ' ')}
                </Link>
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Prompt 1 preview */}
      {entry.prompt1 && entry.prompt1.length > 0 && (
        <div className="text-sm text-foreground/70 font-sans mb-3 line-clamp-3">
          <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-widest mb-1">
            What they tried
          </p>
          {/* Render first block's text content for preview */}
          <p>
            {(entry.prompt1[0] as { children?: { text?: string }[] })?.children
              ?.map((c) => c.text ?? '')
              .join('') ?? ''}
          </p>
        </div>
      )}

      {/* Tags */}
      {(entry.challengeType?.length > 0 || entry.propertyRightsRegime) && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.challengeType?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-viridian/10 text-viridian text-[10px] font-mono uppercase tracking-wide"
            >
              <Tag className="w-2.5 h-2.5" />
              {t.replace(/_/g, ' ')}
            </span>
          ))}
          {entry.propertyRightsRegime && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neon-lime/20 text-night-forest text-[10px] font-mono uppercase tracking-wide">
              {entry.propertyRightsRegime}
            </span>
          )}
        </div>
      )}
    </article>
  );
}

// ── Empty state ───────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="rounded-2xl border border-foreground/10 p-10 text-center">
      <p className="text-foreground/40 font-sans text-sm">
        {filtered
          ? 'No entries match the selected filters.'
          : 'No Trial & Error entries yet. Be the first to contribute.'}
      </p>
      <Link
        href="/community/contribute"
        className="inline-flex mt-4 px-4 py-2 rounded-full bg-viridian text-white text-sm font-sans font-medium hover:bg-viridian/80 transition-colors focus:outline-none focus:ring-2 focus:ring-viridian"
      >
        Add your story
      </Link>
    </div>
  );
}

// ── Filter state ──────────────────────────────────────────────

type SortOrder = 'newest' | 'oldest';

interface FilterState {
  site: string | null;
  authorTier: MemberRole | null;
  challengeType: string | null;
  propertyRights: string | null;
  sortOrder: SortOrder;
}

// ── Main component ────────────────────────────────────────────

interface ContributionFeedProps {
  entries: TrialAndErrorEntry[];
  /** When true, hide site filter (already scoped to a site) */
  hideSiteFilter?: boolean;
  /** Override heading */
  heading?: string;
}

export default function ContributionFeed({
  entries,
  hideSiteFilter = false,
  heading = 'Trial & Error',
}: ContributionFeedProps) {
  const [filters, setFilters] = useState<FilterState>({
    site: null,
    authorTier: null,
    challengeType: null,
    propertyRights: null,
    sortOrder: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique filter values from entries
  const allSites = useMemo(
    () => [...new Set(entries.map((e) => e.siteSlug).filter(Boolean))],
    [entries]
  );
  const allChallengeTypes = useMemo(
    () => [...new Set(entries.flatMap((e) => e.challengeType ?? []))],
    [entries]
  );
  const allPropertyRights = useMemo(
    () => [...new Set(entries.map((e) => e.propertyRightsRegime).filter(Boolean))],
    [entries]
  );

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (filters.site) {
      result = result.filter((e) => e.siteSlug === filters.site);
    }
    if (filters.challengeType) {
      result = result.filter((e) =>
        e.challengeType?.includes(filters.challengeType!)
      );
    }
    if (filters.propertyRights) {
      result = result.filter(
        (e) => e.propertyRightsRegime === filters.propertyRights
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return filters.sortOrder === 'newest' ? bDate - aDate : aDate - bDate;
    });

    return result;
  }, [entries, filters]);

  const hasActiveFilters =
    filters.site || filters.challengeType || filters.propertyRights;

  const clearFilters = () =>
    setFilters((f) => ({ ...f, site: null, challengeType: null, propertyRights: null }));

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-serif font-bold text-2xl mb-0.5">{heading}</h2>
          <p className="text-xs text-foreground/50 font-sans">
            {filteredEntries.length} entr{filteredEntries.length !== 1 ? 'ies' : 'y'}
            {hasActiveFilters ? ' (filtered)' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <select
            value={filters.sortOrder}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortOrder: e.target.value as SortOrder }))
            }
            className="px-3 py-1.5 rounded-full bg-foreground/5 text-sm font-sans text-foreground/70 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-viridian"
            aria-label="Sort order"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={[
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-all border',
              showFilters
                ? 'bg-viridian text-white border-viridian'
                : 'bg-foreground/5 text-foreground/60 border-foreground/10 hover:bg-foreground/10',
            ].join(' ')}
            aria-expanded={showFilters}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
            {hasActiveFilters && (
              <span className="w-4 h-4 rounded-full bg-neon-lime text-night-forest text-[9px] font-bold flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="rounded-2xl border border-foreground/10 bg-night-forest/5 p-4 mb-6 space-y-4">
          {/* Site filter */}
          {!hideSiteFilter && allSites.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-2">
                Site
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allSites.map((s) => (
                  <TagPill
                    key={s}
                    label={s.replace(/-/g, ' ')}
                    active={filters.site === s}
                    onClick={() =>
                      setFilters((f) => ({ ...f, site: f.site === s ? null : s }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Challenge type filter */}
          {allChallengeTypes.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-2">
                Challenge Type
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allChallengeTypes.map((ct) => (
                  <TagPill
                    key={ct}
                    label={ct.replace(/_/g, ' ')}
                    active={filters.challengeType === ct}
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        challengeType: f.challengeType === ct ? null : ct,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Property rights filter */}
          {allPropertyRights.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest mb-2">
                Property Rights
              </p>
              <div className="flex flex-wrap gap-1.5">
                {allPropertyRights.map((pr) => (
                  <TagPill
                    key={pr!}
                    label={pr!.replace(/_/g, ' ')}
                    active={filters.propertyRights === pr}
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        propertyRights: f.propertyRights === pr ? null : pr!,
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-foreground/40 hover:text-foreground transition-colors font-sans underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Entry list */}
      {filteredEntries.length === 0 ? (
        <EmptyState filtered={!!hasActiveFilters} />
      ) : (
        <div className="grid gap-4">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </section>
  );
}
