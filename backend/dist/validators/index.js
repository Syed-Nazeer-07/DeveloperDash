"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiGenerateSchema = exports.taskStatusSchema = exports.taskSchema = exports.projectSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.projectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    status: zod_1.z.enum(['Planning', 'Active', 'Completed', 'On Hold']).optional(),
    progress: zod_1.z.number().optional(),
    dueDate: zod_1.z.string().or(zod_1.z.date()).optional(),
});
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['Todo', 'In Progress', 'Completed']).optional(),
    priority: zod_1.z.enum(['Low', 'Medium', 'High']).optional(),
    dueDate: zod_1.z.string().or(zod_1.z.date()).optional(),
    projectId: zod_1.z.string().min(1, 'Project ID is required'),
    assignee: zod_1.z.string().optional(),
});
exports.taskStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['Todo', 'In Progress', 'Completed']),
});
exports.aiGenerateSchema = zod_1.z.object({
    projectTitle: zod_1.z.string().min(1, 'Project title is required'),
    projectDescription: zod_1.z.string().min(1, 'Project description is required'),
});
