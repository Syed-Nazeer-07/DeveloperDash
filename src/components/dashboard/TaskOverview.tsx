"use client";

import { useStore } from '@/store';
import { TaskCard } from '@/components/tasks/TaskCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { CheckSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TaskOverview() {
  const { tasks, searchQuery, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter } = useStore();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter && statusFilter !== 'All' ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter && priorityFilter !== 'All' ? task.priority === priorityFilter : true;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Task Overview</h2>
        <div className="flex gap-2">
          <Select value={statusFilter || 'All'} onValueChange={(val) => setStatusFilter(val === 'All' ? null : val)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter || 'All'} onValueChange={(val) => setPriorityFilter(val === 'All' ? null : val)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <EmptyState 
          icon={CheckSquare}
          title="No tasks found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
