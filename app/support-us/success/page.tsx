import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You | Barbets Duet',
  description: 'Your donation to Barbets Duet has been received. Thank you for supporting ecological restoration.',
};

/**
 * /support-us/success — Post-payment confirmation page.
 * Stripe redirects here after a successful one-time checkout session.
 * PayPal redirects here with ?provider=paypal&token=<orderId> — the order is
 * captured server-side before rendering.
 */
export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; token?: string }>;
}) {
  const params = await searchParams;

  let paypalFailed = false;
  if (params.provider === 'paypal' && params.token) {
    try {
      const { captureOrder } = await import('@/lib/paypal');
      await captureOrder(params.token);
    } catch (err) {
      console.error('[donation-success] PayPal capture failed:', err instanceof Error ? err.message : err);
      paypalFailed = true;
    }
  }
  const isPayPal = params.provider === 'paypal' && !paypalFailed;

  if (paypalFailed) {
    return (
      <main className="min-h-screen bg-band text-band-foreground flex items-center justify-center px-6">
        <div className="relative z-10 max-w-lg w-full text-center space-y-6">
          <h1 className="font-serif text-4xl font-light">Payment not completed</h1>
          <p className="font-sans text-base text-band-foreground/60 leading-relaxed">
            We couldn&apos;t confirm your PayPal payment. No funds were taken if the payment didn&apos;t
            complete. Please try again, or use the card option.
          </p>
          <Link
            href="/support-us"
            className="inline-block px-8 py-3.5 bg-band-accent text-band font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-band-accent/90 active:scale-[0.98]"
          >
            Back to donations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-band text-band-foreground flex items-center justify-center px-6">
      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(244,244,245,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,244,245,0.025)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      {/* Radial glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(219,255,102,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border border-band-accent/30 bg-band-accent/10 flex items-center justify-center">
            <CheckCircle2 size={36} className="text-band-accent" />
          </div>
        </div>

        {/* Eyebrow */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-band-accent/60 border border-band-accent/15 px-5 py-2 rounded-full inline-block">
          [ Donation confirmed ]
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-tight mb-5">
            <span className="italic text-band-foreground/50">Thank</span>
            <br />
            You
          </h1>
          <p className="font-sans text-base text-band-foreground/60 leading-relaxed">
            Your contribution has been received and is going directly to ecological restoration
            and community livelihoods across the Barbets Duet network.
          </p>
        </div>

        {/* Confirmation detail */}
        <div className="border border-band-border/10 bg-white/3 px-6 py-6 text-left space-y-4">
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-band-foreground/35">
            What happens next
          </p>
          {[
            isPayPal ? 'A receipt will be emailed to you by PayPal.' : 'A receipt will be emailed to you by Stripe.',
            'Your donation is allocated to the learning site you selected, or to the general organisation fund.',
            'Our partners will put your contribution to work in their next restoration cycle.',
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="font-mono text-[10px] text-band-accent/60 shrink-0 mt-0.5">
                0{i + 1}
              </span>
              <p className="font-sans text-sm text-band-foreground/65 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/learning-sites"
            className="px-8 py-3.5 bg-band-accent text-band font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:bg-band-accent/90 active:scale-[0.98]"
          >
            Explore the sites
          </Link>
          <Link
            href="/support-us"
            className="px-8 py-3.5 bg-transparent border border-band-border/20 text-band-foreground/70 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:border-band-border/40 hover:text-band-foreground active:scale-[0.98]"
          >
            Donate again
          </Link>
        </div>
      </div>
    </main>
  );
}
