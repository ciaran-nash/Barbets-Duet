'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid({ 
  projects, 
  onProjectClick 
}: { 
  projects: Project[],
  onProjectClick: (project: Project) => void
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            onClick={() => onProjectClick(project)}
          />
        ))}
      </AnimatePresence>
      
      {projects.length === 0 && (
        <div className="col-span-full py-32 text-center">
            <p className="text-2xl font-serif text-muted-foreground italic">No projects found in this ecosystem cluster.</p>
        </div>
      )}
    </div>
  );
}
