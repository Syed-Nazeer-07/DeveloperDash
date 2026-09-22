"use client";

import { useStore } from '@/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TaskCard } from '@/components/tasks/TaskCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { CheckSquare } from 'lucide-react';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function TasksPage() {
  const { tasks, searchQuery, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter } = useStore();
  const [sortBy, setSortBy] = useState<string>('DueDate');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesStatus = statusFilter && statusFilter !== 'All' ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter && priorityFilter !== 'All' ? task.priority === priorityFilter : true;
    
    return matchesSearch && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    if (sortBy === 'DueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    if (sortBy === 'Priority') {
       const p = { High: 3, Medium: 2, Low: 1 };
       return p[b.priority] - p[a.priority];
    }
    if (sortBy === 'Status') {
       const s = { 'Completed': 3, 'In Progress': 2, 'Todo': 1 };
       return s[a.status] - s[b.status];
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all your tasks across projects.
            </p>
          </div>
          <CreateTaskModal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter || 'All'} onValueChange={(val) => setStatusFilter(val === 'All' ? null : val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter || 'All'} onValueChange={(val) => setPriorityFilter(val === 'All' ? null : val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(val) => val && setSortBy(val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DueDate">Sort by Due Date</SelectItem>
                <SelectItem value="Priority">Sort by Priority</SelectItem>
                <SelectItem value="Status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <EmptyState 
            icon={CheckSquare}
            title="No tasks found"
            description="Create a new task or adjust your filters."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
