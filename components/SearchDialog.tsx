'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { learningSites } from '@/lib/data/learning-sites';

/**
 * SearchDialog — AI-assisted site discovery. Sends the query to /api/search
 * (RAG over the learning-site catalogue via the Vercel AI Gateway) and links
 * any site names found in the answer.
 *
 * Trigger: the nav search button, or ⌘K / Ctrl+K anywhere.
 */
export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close resets search state so each open starts fresh.
  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setResult(null);
    setError(null);
  }, []);

  // ⌘K / Ctrl+K opens, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) close();
        else setOpen(true);
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submit = useCallback(async () => {
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? 'Search failed. Please try again.');
      }
      setResult(data.result ?? '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  // Sites mentioned in the answer, so we can offer direct links
  const mentionedSites = result
    ? learningSites.filter((s) => result.toLowerCase().includes(s.name.toLowerCase()))
    : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search learning sites"
        className="flex items-center gap-1.5 hover:opacity-60 transition-opacity cursor-pointer"
      >
        <Search size={13} />
        <span className="hidden xl:inline text-[9px] opacity-40 border border-current rounded px-1 py-px">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[15vh]"
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="w-full max-w-xl rounded-[1.5rem] ring-1 ring-foreground/10 bg-background shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              <form
                onSubmit={(e) => { e.preventDefault(); submit(); }}
                className="flex items-center gap-3 px-5 py-4 border-b border-border"
              >
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about our learning sites — e.g. “mangrove restoration”"
                  aria-label="Search query"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {loading && <Loader2 size={16} className="animate-spin text-muted-foreground" />}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </form>

              <div className="px-5 py-4 min-h-[80px] max-h-[50vh] overflow-y-auto">
                {!result && !error && !loading && (
                  <p className="text-xs text-muted-foreground">
                    Describe what you&apos;re interested in and we&apos;ll point you to the most relevant
                    learning sites. Press Enter to search.
                  </p>
                )}
                {loading && (
                  <p className="text-xs text-muted-foreground animate-pulse">Searching the network…</p>
                )}
                {error && <p className="text-sm text-destructive">{error}</p>}
                {result && (
                  <div className="space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">{result}</p>
                    {mentionedSites.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {mentionedSites.map((site) => (
                          <Link
                            key={site.slug}
                            href={`/learning-sites/${site.slug}`}
                            onClick={close}
                            className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/80 transition-colors"
                          >
                            {site.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
