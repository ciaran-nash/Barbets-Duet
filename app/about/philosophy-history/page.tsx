import { Metadata } from 'next';
import PhilosophyHistoryContent from '@/app/about/philosophy-history/PhilosophyHistoryContent';

export const metadata: Metadata = {
  title: 'Philosophy & History | Barbets Duet',
  description: 'Exploring the origins of the Barbets Duet collective and the philosophical foundations of our systems-change work.',
};

export default function PhilosophyHistoryPage() {
  return <PhilosophyHistoryContent />;
}
