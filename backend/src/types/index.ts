export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
