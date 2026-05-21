import { Metadata } from 'next';
import { learningSites as staticSites } from '@/lib/data/learning-sites';
import { getAllLearningSitesFromSanity } from '@/lib/sanity/queries';
import SitesBrowse from '@/components/learning-sites/SitesBrowse';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

export const metadata: Metadata = {
  title: 'Learning Sites | Barbets Duet',
  description:
    'Discover 13 real conservation learning sites across East Africa, UK, and USA. Explore the Jumuiya network of regenerative farming, ocean restoration, wetlands, and rewilding projects.',
};

export default async function LearningStatesPage() {
  // Prefer Sanity data; fall back to static data if CMS not yet configured
  const sanitySites = await getAllLearningSitesFromSanity();
  const sites = sanitySites.length > 0 ? sanitySites : staticSites;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <SitesBrowse sites={sites} />
      </main>
      <StickyFooter />
    </div>
  );
}
