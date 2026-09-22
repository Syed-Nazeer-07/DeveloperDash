import { User, Project, Task } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  async login(credentials: any): Promise<{ token: string, user: any }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to login');
    return json.data;
  },

  async register(data: any): Promise<{ token: string, user: any }> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to register');
    return json.data;
  },

  async getMe(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch user');
    return json.data;
  },

  async fetchUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE_URL}/users`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch users');
    const json: ApiResponse<User[]> = await res.json();
    return json.data;
  },

  // Projects
  async fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json: ApiResponse<Project[]> = await res.json();
    return json.data;
  },

  async getProject(id: string): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch project');
    const json: ApiResponse<Project> = await res.json();
    return json.data;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(project),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create project');
    return json.data;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update project');
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  // Tasks
  async fetchTasks(projectId?: string): Promise<Task[]> {
    const url = projectId ? `${API_BASE_URL}/tasks?projectId=${projectId}` : `${API_BASE_URL}/tasks`;
    const res = await fetch(url, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const json: ApiResponse<Task[]> = await res.json();
    return json.data;
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(task),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create task');
    return json.data;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update task');
    return json.data;
  },

  async updateTaskStatus(id: string, status: string): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update task status');
    return json.data;
  },

  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete task');
  },

  // AI
  async generateTasks(projectTitle: string, projectDescription: string): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/ai/generate-tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ projectTitle, projectDescription }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to generate tasks');
    return json.data.tasks;
  }
};
