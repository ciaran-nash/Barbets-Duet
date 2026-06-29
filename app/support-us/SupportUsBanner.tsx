'use client';

import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { Suspense } from 'react';

function BannerContent() {
  const params = useSearchParams();
  const success = params.get('success') === 'true';
  const cancelled = params.get('cancelled') === 'true';

  if (!success && !cancelled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-start gap-3 px-6 py-4 border shadow-2xl max-w-sm w-[calc(100%-2rem)] ${
          success
            ? 'bg-band border-band-accent/40 text-band-foreground'
            : 'bg-band border-band-border/20 text-band-foreground/70'
        }`}
      >
        {success ? (
          <CheckCircle2 size={18} className="text-band-accent shrink-0 mt-0.5" />
        ) : (
          <X size={18} className="text-band-foreground/40 shrink-0 mt-0.5" />
        )}
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1">
            {success ? 'Donation received' : 'Payment cancelled'}
          </p>
          <p className="font-sans text-sm leading-relaxed">
            {success
              ? 'Thank you — your contribution is making a real difference to restoration work worldwide.'
              : 'No charge was made. You can try again or donate another time.'}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Client banner shown after Stripe redirects back to /support-us */
export default function SupportUsBanner() {
  return (
    <Suspense>
      <BannerContent />
    </Suspense>
  );
}
