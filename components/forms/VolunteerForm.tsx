'use client';

import { useState } from 'react';
import { learningSites } from '@/lib/data/learning-sites';
import { VolunteerApplicationData } from '@/lib/schemas/volunteerApplication.schema';

// ── Step-level Zod schemas ────────────────────────────────────────────────────

import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema';

const step1Schema = volunteerApplicationSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  location: true,
});

const step2Schema = volunteerApplicationSchema.pick({
  preferredSiteSlug: true,
  availabilityStart: true,
});

const step3Schema = volunteerApplicationSchema.pick({
  skills: true,
  motivation: true,
});

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = Partial<VolunteerApplicationData>;
type FieldErrors = Record<string, string>;

// ── Component ─────────────────────────────────────────────────────────────────

export default function VolunteerForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const TOTAL_STEPS = 3;

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const update = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (stepNum: number): boolean => {
    const data = {
      firstName: formData.firstName ?? '',
      lastName: formData.lastName ?? '',
      email: formData.email ?? '',
      location: formData.location ?? '',
      preferredSiteSlug: formData.preferredSiteSlug ?? '',
      availabilityStart: formData.availabilityStart ?? '',
      skills: formData.skills ?? '',
      motivation: formData.motivation ?? '',
    };

    const result =
      stepNum === 1
        ? step1Schema.safeParse(data)
        : stepNum === 2
        ? step2Schema.safeParse(data)
        : step3Schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? 'Submission failed. Please try again.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────────

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center">
        <p className="text-xs font-mono text-accent uppercase tracking-[0.2em] mb-4">
          Application Received
        </p>
        <h2 className="text-3xl font-serif font-bold mb-4">
          Thank you, {formData.firstName}!
        </h2>
        <p className="text-base font-sans text-foreground/60 mb-8 max-w-sm mx-auto">
          We&apos;ve received your application and will review it within 2 weeks. A
          confirmation has been sent to {formData.email}.
        </p>
        <div className="border-t border-foreground/10 pt-8 space-y-3">
          <p className="text-sm font-sans text-foreground/50 font-medium">
            What happens next
          </p>
          <p className="text-sm font-sans text-foreground/40 max-w-sm mx-auto">
            Our team will reach out to arrange a brief conversation about your interest
            and availability. No further action needed on your part.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-10">
          <a
            href="/learning-sites"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-viridian text-white text-sm font-sans font-semibold hover:bg-viridian/80 transition-colors"
          >
            Explore Learning Sites
          </a>
          <a
            href="/support-us"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-foreground/5 text-foreground/70 text-sm font-sans font-semibold hover:bg-foreground/10 transition-colors"
          >
            Support Us
          </a>
        </div>
      </div>
    );
  }

  // ── Shared input styles ──────────────────────────────────────────────────────

  const inputClass =
    'w-full rounded-xl border bg-foreground/5 px-4 py-3 text-sm font-sans text-foreground placeholder:text-foreground/30 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent';

  const labelClass = 'block text-xs font-mono uppercase tracking-[0.15em] text-foreground/50 mb-1.5';

  const errorClass = 'mt-1 text-xs text-red-400';

  const fieldError = (key: string) =>
    errors[key] ? <p className={errorClass}>{errors[key]}</p> : null;

  // ── Progress bar ──────────────────────────────────────────────────────────────

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-[10px] font-mono text-foreground/40 mb-2">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>
            {step === 1 ? 'Personal Info' : step === 2 ? 'Site + Availability' : 'Background'}
          </span>
        </div>
        <div className="h-0.5 w-full bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Step 1: Personal Info ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold">Personal Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Ada"
                  value={formData.firstName ?? ''}
                  onChange={(e) => update('firstName', e.target.value)}
                  autoFocus
                />
                {fieldError('firstName')}
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Lovelace"
                  value={formData.lastName ?? ''}
                  onChange={(e) => update('lastName', e.target.value)}
                />
                {fieldError('lastName')}
              </div>
            </div>

            <div>
              <label className={labelClass}>Email address</label>
              <input
                type="email"
                className={inputClass}
                placeholder="ada@example.com"
                value={formData.email ?? ''}
                onChange={(e) => update('email', e.target.value)}
              />
              {fieldError('email')}
            </div>

            <div>
              <label className={labelClass}>Current location</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Nairobi, Kenya"
                value={formData.location ?? ''}
                onChange={(e) => update('location', e.target.value)}
              />
              {fieldError('location')}
            </div>
          </div>
        )}

        {/* ── Step 2: Site + Availability ──────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold">Site &amp; Availability</h2>

            <div>
              <label className={labelClass}>Preferred learning site</label>
              <select
                aria-label="Preferred learning site"
                className={inputClass}
                value={formData.preferredSiteSlug ?? ''}
                onChange={(e) => update('preferredSiteSlug', e.target.value)}
              >
                <option value="">Select a learning site...</option>
                {learningSites.map((site) => (
                  <option key={site.slug} value={site.slug}>
                    {site.name} — {site.location}
                  </option>
                ))}
              </select>
              {fieldError('preferredSiteSlug')}
            </div>

            <div>
              <label className={labelClass}>Availability from</label>
              <input
                type="date"
                className={inputClass}
                value={formData.availabilityStart ?? ''}
                onChange={(e) => update('availabilityStart', e.target.value)}
              />
              {fieldError('availabilityStart')}
            </div>

            <div>
              <label className={labelClass}>Duration (weeks) — optional</label>
              <input
                type="number"
                min={1}
                max={52}
                className={inputClass}
                placeholder="4"
                value={formData.durationWeeks ?? ''}
                onChange={(e) =>
                  update('durationWeeks', e.target.value ? parseInt(e.target.value, 10) : 0)
                }
              />
              {fieldError('durationWeeks')}
            </div>
          </div>
        )}

        {/* ── Step 3: Background ──────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold">Your Background</h2>

            <div>
              <label className={labelClass}>Skills &amp; disciplines</label>
              <textarea
                rows={4}
                className={inputClass}
                placeholder="Describe your relevant skills, disciplines, or professional background..."
                value={formData.skills ?? ''}
                onChange={(e) => update('skills', e.target.value)}
              />
              {fieldError('skills')}
            </div>

            <div>
              <label className={labelClass}>Motivation</label>
              <textarea
                rows={5}
                className={inputClass}
                placeholder="Tell us why you want to volunteer with the Jumuiya network and what you hope to contribute..."
                value={formData.motivation ?? ''}
                onChange={(e) => update('motivation', e.target.value)}
              />
              {fieldError('motivation')}
            </div>

            <div>
              <label className={labelClass}>LinkedIn URL — optional</label>
              <input
                type="url"
                className={inputClass}
                placeholder="https://linkedin.com/in/yourname"
                value={formData.linkedinUrl ?? ''}
                onChange={(e) => update('linkedinUrl', e.target.value)}
              />
              {fieldError('linkedinUrl')}
            </div>

            <div>
              <label className={labelClass}>Portfolio / website — optional</label>
              <input
                type="url"
                className={inputClass}
                placeholder="https://yourwebsite.com"
                value={formData.portfolioUrl ?? ''}
                onChange={(e) => update('portfolioUrl', e.target.value)}
              />
              {fieldError('portfolioUrl')}
            </div>
          </div>
        )}

        {/* ── Navigation buttons ────────────────────────────────────────────── */}
        <div className="flex gap-3 mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-xl border border-foreground/20 text-sm font-sans font-semibold text-foreground/60 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              Back
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-xl bg-viridian text-white text-sm font-sans font-semibold hover:bg-viridian/80 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-xl bg-accent text-night-forest text-sm font-sans font-semibold disabled:opacity-50 hover:bg-accent/80 transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>

        {submitError && (
          <p className="mt-4 text-sm text-red-400 text-center">{submitError}</p>
        )}
      </form>
    </div>
  );
}
