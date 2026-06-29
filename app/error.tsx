'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in Vercel runtime logs (and Sentry, once wired).
    console.error('[app error boundary]', error);
  }, [error]);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <p className="text-sm font-medium tracking-widest text-foreground/40 uppercase mb-4 font-['DM_Sans']">
          Error
        </p>
        <h1 className="text-3xl font-semibold text-foreground mb-3 font-['DM_Sans']">
          Something went wrong
        </h1>
        <p className="text-base text-foreground/60 leading-relaxed font-['DM_Sans']">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={reset}
            className="text-sm font-medium text-foreground underline underline-offset-4 font-['DM_Sans']"
          >
            Try again
          </button>
          <a
            href="/"
            className="text-sm font-medium text-foreground/60 underline underline-offset-4 font-['DM_Sans']"
          >
            Return to home
          </a>
        </div>
      </div>
    </main>
  );
}
