import { Metadata } from 'next';
import { Suspense } from 'react';
import SignInClient from './SignInClient';

export const metadata: Metadata = {
  title: 'Sign In | Barbets Duet Community',
  description: 'Sign in to access the Barbets Duet member community.',
};

export default function SignInPage() {
  // Suspense boundary required: SignInClient uses useSearchParams()
  return (
    <Suspense fallback={null}>
      <SignInClient />
    </Suspense>
  );
}
