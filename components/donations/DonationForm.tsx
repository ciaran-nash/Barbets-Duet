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
export default function DonationForm() {
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

  /** PayPal — stub: shows a coming-soon notice */
  const handlePayPalClick = () => {
    // TODO(post-launch): integrate PayPal Orders API via /api/paypal-order
    alert('PayPal integration is coming soon. Please use the Stripe option for now.');
  };

  return (
    <div className="space-y-8">
      {/* ── Donation type toggle ─────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-platinum/50 mb-3">
          Donation type
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDonationType('one-time')}
            className={`px-6 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border ${
              donationType === 'one-time'
                ? 'bg-neon-lime text-night-forest border-neon-lime'
                : 'bg-transparent text-platinum/60 border-platinum/20 hover:border-platinum/40'
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
              className="px-6 py-2.5 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 border bg-transparent text-platinum/30 border-platinum/10 cursor-default"
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
                  className="absolute left-0 top-full mt-2 z-20 w-56 bg-night-forest border border-platinum/20 px-4 py-3 shadow-xl"
                >
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-neon-lime mb-1">
                    Coming soon
                  </p>
                  <p className="font-sans text-xs text-platinum/70 leading-relaxed">
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
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-platinum/50 mb-3">
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
                  ? 'bg-viridian/40 text-neon-lime border-viridian'
                  : 'bg-transparent text-platinum/50 border-platinum/15 hover:border-platinum/30'
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* ── Preset amounts ───────────────────────────────────────────────── */}
      <div>
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-platinum/50 mb-3">
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
                  ? 'bg-neon-lime text-night-forest border-neon-lime'
                  : 'bg-white/5 text-platinum/80 border-platinum/15 hover:border-neon-lime/40 hover:bg-white/8'
              }`}
            >
              {symbol}{amount}
            </button>
          ))}
        </div>

        {/* Custom amount input */}
        <div className="mt-3 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-platinum/50 text-lg select-none">
            {symbol}
          </span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full bg-white/5 border border-platinum/15 pl-8 pr-4 py-3.5 font-sans text-sm text-platinum placeholder:text-platinum/30 focus:outline-none focus:border-neon-lime/50 focus:ring-1 focus:ring-neon-lime/20 transition-colors"
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
          className="border border-neon-lime/15 bg-neon-lime/5 px-5 py-4"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon-lime/60 mb-1">
            Your donation
          </p>
          <p className="font-serif text-2xl text-platinum">
            {symbol}{effectiveAmount.toLocaleString()}{' '}
            <span className="text-base text-platinum/50">{currency}</span>
          </p>
          {selectedSiteSlug && (
            <p className="font-sans text-xs text-platinum/50 mt-1">
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
          className="w-full bg-neon-lime text-night-forest font-mono text-[11px] tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-neon-lime/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-night-forest/30 border-t-night-forest rounded-full" />
              Connecting to Stripe...
            </>
          ) : (
            <>
              <CreditCard size={16} />
              Donate with Stripe
            </>
          )}
        </button>

        {/* PayPal — stub */}
        <button
          type="button"
          onClick={handlePayPalClick}
          className="w-full bg-white/5 text-platinum/60 font-mono text-[11px] tracking-[0.2em] uppercase py-4 border border-platinum/15 transition-all duration-300 hover:border-platinum/30 hover:bg-white/8 active:scale-[0.98]"
        >
          Donate with PayPal
          <span className="ml-2 font-sans text-[9px] tracking-normal normal-case text-platinum/30">
            (coming soon)
          </span>
        </button>
      </div>

      {/* Trust signals */}
      <div className="pt-2 space-y-2">
        {[
          '100% of your donation goes to restoration work',
          'Secure payment via Stripe — no card data stored',
          'Barbets Duet is a registered not-for-profit organisation',
        ].map((signal) => (
          <div key={signal} className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-neon-lime/60 shrink-0" />
            <p className="font-sans text-xs text-platinum/45">{signal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
