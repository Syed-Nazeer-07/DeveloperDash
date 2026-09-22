"use client";

import { useStore } from '@/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { FolderKanban } from 'lucide-react';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function ProjectsPage() {
  const { projects, searchQuery } = useStore();
  const [statusFilter, setStatusFilter] = useState<string | null>('All');
  const [sortBy, setSortBy] = useState<string>('Name');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter && statusFilter !== 'All' ? project.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Deadline') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortBy === 'Progress') return b.progress - a.progress;
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">
              Manage your team's projects and track their progress.
            </p>
          </div>
          <CreateProjectModal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Select value={statusFilter || 'All'} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Name">Sort by Name</SelectItem>
                <SelectItem value="Deadline">Sort by Deadline</SelectItem>
                <SelectItem value="Progress">Sort by Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <EmptyState 
            icon={FolderKanban}
            title="No projects found"
            description="Create a new project to get started, or adjust your search filters."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
