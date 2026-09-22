"use client";

import { useStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, CheckSquare, Clock, Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function StatCards() {
  const { projects, tasks, setStatusFilter } = useStore();
  const router = useRouter();

  const totalProjects = projects.length;
  const activeTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const productivity = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const stats = [
    { 
      name: 'Total Projects', 
      value: totalProjects, 
      icon: FolderKanban, 
      trend: '+2 this month',
      onClick: () => router.push('/projects')
    },
    { 
      name: 'Active Tasks', 
      value: activeTasks, 
      icon: Clock, 
      trend: '-1 from last week',
      onClick: () => {
        setStatusFilter('In Progress');
        router.push('/tasks');
      }
    },
    { 
      name: 'Completed Tasks', 
      value: completedTasks, 
      icon: CheckSquare, 
      trend: '+8 this week',
      onClick: () => {
        setStatusFilter('Completed');
        router.push('/tasks');
      }
    },
    { 
      name: 'Team Productivity', 
      value: `${productivity}%`, 
      icon: Activity, 
      trend: '+5.4% from last month',
      onClick: () => router.push('/analytics')
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card 
          key={stat.name} 
          className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
          onClick={stat.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
