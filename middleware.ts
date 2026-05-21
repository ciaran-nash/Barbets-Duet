import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/volunteer", "/api/create-checkout-session"],
};
