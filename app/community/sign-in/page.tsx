import { Metadata } from 'next';
import SignInClient from './SignInClient';

export const metadata: Metadata = {
  title: 'Sign In | Barbets Duet Community',
  description: 'Sign in to access the Barbets Duet member community.',
};

export default function SignInPage() {
  return <SignInClient />;
}
