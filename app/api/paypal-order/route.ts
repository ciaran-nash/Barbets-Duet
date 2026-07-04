import { donationSchema } from '@/lib/schemas/donation.schema';
import { donationLimiter } from '@/lib/arcjet';
import { createOrder, PayPalNotConfiguredError } from '@/lib/paypal';

/**
 * POST /api/paypal-order
 *
 * Creates a PayPal Orders v2 order for a one-time donation and returns the
 * approval URL the client should redirect to. Client ID / mode come from
 * admin settings (/admin/settings); PAYPAL_SECRET from env. Returns 503 when
 * PayPal is not configured or disabled — the donation form hides the PayPal
 * button in that case.
 */
export async function POST(req: Request) {
  try {
    const decision = await donationLimiter.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = donationSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid donation data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { amount, currency, siteSlug } = parsed.data;

    const order = await createOrder(amount, currency, siteSlug);
    if (!order.approveUrl) {
      return Response.json({ error: 'No approval link returned by PayPal' }, { status: 502 });
    }

    return Response.json({ id: order.id, approveUrl: order.approveUrl });
  } catch (err) {
    if (err instanceof PayPalNotConfiguredError) {
      return Response.json({ error: 'PayPal is not available.' }, { status: 503 });
    }
    console.error('[paypal-order] error:', err instanceof Error ? err.message : err);
    return Response.json({ error: 'Failed to create PayPal order' }, { status: 500 });
  }
}
