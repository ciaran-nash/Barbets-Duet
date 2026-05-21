import { Resend } from 'resend';

/**
 * Resend client singleton.
 *
 * Resend Domain Verification (pre-launch action required)
 * -------------------------------------------------------
 * 1. Go to resend.com → Domains → Add Domain
 * 2. Enter: barbetsduet.org
 * 3. Add the following DNS records to your domain registrar:
 *    - TXT record: (Resend provides value — used for domain ownership verification)
 *    - DKIM CNAME records: (Resend provides 2–3 CNAME records for email authentication)
 *    - SPF TXT record: `v=spf1 include:amazonses.com ~all` (or as Resend specifies)
 * 4. Wait for verification (typically < 24 hours)
 * 5. Once verified, emails can be sent from: noreply@barbetsduet.org
 *
 * RESEND_API_KEY must be set in .env.local before sending emails.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);
