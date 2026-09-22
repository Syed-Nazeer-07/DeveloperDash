import { User, Project, Task, Activity, Notification, Settings } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Smith', email: 'alice@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', role: 'Frontend Engineer', bio: 'Passionate about UI/UX.' },
  { id: 'u2', name: 'Bob Jones', email: 'bob@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', role: 'Backend Engineer' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', role: 'Product Manager' },
  { id: 'u4', name: 'Diana Prince', email: 'diana@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d', role: 'Designer' },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Overhaul the corporate website using Next.js and Tailwind CSS.',
    progress: 75,
    status: 'Active',
    teamMembers: [mockUsers[0], mockUsers[1]],
    dueDate: '2026-10-15',
  },
  {
    id: 'p2',
    name: 'Mobile App Launch',
    description: 'Prepare the backend API and launch the React Native mobile app.',
    progress: 40,
    status: 'Active',
    teamMembers: [mockUsers[2], mockUsers[3], mockUsers[0]],
    dueDate: '2026-11-01',
  },
  {
    id: 'p3',
    name: 'Database Migration',
    description: 'Migrate legacy database to PostgreSQL.',
    progress: 100,
    status: 'Completed',
    teamMembers: [mockUsers[1]],
    dueDate: '2026-09-01',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design system updates',
    description: 'Update the design tokens to match new brand guidelines.',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-09-10',
    assignee: mockUsers[0],
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Implement Dark Mode',
    description: 'Ensure all components support dark mode correctly.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-09-25',
    assignee: mockUsers[1],
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'API Authentication',
    description: 'Set up JWT based authentication for the mobile app.',
    status: 'Todo',
    priority: 'High',
    dueDate: '2026-10-05',
    assignee: mockUsers[2],
  },
  {
    id: 't4',
    projectId: 'p2',
    title: 'Push Notifications',
    description: 'Integrate Firebase for push notifications.',
    status: 'Todo',
    priority: 'Medium',
    dueDate: '2026-10-20',
    assignee: mockUsers[3],
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    projectId: 'p1',
    userId: 'u1',
    action: 'completed task',
    target: 'Design system updates',
    timestamp: '2026-09-10T14:30:00Z',
  },
  {
    id: 'a2',
    projectId: 'p1',
    userId: 'u2',
    action: 'started working on',
    target: 'Implement Dark Mode',
    timestamp: '2026-09-22T09:00:00Z',
  },
  {
    id: 'a3',
    projectId: 'p2',
    userId: 'u3',
    action: 'commented on',
    target: 'API Authentication',
    timestamp: '2026-09-21T16:45:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Project Update',
    message: 'Mobile App Launch deadline was changed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    link: '/projects'
  },
  {
    id: 'n2',
    title: 'Task Assigned',
    message: 'You have been assigned to "Implement Dark Mode".',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
    link: '/tasks'
  }
];

export const defaultSettings: Settings = {
  appearance: {
    theme: 'system',
  },
  notifications: {
    email: true,
    push: true,
    projectUpdates: true,
  }
};
