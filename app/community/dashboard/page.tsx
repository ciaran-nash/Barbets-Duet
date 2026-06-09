import { Metadata } from 'next';
import MemberDashboard from './MemberDashboard';

export const metadata: Metadata = {
  title: 'Member Dashboard | Barbets Duet Community',
  description: 'Your Barbets Duet member profile, role, and site affiliations.',
};

export default function CommunityDashboardPage() {
  return <MemberDashboard />;
}
