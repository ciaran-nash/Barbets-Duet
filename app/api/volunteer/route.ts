import { NextRequest, NextResponse } from 'next/server';
import { volunteerApplicationSchema } from '@/lib/schemas/volunteerApplication.schema';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { resend } from '@/lib/email/resend';
import VolunteerConfirmation from '@/emails/VolunteerConfirmation';
import { learningSites } from '@/lib/data/learning-sites';
import * as React from 'react';

export async function POST(request: NextRequest) {
  try {
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

    // Firestore write
    await addDoc(collection(db, 'volunteer_applications'), {
      ...data,
      submittedAt: serverTimestamp(),
      status: 'pending',
    });

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
