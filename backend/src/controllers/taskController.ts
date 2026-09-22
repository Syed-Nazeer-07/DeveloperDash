import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/taskService';
import { taskSchema, taskStatusSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = taskService.getAllTasks();
    return sendSuccess(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = taskService.getTaskById(req.params.id as string);
    if (!task) return sendError(res, 'Task not found', 404);
    return sendSuccess(res, task);
  } catch (error) {
    next(error);
  }
};

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const task = taskService.createTask(validatedData);
    return sendSuccess(res, task, 201);
  } catch (error) {
    next(error);
  }
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskSchema.partial().parse(req.body);
    const task = taskService.updateTask(req.params.id as string, validatedData);
    if (!task) return sendError(res, 'Task not found', 404);
    return sendSuccess(res, task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = taskStatusSchema.parse(req.body);
    const task = taskService.updateTaskStatus(req.params.id as string, status);
    if (!task) return sendError(res, 'Task not found', 404);
    return sendSuccess(res, task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = taskService.deleteTask(req.params.id as string);
    if (!success) return sendError(res, 'Task not found', 404);
    return sendSuccess(res, null);
  } catch (error) {
    next(error);
  }
};
