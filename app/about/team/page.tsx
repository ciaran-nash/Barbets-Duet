import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { TeamSection } from '@/components/about/TeamSection';
import { getCoreTeam, getSiteManagers } from '@/lib/data/team';

export const metadata: Metadata = {
  title: 'Our Team | Barbets Duet',
  description: 'Meet the co-founders and Jumuiya site managers behind the 20-year Barbets Duet experiment in ecological restoration and economic innovation.',
};

export default function TeamPage() {
  const coreTeam = getCoreTeam();
  const siteManagers = getSiteManagers();

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
