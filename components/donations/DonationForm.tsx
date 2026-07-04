'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';
import SiteSelector from './SiteSelector';

const PRESET_AMOUNTS = [25, 50, 100, 250];
const CURRENCIES = ['USD', 'GBP', 'EUR'] as const;
type SupportedCurrency = (typeof CURRENCIES)[number];

const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
};

/**
 * DonationForm — collects donation amount, currency, type (one-time / monthly stub),
 * and optional site selector, then redirects to Stripe Checkout.
 *
 * donorEmail and donorName are NOT collected here — Stripe gathers them on the
 * hosted checkout page.
 */
export default function DonationForm({ paypalEnabled = false }: { paypalEnabled?: boolean }) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');
  // TODO: monthly requires pre-created Stripe Price object - implement post-launch
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedSiteSlug, setSelectedSiteSlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMonthlyTooltip, setShowMonthlyTooltip] = useState(false);

  const symbol = CURRENCY_SYMBOLS[currency];

  const effectiveAmount = customAmount
    ? Math.max(1, parseFloat(customAmount) || 0)
    : selectedAmount;

  const isValidAmount = effectiveAmount >= 1 && effectiveAmount <= 100000;

  const handleCustomAmountChange = (val: string) => {
    // Allow only numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(val)) {
      setCustomAmount(val);
      setSelectedAmount(0);
    }
  };

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  /** Calls /api/create-checkout-session then redirects to Stripe hosted page */
  const handleStripeCheckout = async () => {
    if (!isValidAmount) {
      setError('Please enter a valid amount between $1 and $100,000.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency,
          // Always one-time for now — monthly is post-launch (see API route note)
          donationType: 'one-time',
          siteSlug: selectedSiteSlug ?? undefined,
          // donorEmail: collected by Stripe hosted checkout page
          // donorName: collected by Stripe hosted checkout page
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Failed to create checkout session');
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /** Calls /api/paypal-order then redirects to the PayPal approval page */
  const handlePayPalClick = async () => {
    if (!isValidAmount) {
      setError('Please enter a valid amount between $1 and $100,000.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency,
          donationType: 'one-time',
          siteSlug: selectedSiteSlug ?? undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Failed to create PayPal order');
      }

      const { approveUrl } = await res.json();
      if (approveUrl) {
        window.location.href = approveUrl;
      } else {
        throw new Error('No approval URL returned from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Donation type toggle ─────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-band-foreground/50 mb-3">
          Donation type
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDonationType('one-time')}
            className={`px-6 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
              donationType === 'one-time'
                ? 'bg-band-accent text-band border-band-accent'
                : 'bg-transparent text-band-foreground/60 border-band-border/20 hover:border-band-border/40'
            }`}
          >
            One-time
          </button>

          {/* Monthly — stub, shows tooltip */}
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowMonthlyTooltip(true)}
              onMouseLeave={() => setShowMonthlyTooltip(false)}
              onClick={() => setShowMonthlyTooltip(true)}
              className="px-6 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border bg-transparent text-band-foreground/30 border-band-border/10 cursor-default"
            >
              Monthly
            </button>
            <AnimatePresence>
              {showMonthlyTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 z-20 w-56 bg-band border border-band-border/20 px-4 py-3 shadow-xl"
                >
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-band-accent mb-1">
                    Coming soon
                  </p>
                  <p className="font-sans text-xs text-band-foreground/70 leading-relaxed">
                    Monthly giving is in development. One-time donations go directly to restoration work today.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Currency selector ────────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-band-foreground/50 mb-3">
          Currency
        </p>
        <div className="flex gap-2">
          {CURRENCIES.map((cur) => (
            <button
              key={cur}
              type="button"
              onClick={() => setCurrency(cur)}
              className={`px-4 py-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-all duration-300 border ${
                currency === cur
                  ? 'bg-band-accent/40 text-band-accent border-band-accent'
                  : 'bg-transparent text-band-foreground/50 border-band-border/15 hover:border-band-border/30'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* ── Preset amounts ───────────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-band-foreground/50 mb-3">
          Amount
        </p>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetSelect(amount)}
              className={`py-4 font-serif text-xl font-light transition-all duration-300 border ${
                selectedAmount === amount && !customAmount
                  ? 'bg-band-accent text-band border-band-accent'
                  : 'bg-white/5 text-band-foreground/80 border-band-border/15 hover:border-band-accent/40 hover:bg-white/8'
              }`}
            >
              {symbol}{amount}
            </button>
          ))}
        </div>

        {/* Custom amount input */}
        <div className="mt-3 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-band-foreground/50 text-lg select-none">
            {symbol}
          </span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full bg-white/5 border border-band-border/15 pl-8 pr-4 py-3.5 font-sans text-sm text-band-foreground placeholder:text-band-foreground/30 focus:outline-none focus:border-band-accent/50 focus:ring-1 focus:ring-band-accent/20 transition-colors"
          />
        </div>
      </div>

      {/* ── Site selector ────────────────────────────────────────────────── */}
      <SiteSelector selectedSlug={selectedSiteSlug} onSelect={setSelectedSiteSlug} />

      {/* ── Donation summary ─────────────────────────────────────────────── */}
      {isValidAmount && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-band-accent/15 bg-band-accent/5 px-5 py-4"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-band-accent/60 mb-1">
            Your donation
          </p>
          <p className="font-serif text-2xl text-band-foreground">
            {symbol}{effectiveAmount.toLocaleString()}{' '}
            <span className="text-base text-band-foreground/50">{currency}</span>
          </p>
          {selectedSiteSlug && (
            <p className="font-sans text-xs text-band-foreground/50 mt-1">
              Tagged to: {selectedSiteSlug.replace(/-/g, ' ')}
            </p>
          )}
        </motion.div>
      )}

      {/* ── Error message ────────────────────────────────────────────────── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 px-4 py-3"
        >
          <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
          <p className="font-sans text-sm text-red-300">{error}</p>
        </motion.div>
      )}

      {/* ── Payment buttons ──────────────────────────────────────────────── */}
      <div className="space-y-3 pt-2">
        {/* Stripe — primary */}
        <button
          type="button"
          onClick={handleStripeCheckout}
          disabled={isLoading || !isValidAmount}
          className="w-full bg-band-accent text-band font-mono text-[11px] tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-band-accent/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-band-border/30 border-t-bark rounded-full" />
              Connecting to Stripe...
            </>
          ) : (
            <>
              <CreditCard size={16} />
              Donate with Stripe
            </>
          )}
        </button>

        {paypalEnabled ? (
          <button
            type="button"
            onClick={handlePayPalClick}
            disabled={isLoading || !isValidAmount}
            className="w-full bg-white/5 text-band-foreground/80 font-mono text-[11px] tracking-[0.2em] uppercase py-4 border border-band-border/15 transition-all duration-300 hover:border-band-border/30 hover:bg-white/8 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Donate with PayPal
          </button>
        ) : (
          <div className="w-full text-center py-3 border border-band-border/10">
            <p className="font-sans text-xs text-band-foreground/40">
              PayPal is coming soon — card payments via Stripe are available today.
            </p>
          </div>
        )}
      </div>

      {/* Trust signals */}
      <div className="pt-2 space-y-2">
        {[
          '100% of your donation goes to restoration work',
          'Secure payment via Stripe — no card data stored',
          'Barbets Duet is a registered not-for-profit organisation',
        ].map((signal) => (
          <div key={signal} className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-band-accent/60 shrink-0" />
            <p className="font-sans text-xs text-band-foreground/45">{signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
