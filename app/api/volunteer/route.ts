import { NextRequest, NextResponse } from 'next/server';
import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema';
import { volunteerLimiter } from '@/lib/arcjet';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import VolunteerConfirmation from '@/emails/VolunteerConfirmation';
import { learningSites } from '@/lib/data/learning-sites';
import * as React from 'react';

export async function POST(request: NextRequest) {
  try {
    // Rate limit + bot/shield protection (Arcjet) — was in middleware (Edge),
    // moved here to keep the Edge middleware under the 1 MB size limit.
    const decision = await volunteerLimiter.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Zod validation
    const parsed = volunteerApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Supabase write
    const { error: dbError } = await supabase.from('volunteer_applications').insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      location: data.location,
      preferred_site_slug: data.preferredSiteSlug,
      availability_start: data.availabilityStart,
      duration_weeks: data.durationWeeks ?? null,
      skills: data.skills,
      motivation: data.motivation,
      linkedin_url: data.linkedinUrl || null,
      portfolio_url: data.portfolioUrl || null,
    });

    if (dbError) {
      console.error('[volunteer/route] Supabase insert error:', dbError.message);
      return NextResponse.json(
        { message: 'Could not save your application. Please try again.' },
        { status: 500 }
      );
    }

    // Resolve site name for email (graceful fallback)
    const preferredSite = learningSites.find((s) => s.slug === data.preferredSiteSlug);
    const siteName = preferredSite?.name;

    // Resend confirmation email — fire-and-forget: log error but do not fail the request
    try {
      await resend.emails.send({
        from: 'Barbets Duet <noreply@barbetsduet.org>',
        to: data.email,
        subject: 'Your volunteer application — Barbets Duet',
        react: React.createElement(VolunteerConfirmation, {
          name: data.firstName,
          siteName,
        }),
      });
    } catch (emailErr) {
      // Domain may not be verified yet — log but don't fail the HTTP response
      console.error('[volunteer/route] Resend email error:', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[volunteer/route] Unexpected error:', err);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
