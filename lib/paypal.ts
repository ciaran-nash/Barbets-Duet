import 'server-only';
import { getPayPalConfig } from './settings';

/**
 * Minimal PayPal Orders v2 REST client — no SDK dependency.
 * Client ID / mode come from admin settings (env fallback);
 * PAYPAL_SECRET comes from env only.
 */

const API_BASE = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
} as const;

export class PayPalNotConfiguredError extends Error {
  constructor() {
    super('PayPal is not configured');
  }
}

async function getAccessToken(): Promise<{ token: string; base: string }> {
  const config = await getPayPalConfig();
  const secret = process.env.PAYPAL_SECRET;
  if (!config.enabled || !config.clientId || !secret) {
    throw new PayPalNotConfiguredError();
  }

  const base = API_BASE[config.mode];
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`PayPal OAuth failed: ${res.status}`);
  }
  const data = (await res.json()) as { access_token: string };
  return { token: data.access_token, base };
}

export interface CreatedOrder {
  id: string;
  approveUrl: string | null;
}

export async function createOrder(
  amount: number,
  currency: string,
  siteSlug?: string
): Promise<CreatedOrder> {
  const { token, base } = await getAccessToken();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: currency, value: amount.toFixed(2) },
          description: siteSlug
            ? `Donation to ${siteSlug} learning site`
            : 'Donation to Barbets Duet',
          custom_id: siteSlug || undefined,
        },
      ],
      application_context: {
        brand_name: 'Barbets Duet',
        user_action: 'PAY_NOW',
        return_url: `${baseUrl}/support-us/success?provider=paypal`,
        cancel_url: `${baseUrl}/support-us?cancelled=true`,
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`PayPal create order failed: ${res.status} ${detail}`);
  }

  const order = (await res.json()) as {
    id: string;
    links?: { rel: string; href: string }[];
  };
  const approveUrl = order.links?.find((l) => l.rel === 'approve')?.href ?? null;
  return { id: order.id, approveUrl };
}

export async function captureOrder(orderId: string): Promise<'COMPLETED' | string> {
  const { token, base } = await getAccessToken();

  const res = await fetch(`${base}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`PayPal capture failed: ${res.status} ${detail}`);
  }

  const data = (await res.json()) as { status?: string };
  return data.status ?? 'UNKNOWN';
}
