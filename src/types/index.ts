export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  bio?: string;
}

export type ProjectStatus = 'Active' | 'Completed' | 'On Hold';

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: ProjectStatus;
  teamMembers: User[];
  dueDate: string;
}

export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee?: User;
}

export interface Activity {
  id: string;
  projectId?: string;
  userId: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Settings {
  appearance: {
    theme: 'light' | 'dark' | 'system';
  };
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
  };
}
