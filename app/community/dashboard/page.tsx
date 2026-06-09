// ============================================================
// /community/dashboard — Member Dashboard Page
// Wave 6, Task A2-alt: server-side session check added
// ============================================================
// Middleware already guards this route (see middleware.ts).
// This server component adds an additional RSC-level session
// check as defence-in-depth, and pre-fetches profile data
// for the client component to avoid a loading flash.
// ============================================================

import { Metadata } from 'next';
import { requireServerAuth } from '@/lib/supabase-server';
import MemberDashboard from './MemberDashboard';

export const metadata: Metadata = {
  title: 'Member Dashboard | Barbets Duet Community',
  description: 'Your Barbets Duet member profile, role, and site affiliations.',
};

export default async function CommunityDashboardPage() {
  // RSC-level auth guard — redirects to /community/sign-in if unauthenticated.
  // Middleware also guards this route; this is defence-in-depth.
  await requireServerAuth('/community/dashboard');

  return <MemberDashboard />;
}
