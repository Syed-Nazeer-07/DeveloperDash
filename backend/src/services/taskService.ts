import { tasks } from '../data';
import { Task, TaskStatus } from '../types';

export const getAllTasks = (): Task[] => {
  return tasks;
};

export const getTaskById = (id: string): Task | undefined => {
  return tasks.find(t => t.id === id);
};

export const createTask = (data: Omit<Task, 'id'>): Task => {
  const newTask: Task = {
    id: Date.now().toString(),
    ...data
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id: string, data: Partial<Omit<Task, 'id'>>): Task | undefined => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
};

export const updateTaskStatus = (id: string, status: TaskStatus): Task | undefined => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  
  tasks[index].status = status;
  return tasks[index];
};

export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return false;
  
  tasks.splice(index, 1);
  return true;
};
