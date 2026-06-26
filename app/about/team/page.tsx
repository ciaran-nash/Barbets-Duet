import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { TeamSection } from '@/components/about/TeamSection';
import { getCoreTeam, getSiteManagers } from '@/lib/data/team';
import { getTeamFromSanity } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Our Team | Barbets Duet',
  description: 'Meet the co-founders and Jumuiya site managers behind the 20-year Barbets Duet experiment in ecological restoration and economic innovation.',
};

export default async function TeamPage() {
  const sanityTeam = await getTeamFromSanity();
  const coreTeam = sanityTeam.length > 0 ? sanityTeam.filter((m) => m.isCoreTeam) : getCoreTeam();
  const siteManagers = sanityTeam.length > 0 ? sanityTeam.filter((m) => !m.isCoreTeam) : getSiteManagers();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <TeamSection coreTeam={coreTeam} siteManagers={siteManagers} />
      </main>
      <StickyFooter />
    </div>
  );
}
