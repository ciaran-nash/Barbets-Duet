import { Metadata } from 'next';
import { learningSites } from '@/lib/data/learning-sites';
import SitesBrowse from '@/components/learning-sites/SitesBrowse';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';

export const metadata: Metadata = {
  title: 'Learning Sites | Barbets Duet',
  description:
    'Discover 13 real conservation learning sites across East Africa, UK, and USA. Explore the Jumuiya network of regenerative farming, ocean restoration, wetlands, and rewilding projects.',
};

export default function LearningStatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <SitesBrowse sites={learningSites} />
      </main>
      <StickyFooter />
    </div>
  );
}
