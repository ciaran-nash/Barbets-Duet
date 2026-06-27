import Stripe from 'stripe';
import { donationSchema } from '@/lib/schemas/donation.schema';
import { donationLimiter } from '@/lib/arcjet';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' });

/**
 * POST /api/create-checkout-session
 *
 * Creates a Stripe Checkout session for a one-time donation.
 * Validates request body with donationSchema before calling Stripe.
 *
 * IMPORTANT: Uses mode: 'payment' only.
 * mode: 'subscription' does NOT work with inline price_data + unit_amount —
 * Stripe throws an API error. Monthly subscriptions require a pre-created
 * Price object in the Stripe dashboard.
 * TODO(post-launch — monthly): Create Price objects with recurring.interval='month'
 * in the Stripe dashboard, then pass { price: 'price_xxxxx' } instead of price_data.
 */
export async function POST(req: Request) {
  try {
    // Rate limit (Arcjet) — moved out of Edge middleware to stay under 1 MB.
    const decision = await donationLimiter.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    const parsed = donationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid donation data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { amount, currency, siteSlug } = parsed.data;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // Always 'payment' — do NOT use 'subscription' with price_data (API error)
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: Math.round(amount * 100), // Stripe uses cents
            product_data: {
              name: siteSlug
                ? `Donation to ${siteSlug} learning site`
                : 'Donation to Barbets Duet',
              description:
                'Supporting ecological restoration and community livelihoods across the global Barbets Duet network.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support-us?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support-us?cancelled=true`,
      metadata: {
        siteSlug: siteSlug || '',
        // TODO(post-launch): store donationType for monthly upgrade path
      },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('[create-checkout-session] error:', err);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
