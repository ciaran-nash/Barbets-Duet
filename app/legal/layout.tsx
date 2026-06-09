import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { ScrollGlow } from '@/components/motion/ScrollGlow';

export const metadata: Metadata = {
  title: 'Legal | Barbets Duet',
  description: 'Legal information for Barbets Duet, including privacy policy, terms of service, and cookies policy.',
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />

      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.1} size={1000} />

        <div className="pt-48 pb-48 px-6">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      <StickyFooter />
    </div>
  );
}
