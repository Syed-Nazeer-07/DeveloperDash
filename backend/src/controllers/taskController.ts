import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import Task from '../models/Task';
import Project from '../models/Project';
import { taskSchema, taskStatusSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Find all projects owned by the user
    const projects = await Project.find({ user: req.user._id }).select('_id');
    const projectIds = projects.map(p => p._id);

    let query: any = { projectId: { $in: projectIds } };

    // Basic filtering
    if (req.query.projectId) query.projectId = req.query.projectId;
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 }).populate('projectId', 'name').populate('assignee');
    return sendSuccess(res, tasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id).populate('projectId', 'name user').populate('assignee');
    if (!task) return sendError(res, 'Task not found', 404);

    // Check ownership via populated project
    const project: any = task.projectId;
    if (project.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized', 401);
    }

    return sendSuccess(res, task);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskSchema.parse(req.body);

    // Verify project exists and belongs to user
    const project = await Project.findOne({ _id: validatedData.projectId, user: req.user._id });
    if (!project) return sendError(res, 'Project not found or not authorized', 404);

    const task = await Task.create({
      ...validatedData,
      assignee: validatedData.assignee || req.user._id // Assign to creator by default if not provided
    });
    return sendSuccess(res, await task.populate('assignee'), 201);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskSchema.partial().parse(req.body);

    const task = await Task.findById(req.params.id).populate('projectId');
    if (!task) return sendError(res, 'Task not found', 404);

    const project: any = task.projectId;
    if (project.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized', 401);
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, validatedData, { new: true, runValidators: true }).populate('assignee');
    return sendSuccess(res, updatedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = taskStatusSchema.parse(req.body);
    
    const task = await Task.findById(req.params.id).populate('projectId');
    if (!task) return sendError(res, 'Task not found', 404);

    const project: any = task.projectId;
    if (project.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized', 401);
    }

    task.status = validatedData.status;
    await task.save();

    return sendSuccess(res, await task.populate('assignee'));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id).populate('projectId');
    if (!task) return sendError(res, 'Task not found', 404);

    const project: any = task.projectId;
    if (project.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'Not authorized', 401);
    }

    await task.deleteOne();
    return sendSuccess(res, null);
  } catch (error) {
    next(error);
  }
};
