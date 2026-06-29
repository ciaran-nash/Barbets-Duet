import type { Metadata } from 'next';
import { Suspense } from 'react';
import DonationForm from '@/components/donations/DonationForm';
import SupportUsBanner from './SupportUsBanner';

export const metadata: Metadata = {
  title: 'Support Us | Barbets Duet',
  description:
    'Donate to Barbets Duet and help fund ecological restoration and sustainable livelihoods across 13 partner learning sites worldwide.',
  openGraph: {
    title: 'Support Barbets Duet',
    description:
      'Your donation funds real restoration work — from mangrove replanting in Tanzania to watershed protection in Kenya.',
  },
};

/**
 * /support-us — Donations page.
 * Renders the donation form with Stripe Checkout integration (one-time payments).
 * Monthly giving is stubbed in the UI — implementation is post-launch.
 */
export default function SupportUsPage() {
  return (
    <main className="min-h-screen bg-band text-band-foreground">
      {/* ── Hero / trust section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 border-b border-band-border/8 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,244,245,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,244,245,0.025)_1px,transparent_1px)] bg-[size:6rem_6rem]" />

        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(219,255,102,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-foreground/35 mb-8 border border-band-border/10 px-5 py-2 rounded-full inline-block">
            [ Support our work ]
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-light leading-[0.9] tracking-tight mb-8">
            <span className="italic text-band-foreground/50">Fund the</span>
            <br />
            <span className="text-band-accent">Restoration</span>
          </h1>

          <p className="font-sans text-base text-band-foreground/60 leading-relaxed max-w-xl mx-auto">
            Every donation directly supports ecological restoration and sustainable livelihoods
            across 13 partner learning sites — from Cornwall to Tanzania to the shores of Lake Victoria.
          </p>
        </div>
      </section>

      {/* ── Main content: form + sidebar ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Donation form — main column */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-foreground/35 mb-3">
                Make a donation
              </p>
              <h2 className="font-serif text-3xl font-light">Choose your contribution</h2>
            </div>

            <Suspense fallback={<div className="h-96 animate-pulse bg-white/5" />}>
              <DonationForm />
            </Suspense>
          </div>

          {/* Sidebar — impact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-foreground/35 mb-6">
                Where your money goes
              </p>
              <div className="space-y-5">
                {[
                  {
                    amount: '$25',
                    impact: 'Plants 12 native trees along a stream bank',
                  },
                  {
                    amount: '$50',
                    impact: 'Funds a week of youth animal husbandry training',
                  },
                  {
                    amount: '$100',
                    impact: 'Supports seaweed cooperative processing equipment',
                  },
                  {
                    amount: '$250',
                    impact: 'Contributes to water harvesting dam infrastructure',
                  },
                ].map(({ amount, impact }) => (
                  <div key={amount} className="flex gap-4 items-start">
                    <span className="font-serif text-xl text-band-accent shrink-0 w-14">{amount}</span>
                    <p className="font-sans text-sm text-band-foreground/60 leading-relaxed pt-1">{impact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-band-border/10 pt-8">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-foreground/35 mb-4">
                Our network
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '13', label: 'Learning sites' },
                  { value: '15+', label: 'Years of work' },
                  { value: '8', label: 'Countries' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center border border-band-border/10 py-4 px-2">
                    <p className="font-serif text-2xl text-band-accent">{value}</p>
                    <p className="font-sans text-[10px] text-band-foreground/45 mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-band-border/10 px-6 py-6 bg-white/3">
              <p className="font-serif text-sm italic text-band-foreground/70 leading-relaxed mb-4">
                &ldquo;The donation helped us rebuild what was lost and plant what the land needs next.&rdquo;
              </p>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-band-foreground/35">
                — James Magode Ikuya, Magode Farm, Uganda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Success / cancellation banner ───────────────────────────────── */}
      {/* Suspense boundary required: SupportUsBanner uses useSearchParams() */}
      <Suspense fallback={null}>
        <SupportUsBanner />
      </Suspense>
    </main>
  );
}
