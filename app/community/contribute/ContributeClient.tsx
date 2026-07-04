'use client';

// ============================================================
// ContributeClient — Wave 6, Task C2
// ============================================================
// Multi-step T&E submission form (4 steps = 4 prompts).
// Features:
//   - Liveblocks collaborative drafting (real-time co-editing)
//   - Auto-save to Supabase drafts table on blur
//   - Step validation before advancing
//   - Submit → Sanity draft (pending coordinator approval)
//   - Presence indicators: co-author avatars, field focus
// ============================================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Users, Loader2, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { TeDraftRoomProvider, useTeDraftMyPresence, useTeDraftOthers, useTeDraftStorage, useTeDraftMutation, useTeDraftStatus } from '@/lib/liveblocks';

// ── Step config ───────────────────────────────────────────────

const PROMPTS = [
  {
    id: 'prompt1' as const,
    step: 1,
    heading: 'What have you tried and how did it turn out?',
    hint: 'Describe a specific experiment, decision, or action you took on your land or in your community. What was the outcome?',
    minLength: 50,
  },
  {
    id: 'prompt2' as const,
    step: 2,
    heading: 'What was your biggest mistake?',
    hint: 'Honest reflection on what went wrong — mistakes shared here help the whole network learn. No judgement.',
    minLength: 30,
  },
  {
    id: 'prompt3' as const,
    step: 3,
    heading: 'What did you learn and what made you laugh?',
    hint: 'What insight did you gain? And what brought a moment of lightness or surprise along the way?',
    minLength: 30,
  },
  {
    id: 'prompt4' as const,
    step: 4,
    heading: 'Who would you include in your own Barbet circle and why?',
    hint: 'Name up to 5 people (real or imagined) you would bring into your peer learning circle. Who and why?',
    minLength: 30,
  },
];

// ── Presence bar ──────────────────────────────────────────────

