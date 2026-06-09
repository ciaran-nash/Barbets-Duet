// ============================================================
// Community Network Types — Wave 5, Task A1
// ============================================================
// Mirrors supabase/migrations/20260609_001_community_schema.sql
// ============================================================

/**
 * Four-tier Barbets Duet membership hierarchy.
 * Matches the `member_role` Postgres enum.
 */
export type MemberRole =
  | 'site_coordinator'
  | 'junior_member'
  | 'barbets_friend'
  | 'local_community';

/** Human-readable labels for each tier — use in UI. */
export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  site_coordinator: 'Site Coordinator',
  junior_member: 'Junior Member',
  barbets_friend: "Barbet's Friend",
  local_community: 'Local Community',
};

/** Badge colour tokens for each tier (maps to Barbets brand palette). */
export const MEMBER_ROLE_COLOURS: Record<MemberRole, string> = {
  site_coordinator: '#1B4332',  // dark forest green
  junior_member:    '#2D6A4F',  // mid green
  barbets_friend:   '#74C69D',  // light green
  local_community:  '#B7E4C7',  // pale green
};

/** Pentangle group identifiers — geographic clusters. */
export type PentangleGroup =
  | 'east_african'
  | 'usa_ne'
  | 'uk_cornwall'
  | 'india'
  | null;

export const PENTANGLE_GROUP_LABELS: Record<NonNullable<PentangleGroup>, string> = {
  east_african: 'East African',
  usa_ne:       'USA North-East',
  uk_cornwall:  'UK Cornwall',
  india:        'India',
};

/**
 * Row type for `profiles` table.
 * Returned by Supabase queries — use for typing supabase.from('profiles').select().
 */
export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: MemberRole;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Row type for `learning_site_memberships` table.
 */
export interface LearningSiteMembership {
  id: string;
  user_id: string;
  site_slug: string;
  site_name: string;
  pentangle_group: PentangleGroup;
  is_primary: boolean;
  joined_at: string;
}

/**
 * Profile with memberships joined — used in dashboard/member pages.
 */
export interface ProfileWithMemberships extends Profile {
  memberships: LearningSiteMembership[];
}
