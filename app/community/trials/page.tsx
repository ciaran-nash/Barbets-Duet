// ============================================================
// /community/trials — Global T&E Feed
// Wave 6, Task C3
// ============================================================

import { Metadata } from 'next';
import ContributionFeed from '@/components/community/ContributionFeed';
import { searchContributions } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Trial & Error | Barbets Duet Community',
  description:
    'Member-contributed Trial & Error entries from across the Barbets Duet learning network.',
};

export default async function TrialsPage() {
  // Fetch all published entries (empty query = all)
  const entries = await searchContributions('');

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-viridian uppercase tracking-[0.2em] mb-3">
        Community Knowledge
      </p>
      <h1 className="font-serif font-bold text-5xl mb-4">Trial &amp; Error</h1>
      <p className="text-base text-foreground/60 font-sans max-w-xl mb-12">
        Real experiments, honest mistakes, and hard-won insights from Barbets Duet members across
        the network. The collective learns when individuals share.
      </p>
      <ContributionFeed entries={entries} />
    </main>
  );
}
