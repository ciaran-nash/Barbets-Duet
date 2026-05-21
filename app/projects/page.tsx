import { Metadata } from 'next';
import InnovationHubContent from './InnovationHubContent';

export const metadata: Metadata = {
  title: 'Innovation Hub | Barbets Duet',
  description: 'Exploring regional inventions and systemic restoration projects from across the Barbets network.',
};

export default function InnovationHubPage() {
  return <InnovationHubContent />;
}
