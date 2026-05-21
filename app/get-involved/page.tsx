import { Metadata } from 'next';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import VolunteerForm from '@/components/forms/VolunteerForm';

export const metadata: Metadata = {
  title: 'Get Involved | Barbets Duet',
  description:
    'Apply to volunteer with a Jumuiya learning site. Share your skills and join a global network of conservation practitioners across East Africa, the UK, and the USA.',
};

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <section className="max-w-2xl mx-auto px-6 py-16">
          {/* Page header */}
          <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-4">
            Join the Jumuiya
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
            Get Involved
          </h1>
          <p className="text-base font-sans text-foreground/60 mb-12 max-w-lg">
            Apply to volunteer at one of 13 real conservation learning sites. Tell us about
            your background and we&apos;ll match you with the right opportunity.
          </p>

          <VolunteerForm />
        </section>
      </main>
      <StickyFooter />
    </div>
  );
}
