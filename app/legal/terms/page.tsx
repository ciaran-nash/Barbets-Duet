import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Barbets Duet',
  description: 'The terms and conditions governing use of Barbets Duet services and platforms.',
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block not-prose">
        Legal
      </span>
      <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight mb-4 not-prose">
        Terms of Service
      </h1>
      <p className="text-sm text-muted-foreground mb-12 not-prose">Last updated: June 2025</p>

      <div className="border-t border-border pt-12 space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">1. Acceptance</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using any Barbets Duet website, platform, or service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">2. Use of our services</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree to use Barbets Duet services only for lawful purposes and in accordance with these terms. You must not:
          </p>
          <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc pl-6">
            <li>Use our services in any way that violates applicable law or regulation.</li>
            <li>Transmit unsolicited or unauthorised advertising or promotional material.</li>
            <li>Attempt to gain unauthorised access to any part of our systems.</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our services.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">3. Intellectual property</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unless otherwise stated, all content on our website and platforms is the property of Barbets Duet and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission, except as permitted by law or open-source licences where applicable.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">4. Disclaimer of warranties</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services are provided on an "as is" and "as available" basis without any warranties, express or implied. We do not warrant that our services will be uninterrupted, error-free, or free of harmful components.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">5. Limitation of liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, Barbets Duet shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">6. Third-party links</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our services may contain links to third-party websites or resources. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">7. Governing law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These terms are governed by the laws of the State of New York, U.S.A., without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms may be sent to{' '}
            <a href="mailto:info@barbetsduet.com" className="text-accent underline underline-offset-4">
              info@barbetsduet.com
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
