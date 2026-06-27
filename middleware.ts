import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// NOTE: Arcjet rate-limiting was moved OUT of this Edge middleware into the
// individual API route handlers (lib/arcjet.ts) — bundling @arcjet/next here
// pushed the Edge Function over Vercel's 1 MB size limit. Route handlers run on
// the Node runtime (no size cap), so the limiters live there now.

// ── Supabase session refresh helper (existing — community routes) ──────────

async function refreshSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}

// ── Admin role check helper (new — admin portal routes) ───────────────────
//
// Distinct from refreshSupabaseSession: this helper also fetches
// profiles.member_role to enforce admin/coordinator gating.
//
// SECURITY NOTE: RLS policies are the authoritative access control layer.
// Middleware is a UX redirect layer only — it prevents unnecessary round-trips
// and improves the user experience, but must not be the sole security boundary.
//
// FAIL-OPEN BEHAVIOUR: If Supabase env vars are missing (local dev without
// credentials), this function returns null and middleware does NOT block the
// route. Set credentials in production. RLS enforces access at the DB level.

type MemberRole = "site_coordinator" | "junior_member" | "barbets_friend" | "local_community" | "admin";

async function getAdminSession(
  request: NextRequest
): Promise<{ id: string; role: MemberRole } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[middleware] Supabase env vars not set — /admin and /superadmin routes " +
        "are UNPROTECTED by middleware. Set credentials to enable role checks."
    );
    return null;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Cookie propagation handled by the response object in the main handler
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = ((profile?.role ?? "local_community") as MemberRole);

  return { id: user.id, role };
}

// ── Middleware ──────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin portal role-based route protection (AP2) ─────────────
  // (API rate-limiting now runs inside the route handlers via lib/arcjet.ts.)
  const isAdminRoute = pathname.startsWith("/admin");
  const isSuperadminRoute = pathname.startsWith("/superadmin");

  if (isAdminRoute || isSuperadminRoute) {
    const session = await getAdminSession(request);

    if (!session) {
      // Unauthenticated — redirect to admin login, preserving intended destination
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isSuperadminRoute && session.role !== "admin") {
      // /superadmin/* requires admin role specifically
      return NextResponse.redirect(new URL("/403", request.url));
    }

    if (isAdminRoute && session.role !== "site_coordinator" && session.role !== "admin") {
      // /admin/* requires site_coordinator or admin role
      return NextResponse.redirect(new URL("/403", request.url));
    }

    // Role check passed — fall through to Supabase session refresh below
  }

  // ── 3. Supabase session refresh + community route guard (existing) ───────
  const { response, user } = await refreshSupabaseSession(request);

  // Protected: /community/dashboard, /community/profile
  const isProtectedCommunityRoute =
    pathname.startsWith("/community/dashboard") ||
    pathname.startsWith("/community/profile");

  if (isProtectedCommunityRoute && !user) {
    const signInUrl = new URL("/community/sign-in", request.url);
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Legacy /dashboard — redirect signed-in users to community dashboard
  if (pathname === "/dashboard" && user) {
    return NextResponse.redirect(new URL("/community/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Existing Arcjet-protected API routes (must not be removed)
    "/api/volunteer",
    "/api/create-checkout-session",
    // New: admin portal route protection (AP2)
    "/admin/:path*",
    "/superadmin/:path*",
    // Existing: Supabase session refresh on all page routes (not static assets)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
