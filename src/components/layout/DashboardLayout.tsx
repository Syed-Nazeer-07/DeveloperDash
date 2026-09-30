"use client";

import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useStore } from '@/store';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { 
    isDarkMode, 
    fetchUsers, fetchProjects, fetchTasks, 
    isLoadingUsers, isLoadingProjects, isLoadingTasks,
    errorUsers, errorProjects, errorTasks,
    users, projects, tasks
  } = useStore();

  useEffect(() => {
    fetchUsers();
    fetchProjects();
    fetchTasks();
  }, [fetchUsers, fetchProjects, fetchTasks]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const hasData = users.length > 0 || projects.length > 0 || tasks.length > 0;
  const isInitialLoading = (isLoadingUsers || isLoadingProjects || isLoadingTasks) && !hasData;
  const hasError = errorUsers || errorProjects || errorTasks;

  if (isInitialLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (hasError && !hasData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground space-y-4 p-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Unable to connect to server</h2>
        <p className="text-muted-foreground max-w-md">
          The backend API is currently unreachable. Please check your connection or try again later.
        </p>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => { fetchUsers(); fetchProjects(); fetchTasks(); }}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