function PresenceBar() {
  const others = useTeDraftOthers();
  const status = useTeDraftStatus();

  if (status !== 'connected' || others.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-xl mb-4">
      <Users className="w-4 h-4 text-accent shrink-0" />
      <span className="text-xs font-sans text-accent">
        {others.length} collaborator{others.length !== 1 ? 's' : ''} viewing
      </span>
      <div className="flex -space-x-1 ml-auto">
        {others.slice(0, 5).map((other) => (
          <div
            key={other.connectionId}
            title={other.info?.name ?? 'Collaborator'}
            className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-[9px] font-bold ring-2 ring-white"
          >
            {(other.info?.name ?? '?')[0]?.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Inner form (must be inside RoomProvider) ──────────────────

interface FormProps {
  userId: string;
  displayName: string;
  siteOptions: { slug: string; name: string }[];
}

function ContributeForm({ userId, displayName, siteOptions }: FormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedSite, setSelectedSite] = useState(siteOptions[0]?.slug ?? '');
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [myPresence, updatePresence] = useTeDraftMyPresence();
  const draftStorage = useTeDraftStorage((root) => root);
  const mutation = useTeDraftMutation(({ storage }, field: string, value: string) => {
    (storage as unknown as Map<string, string>).set(field, value);
  }, []);

  // Local state mirrors storage for controlled inputs
  const [localValues, setLocalValues] = useState({
    prompt1: '',
    prompt2: '',
    prompt3: '',
    prompt4: '',
  });

  // Sync local state from Liveblocks storage when it arrives
  useEffect(() => {
    if (draftStorage) {
      setLocalValues({
        prompt1: draftStorage.prompt1 ?? '',
        prompt2: draftStorage.prompt2 ?? '',
        prompt3: draftStorage.prompt3 ?? '',
        prompt4: draftStorage.prompt4 ?? '',
      });
      if (draftStorage.title) setTitle(draftStorage.title);
      if (draftStorage.siteSlug) setSelectedSite(draftStorage.siteSlug);
    }
  }, [draftStorage]);

  const handleChange = useCallback(
    (field: keyof typeof localValues, value: string) => {
      setLocalValues((prev) => ({ ...prev, [field]: value }));
      mutation(field, value);
      // Clear error on change
      setErrors((prev) => ({ ...prev, [field]: '' }));
    },
    [mutation]
  );

  const handleFocus = (field: string) => {
    updatePresence({ focusedField: field as never, cursor: null, lastSeen: Date.now() });
  };

  const handleBlur = async (field: keyof typeof localValues, value: string) => {
    updatePresence({ focusedField: null, cursor: null, lastSeen: Date.now() });
    // Auto-save to Supabase drafts
    await supabase.from('user_te_drafts').upsert({
      user_id: userId,
      field,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,field' });
  };

  const validateStep = (): boolean => {
    const current = PROMPTS[step];
    const value = localValues[current.id];
    if (!value || value.trim().length < current.minLength) {
      setErrors((prev) => ({
        ...prev,
        [current.id]: `Please write at least ${current.minLength} characters.`,
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, PROMPTS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setSubmitting(true);
    try {
      // Submit to Sanity via API route
      const res = await fetch('/api/community/submit-contribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || `T&E entry by ${displayName}`,
          siteSlug: selectedSite,
          authorMemberSlug: userId,
          prompt1: localValues.prompt1,
          prompt2: localValues.prompt2,
          prompt3: localValues.prompt3,
          prompt4: localValues.prompt4,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
      setTimeout(() => router.push('/community/trials'), 2000);
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: 'Submission failed. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-accent" />
        </div>
        <h2 className="font-serif font-bold text-2xl mb-2">Submitted for review</h2>
        <p className="text-foreground/60 font-sans text-sm">
          Your Site Coordinator will review your entry. Redirecting...
        </p>
      </div>
    );
  }

  const current = PROMPTS[step];
  const isLastStep = step === PROMPTS.length - 1;

  return (
    <div>
      <PresenceBar />

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {PROMPTS.map((p, i) => (
          <div
            key={p.id}
            className={[
              'h-1.5 flex-1 rounded-full transition-all duration-300',
              i < step
                ? 'bg-accent'
                : i === step
                ? 'bg-accent/60'
                : 'bg-foreground/10',
            ].join(' ')}
          />
        ))}
      </div>
      <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2">
        Step {step + 1} of {PROMPTS.length}
      </p>

      {/* Site selector (shown on first step) */}
      {step === 0 && (
        <div className="mb-6">
          <label className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2">
            Entry title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a name..."
            className="w-full px-4 py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4"
          />
          <label
            htmlFor="site-select"
            className="block text-xs font-mono text-foreground/40 uppercase tracking-widest mb-2"
          >
            Learning site
          </label>
          <select
            id="site-select"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-foreground/10 bg-foreground/5 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {siteOptions.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Prompt heading */}
      <h2 className="font-serif font-bold text-xl md:text-2xl mb-2 leading-snug">
        {current.heading}
      </h2>
      <p className="text-sm text-foreground/50 font-sans mb-4 leading-relaxed">{current.hint}</p>

      {/* Textarea */}
      <textarea
        id={current.id}
        value={localValues[current.id]}
        onChange={(e) => handleChange(current.id, e.target.value)}
        onFocus={() => handleFocus(current.id)}
        onBlur={(e) => handleBlur(current.id, e.target.value)}
        rows={7}
        placeholder="Share your honest experience..."
        className={[
          'w-full px-4 py-3 rounded-2xl border bg-foreground/5 font-sans text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-accent transition-colors',
          errors[current.id] ? 'border-red-500/50' : 'border-foreground/10',
        ].join(' ')}
        aria-describedby={errors[current.id] ? `${current.id}-error` : undefined}
      />
      {errors[current.id] && (
        <p
          id={`${current.id}-error`}
          className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3 shrink-0" />
          {errors[current.id]}
        </p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground/5 text-foreground/60 text-sm font-sans font-medium disabled:opacity-30 hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-sans font-semibold hover:bg-accent/80 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit for review
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-sans font-semibold hover:bg-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {errors.submit && (
        <p className="mt-3 text-xs text-red-500 text-center">{errors.submit}</p>
      )}
    </div>
  );
}

// ── Main export — wraps form in Liveblocks RoomProvider ───────

interface ContributeClientProps {
  userId: string;
  displayName: string;
  siteOptions: { slug: string; name: string }[];
}

export default function ContributeClient({
  userId,
  displayName,
  siteOptions,
}: ContributeClientProps) {
  // Room ID is scoped to this user + session (stable across re-renders)
  const [roomId] = useState(() => `te-draft-${userId}-${Date.now()}`);
  const [initialPresence] = useState(() => ({ focusedField: null, cursor: null, lastSeen: Date.now() }));

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-3">
        Share Your Experience
      </p>
      <h1 className="font-serif font-bold text-4xl mb-2">Trial &amp; Error</h1>
      <p className="text-sm text-foreground/60 font-sans mb-10 leading-relaxed">
        Answer four questions honestly. All four are required before submitting.
        Your Site Coordinator will review your entry before it publishes.
      </p>

      <TeDraftRoomProvider
        id={roomId}
        initialPresence={initialPresence}
        initialStorage={{
          prompt1: '',
          prompt2: '',
          prompt3: '',
          prompt4: '',
          title: '',
          siteSlug: siteOptions[0]?.slug ?? '',
        }}
      >
        <ContributeForm
          userId={userId}
          displayName={displayName}
          siteOptions={siteOptions}
        />
      </TeDraftRoomProvider>
    </main>
  );
}
