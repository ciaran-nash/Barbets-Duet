import type { Metadata } from 'next';
import { DM_Sans, BioRhyme, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import SmoothScroll from '@/components/SmoothScroll';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const bioRhyme = BioRhyme({
  weight: ['200', '300', '400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Barbets Duet Global Learning Sites',
  description: 'A global network of learning sites exploring sustainable livelihoods by integrating economic activities with environmental conservation.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${bioRhyme.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <SmoothScroll />
        <AuthProvider>
          <div id="main-content">{children}</div>
        </AuthProvider>
        {/* TODO(T04): Umami analytics — awaiting-credentials
            Set NEXT_PUBLIC_UMAMI_WEBSITE_ID in .env.local after creating a
            website entry in the Umami Cloud dashboard (umami.is).
            Script is cookieless: no GDPR consent banner required. */}
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
