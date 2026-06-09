// ============================================================
// /community/contribute — T&E Submission Page
// Wave 6, Task C2
// ============================================================
// Protected: requires authentication.
// Server component — auth check + site list pre-fetch.
// ============================================================

import { Metadata } from 'next';
import { requireServerAuth } from '@/lib/supabase-server';
import ContributeClient from './ContributeClient';
import { learningSites } from '@/lib/data/learning-sites';

export const metadata: Metadata = {
  title: 'Share Your Story | Barbets Duet Community',
  description:
    'Submit a Trial & Error entry — share what you tried, your mistakes, your learning, and who you would invite into your Barbet circle.',
};

export default async function ContributePage() {
  // Require auth — redirects to sign-in if unauthenticated
  const { user, profile } = await requireServerAuth('/community/contribute');

  // Pass minimal site list to populate the site assignment dropdown
  const siteOptions = learningSites.map((s) => ({
    slug: s.slug,
    name: s.name,
  }));

  return (
    <ContributeClient
      userId={user.id}
      displayName={profile?.display_name ?? user.email ?? 'Member'}
      siteOptions={siteOptions}
    />
  );
}
