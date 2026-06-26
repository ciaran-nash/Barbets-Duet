import { Metadata } from 'next';
import InnovationHubContent from './InnovationHubContent';
import { projects as staticProjects } from '@/lib/data/projects';
import { getAllProjectsFromSanity } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Innovation Hub | Barbets Duet',
  description: 'Exploring regional inventions and systemic restoration projects from across the Barbets network.',
};

export default async function InnovationHubPage() {
  const sanityProjects = await getAllProjectsFromSanity();
  const projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;
  return <InnovationHubContent projects={projects} />;
}
