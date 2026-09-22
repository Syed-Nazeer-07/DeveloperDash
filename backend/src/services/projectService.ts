import { projects } from '../data';
import { Project } from '../types';

export const getAllProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const createProject = (data: Omit<Project, 'id'>): Project => {
  const newProject: Project = {
    id: Date.now().toString(),
    ...data
  };
  projects.push(newProject);
  return newProject;
};

export const updateProject = (id: string, data: Partial<Omit<Project, 'id'>>): Project | undefined => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  
  projects[index] = { ...projects[index], ...data };
  return projects[index];
};

export const deleteProject = (id: string): boolean => {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  projects.splice(index, 1);
  return true;
};
