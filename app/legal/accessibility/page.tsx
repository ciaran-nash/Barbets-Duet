import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Barbets Duet',
  description: 'Our commitment to making the Barbets Duet website accessible to everyone.',
};

export default function AccessibilityPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-8 block not-prose">
        Legal
      </span>
      <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight mb-4 not-prose">
        Accessibility Statement
      </h1>
      <p className="text-sm text-muted-foreground mb-12 not-prose">Last updated: July 2026</p>

      <div className="border-t border-border pt-12 space-y-10">
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">1. Our commitment</h2>
          <p className="text-muted-foreground leading-relaxed">
            Barbets Duet is committed to ensuring our website is accessible to everyone, including
            people with disabilities. We aim to conform to the Web Content Accessibility Guidelines
            (WCAG) 2.1 at Level AA across all public pages.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">2. Measures we take</h2>
          <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc pl-6">
            <li>Semantic HTML with landmark regions and a skip-to-content link on every page.</li>
            <li>Keyboard-navigable menus, forms, galleries, and interactive components.</li>
            <li>Light and dark colour themes, both checked for sufficient colour contrast.</li>
            <li>Automated accessibility audits (axe-core, WCAG 2.1 A/AA) run against key pages in both themes as part of our test suite.</li>
            <li>Reduced-motion preferences respected for animated content.</li>
            <li>Descriptive alternative text for informative images.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">3. Known limitations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Despite our efforts, some content may not yet be fully accessible:
          </p>
          <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc pl-6">
            <li>The interactive 3D globe and map visualisations are supplementary; the same information is available in accessible list form on the Learning Sites pages.</li>
            <li>Some older photographs and third-party embedded content may lack complete alternative descriptions.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">4. Feedback</h2>
          <p className="text-muted-foreground leading-relaxed">
            We welcome feedback on the accessibility of this website. If you encounter a barrier or
            need content in an alternative format, contact us at{' '}
            <a href="mailto:info@barbetsduet.com" className="text-accent underline underline-offset-4">
              info@barbetsduet.com
            </a>
            . We aim to respond within five working days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-semibold mb-4">5. Enforcement and review</h2>
          <p className="text-muted-foreground leading-relaxed">
            This statement is reviewed whenever significant changes are made to the website, and at
            least annually. Automated audits run continuously as part of our development process.
          </p>
        </section>
      </div>
    </article>
  );
}
