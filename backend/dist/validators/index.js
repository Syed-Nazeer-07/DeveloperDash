"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStatusSchema = exports.taskSchema = exports.projectSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email format'),
});
exports.projectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
});
const TASK_STATUSES = ['todo', 'in-progress', 'done'];
exports.taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    status: zod_1.z.enum(TASK_STATUSES).default('todo'),
});
exports.taskStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(TASK_STATUSES),
});
