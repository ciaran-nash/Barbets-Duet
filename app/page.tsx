import { Metadata } from 'next';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import About from '@/components/About';
import { RadialOrbitalTimelineDemo } from '@/components/ui/demo';
import Mechanism from '@/components/Mechanism';
import CaseStudies from '@/components/CaseStudies';
import Network from '@/components/Network';
import ImpactSection from '@/components/ImpactSection';
import LearningSites from '@/components/LearningSites';
import FAQSection from '@/components/FAQSection';
import CTA from '@/components/CTA';
import { Feature108Demo } from '@/components/Feature108Demo';
import { Blog7Demo } from '@/components/Blog7Demo';
import { StickyFooter } from '@/components/ui/sticky-footer';

export const metadata: Metadata = {
  title: 'Home | Barbets Duet Global Learning Sites',
  description: 'Welcome to Barbets Duet. Explore our global network of learning sites combining sustainable economic activities with ecosystem restoration and community empowerment.',
  openGraph: {
    title: 'Home | Barbets Duet Global Learning Sites',
    description: 'Welcome to Barbets Duet. Explore our global network of learning sites combining sustainable economic activities with ecosystem restoration and community empowerment.',
    siteName: 'Barbets Duet',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-platinum selection:bg-neon-lime selection:text-night-forest">
      <Header />
      <Hero />
      <Mission />
      <About />
      <RadialOrbitalTimelineDemo />
      <Mechanism />
      <Network />
      <ImpactSection />
      <LearningSites />
      <CaseStudies />
      <FAQSection />
      <Feature108Demo />
      <Blog7Demo />
      <CTA />
      <StickyFooter />
    </main>
  );
}
