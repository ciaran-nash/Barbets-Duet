import { Metadata } from 'next';
import MissionVisionContent from './MissionVisionContent';

export const metadata: Metadata = {
  title: 'Mission & Vision | Barbets Duet',
  description: 'Our commitment to restoring ecosystems through collaborative innovation and sustainable land models.',
};

export default function MissionVisionPage() {
  return <MissionVisionContent />;
}
