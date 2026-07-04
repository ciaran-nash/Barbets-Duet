import { z } from 'zod';
import { donationLimiter } from '@/lib/arcjet';
import { captureOrder, PayPalNotConfiguredError } from '@/lib/paypal';

const captureSchema = z.object({ orderId: z.string().min(1).max(64) });

/**
 * POST /api/paypal-capture
 *
 * Captures an approved PayPal order. Called from the donation success page
 * after PayPal redirects back with ?token=<orderId>.
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
    const parsed = captureSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const status = await captureOrder(parsed.data.orderId);
    if (status !== 'COMPLETED') {
      return Response.json({ error: `Capture not completed (${status})` }, { status: 502 });
    }

    return Response.json({ status });
  } catch (err) {
    if (err instanceof PayPalNotConfiguredError) {
      return Response.json({ error: 'PayPal is not available.' }, { status: 503 });
    }
    console.error('[paypal-capture] error:', err instanceof Error ? err.message : err);
    return Response.json({ error: 'Failed to capture PayPal order' }, { status: 500 });
  }
}
