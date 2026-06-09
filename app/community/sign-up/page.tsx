import { Metadata } from 'next';
import SignUpClient from './SignUpClient';

export const metadata: Metadata = {
  title: 'Join the Community | Barbets Duet',
  description: 'Create a Barbets Duet member account and connect with learning sites worldwide.',
};

export default function SignUpPage() {
  return <SignUpClient />;
}
