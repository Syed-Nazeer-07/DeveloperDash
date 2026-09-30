import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import Project from '../models/Project';
import Task from '../models/Task';
import { projectSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate('teamMembers').sort({ createdAt: -1 });
    return sendSuccess(res, projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id }).populate('teamMembers');
    if (!project) return sendError(res, 'Project not found', 404);
    
    // Also get tasks for this project
    const tasks = await Task.find({ projectId: project._id });
    
    return sendSuccess(res, { ...project.toJSON(), tasks });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = projectSchema.parse(req.body);
    const project = await Project.create({
      ...validatedData,
      user: req.user._id,
      teamMembers: [req.user._id],
    });
    return sendSuccess(res, await project.populate('teamMembers'), 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const validatedData = projectSchema.partial().parse(req.body);
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      validatedData,
      { new: true, runValidators: true }
    ).populate('teamMembers');
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!project) return sendError(res, 'Project not found', 404);
    
    // Delete associated tasks
    await Task.deleteMany({ projectId: req.params.id });
    
    return sendSuccess(res, null);
  } catch (error) {
    next(error);
  }
};
