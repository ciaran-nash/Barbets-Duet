import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us | Barbets Duet',
  description: 'Learn about the Barbets Duet Global Learning Sites network and our mission to create sustainable livelihoods through ecological protection.',
};

export default function AboutPage() {
  return <AboutContent />;
}
