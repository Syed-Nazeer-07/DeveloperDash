import { create } from 'zustand';
import { api } from '../lib/api';
import { useStore } from './index';
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    const { token, user } = await api.login(credentials);
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    useStore.setState({ currentUser: user });
  },

  register: async (data) => {
    const { token, user } = await api.register(data);
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    useStore.setState({ currentUser: user });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
    useStore.setState({ currentUser: null, projects: [], tasks: [], activities: [] });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      useStore.setState({ currentUser: null });
      return;
    }
    try {
      const user = await api.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
      useStore.setState({ currentUser: user });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      useStore.setState({ currentUser: null });
    }
  }
}));
