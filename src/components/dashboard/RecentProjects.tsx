"use client";

import { useStore } from '@/store';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { FolderKanban } from 'lucide-react';

export function RecentProjects() {
  const { projects, searchQuery } = useStore();

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
      </div>
      
      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={FolderKanban}
          title="No projects found"
          description={searchQuery ? "Try adjusting your search query." : "You haven't created any projects yet."}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
