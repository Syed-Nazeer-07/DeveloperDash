import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const;

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum(TASK_STATUSES).default('todo'),
});

export const taskStatusSchema = z.object({
  status: z.enum(TASK_STATUSES),
});
