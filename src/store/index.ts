import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Task, Activity, Notification, Settings, User } from '../types';
import { defaultSettings } from '../data/mockData';
import { api } from '../lib/api';

interface DashboardState {
  currentUser: User | null;
  users: User[];
  isLoadingUsers: boolean;
  errorUsers: string | null;
  fetchUsers: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  
  projects: Project[];
  isLoadingProjects: boolean;
  errorProjects: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  tasks: Task[];
  isLoadingTasks: boolean;
  errorTasks: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  priorityFilter: string | null;
  setPriorityFilter: (priority: string | null) => void;
  
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<DashboardState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      isLoadingUsers: false,
      errorUsers: null,
      fetchUsers: async () => {
        set({ isLoadingUsers: true, errorUsers: null });
        try {
          const users = await api.fetchUsers();
          set({ users, isLoadingUsers: false, currentUser: users[0] || null });
        } catch (error: any) {
          set({ errorUsers: error.message, isLoadingUsers: false });
        }
      },
      updateUser: (updates) => set((state) => ({ 
        currentUser: state.currentUser ? { ...state.currentUser, ...updates } : null 
      })),
  
      projects: [],
      isLoadingProjects: false,
      errorProjects: null,
      fetchProjects: async () => {
        set({ isLoadingProjects: true, errorProjects: null });
        try {
          const projects = await api.fetchProjects();
          set({ projects, isLoadingProjects: false });
        } catch (error: any) {
          set({ errorProjects: error.message, isLoadingProjects: false });
        }
      },
      addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
      
      tasks: [],
      isLoadingTasks: false,
      errorTasks: null,
      fetchTasks: async () => {
        set({ isLoadingTasks: true, errorTasks: null });
        try {
          const tasks = await api.fetchTasks();
          set({ tasks, isLoadingTasks: false });
        } catch (error: any) {
          set({ errorTasks: error.message, isLoadingTasks: false });
        }
      },
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
      })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      
      activities: [],
      addActivity: (activity) => set((state) => ({
        activities: [
          {
            ...activity,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date().toISOString(),
          },
          ...state.activities,
        ]
      })),
      
      notifications: [],
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
      })),
      deleteNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),
      
      settings: defaultSettings,
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      statusFilter: null,
      setStatusFilter: (status) => set({ statusFilter: status }),
      priorityFilter: null,
      setPriorityFilter: (priority) => set({ priorityFilter: priority }),
      
      isDarkMode: true,
      toggleDarkMode: () => set((state) => {
        const newMode = !state.isDarkMode;
        if (typeof document !== 'undefined') {
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: newMode };
      }),
    }),
    {
      name: 'developer-dashboard-storage',
      partialize: (state) => ({ 
        currentUser: state.currentUser,
        settings: state.settings,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
