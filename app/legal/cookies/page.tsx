import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy | Barbets Duet',
  description: 'How Barbets Duet uses cookies and similar tracking technologies.',
};

export default function CookiesPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block not-prose">
        Legal
      </span>
      <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight mb-4 not-prose">
        Cookies Policy
      </h1>
      <p className="text-sm text-muted-foreground mb-12 not-prose">Last updated: June 2025</p>

      <div className="border-t border-border pt-12 space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">1. What are cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to site owners.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">2. How we use cookies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Barbets Duet uses a minimal set of cookies, limited to those strictly necessary for our services to function:
          </p>
          <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc pl-6">
            <li>
              <strong className="text-foreground">Authentication cookies</strong> — set when you sign in to our community platform. These are session cookies that expire when you close your browser, unless you select "remember me."
            </li>
            <li>
              <strong className="text-foreground">Security cookies</strong> — used to prevent cross-site request forgery (CSRF) attacks. These are strictly necessary and cannot be disabled without affecting your ability to use our platform.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">3. Analytics</h2>
          <p className="text-muted-foreground leading-relaxed">
            We use Umami Analytics, a cookieless analytics tool that does not set any cookies on your device and does not collect personally identifiable information. Umami collects aggregate, anonymised usage data to help us understand how visitors use our site. No GDPR consent banner is required for Umami's data collection.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">4. Third-party cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not use third-party advertising cookies, social media tracking pixels, or behavioural targeting cookies. Some embedded content (such as videos or maps from third-party providers) may set their own cookies; we have no control over these.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">5. Managing cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            You can control and delete cookies through your browser settings. Note that disabling strictly necessary cookies will affect the functionality of our platform. For more information on managing cookies, visit{' '}
            <a
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4"
            >
              allaboutcookies.org
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">6. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about our use of cookies may be sent to{' '}
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
