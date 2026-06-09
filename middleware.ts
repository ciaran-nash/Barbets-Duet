import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Base Arcjet instance with shield (common attack protection) and bot detection.
 * Applied to all protected routes.
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

/**
 * Rate limiter for the volunteer form endpoint.
 * Max 5 submissions per IP per hour to prevent spam applications.
 */
const volunteerLimiter = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["ip.src"],
    refillRate: 5,
    interval: 3600,
    capacity: 5,
  })
);

/**
 * Rate limiter for the checkout session endpoint.
 * Max 10 requests per IP per hour to prevent payment abuse.
 */
const donationLimiter = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["ip.src"],
    refillRate: 10,
    interval: 3600,
    capacity: 10,
  })
);

// ── Supabase session refresh helper ────────────────────────

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

// ── Middleware ──────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Arcjet rate limits for API routes ────────────────
  if (pathname === "/api/volunteer") {
    const decision = await volunteerLimiter.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  if (pathname === "/api/create-checkout-session") {
    const decision = await donationLimiter.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // ── 2. Supabase session refresh + protected route guard ─
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
    "/api/volunteer",
    "/api/create-checkout-session",
    // Run Supabase refresh on all page/API routes (not static assets)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
