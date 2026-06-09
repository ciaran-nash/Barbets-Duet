import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Barbets Duet',
  description: 'How Barbets Duet collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block not-prose">
        Legal
      </span>
      <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight mb-4 not-prose">
        Privacy Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-12 not-prose">Last updated: June 2025</p>

      <div className="border-t border-border pt-12 space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">1. Who we are</h2>
          <p className="text-muted-foreground leading-relaxed">
            Barbets Duet is a non-profit organisation working to build a global network of community-led learning sites. Our registered address is P.O. Box 323, New Baltimore, NY 12124, U.S.A. You can contact us at{' '}
            <a href="mailto:info@barbetsduet.com" className="text-accent underline underline-offset-4">
              info@barbetsduet.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">2. What data we collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We collect only the data necessary to operate our services and communicate with you. This includes:
          </p>
          <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc pl-6">
            <li>Contact information (name, email) submitted via our volunteer or partner application forms.</li>
            <li>Usage data collected through privacy-respecting analytics (Umami), which does not use cookies and does not track personal identifiers.</li>
            <li>Authentication data if you create an account to access our community platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">3. How we use your data</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use your data solely to respond to your enquiries, process your applications, and — where you have consented — keep you informed about our work. We do not sell, rent, or share personal data with third parties for commercial purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">4. Data retention</h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain personal data only as long as necessary for the purpose for which it was collected, or as required by applicable law. Contact form submissions are retained for 24 months. Account data is retained until you close your account.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">5. Your rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, to object to or restrict processing, or to receive a portable copy of your data. To exercise any of these rights, contact us at{' '}
            <a href="mailto:info@barbetsduet.com" className="text-accent underline underline-offset-4">
              info@barbetsduet.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">6. Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use industry-standard security measures to protect your data, including encrypted connections (HTTPS) and access controls. No system is completely secure, and we cannot guarantee the absolute security of transmitted data.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">7. Changes to this policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this policy from time to time. Material changes will be communicated via email or a prominent notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>
      </div>
    </article>
  );
}
