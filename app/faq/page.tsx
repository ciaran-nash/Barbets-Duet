import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ | Barbets Duet',
  description: 'Answers to frequently asked questions about Barbets Duet projects, volunteering, partnerships, and impact.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <FAQSection />
      </main>
      <StickyFooter />
    </div>
  );
}
