import type { Metadata } from 'next';
import { DM_Sans, BioRhyme, JetBrains_Mono } from 'next/font/google';
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
  variable: '--font-serif', // Keep using --font-serif so it applies to font-serif tailwind classes
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Barbets Duet Global Learning Sites',
  description: 'A global network of learning sites exploring sustainable livelihoods by integrating economic activities with environmental conservation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${bioRhyme.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#F4F4F0] text-[#111111]" suppressHydrationWarning>
        <SmoothScroll />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
