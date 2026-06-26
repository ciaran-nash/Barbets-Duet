'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import { StickyFooter } from '@/components/ui/sticky-footer';
import CTA from '@/components/CTA';
import { HubHero } from '@/components/projects/HubHero';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { FeaturedInvention } from '@/components/projects/FeaturedInvention';
import { ScrollGlow } from '@/components/motion/ScrollGlow';
import { ProjectDetailDrawer } from '@/components/projects/ProjectDetailDrawer';
import { Project } from '@/types/project';

export default function InnovationHubContent({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      <Header />
      
      <main className="relative">
        <ScrollGlow top="5%" right="-10%" opacity={0.15} size={1200} />
        <ScrollGlow top="60%" left="-10%" color="var(--brand)" opacity={0.1} size={1500} />

        <HubHero />
        
        <FeaturedInvention />

        <div className="max-w-[1600px] mx-auto px-6 py-32">
          <ProjectFilters activeFilter={filter} onFilterChange={setFilter} />
          <ProjectGrid projects={filteredProjects} onProjectClick={handleProjectClick} />
        </div>

        <ProjectDetailDrawer 
            project={selectedProject} 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
        />
      </main>

      <CTA />
      <StickyFooter />
    </div>
  );
}
