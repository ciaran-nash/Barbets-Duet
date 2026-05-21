/**
 * POST /api/paypal-order
 *
 * Stub implementation — real PayPal Orders API integration is post-launch (Wave 5).
 * Returns a stub order ID for UI testing purposes.
 *
 * TODO(post-launch): Implement PayPal Orders API using @paypal/paypal-server-sdk.
 * Requires NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_SECRET env vars.
 * See: https://developer.paypal.com/docs/api/orders/v2/
 */
export async function POST(_req: Request) {
  // Stub: return a fake order ID so the PayPal UI can be tested without live credentials
  return Response.json({
    id: 'STUB_ORDER_ID',
    status: 'CREATED',
  });
}
