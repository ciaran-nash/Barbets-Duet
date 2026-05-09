import DashboardClient from './DashboardClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Barbets Duet',
};

export default function Dashboard() {
  return <DashboardClient />;
}
