import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['Planning', 'Active', 'Completed', 'On Hold']).optional(),
  progress: z.number().optional(),
  dueDate: z.string().or(z.date()).optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['Todo', 'In Progress', 'Completed']).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  dueDate: z.string().or(z.date()).optional(),
  projectId: z.string().min(1, 'Project ID is required'),
  assignee: z.string().optional(),
});

export const taskStatusSchema = z.object({
  status: z.enum(['Todo', 'In Progress', 'Completed']),
});

export const aiGenerateSchema = z.object({
  projectTitle: z.string().min(1, 'Project title is required'),
  projectDescription: z.string().min(1, 'Project description is required'),
});
