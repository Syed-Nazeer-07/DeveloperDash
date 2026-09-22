import { Request, Response, NextFunction } from 'express';
import * as projectService from '../services/projectService';
import { projectSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

export const getProjects = (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = projectService.getAllProjects();
    return sendSuccess(res, projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = projectService.getProjectById(req.params.id as string);
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, project);
  } catch (error) {
    next(error);
  }
};

export const createProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = projectSchema.parse(req.body);
    const project = projectService.createProject(validatedData);
    return sendSuccess(res, project, 201);
  } catch (error) {
    next(error);
  }
};

export const updateProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = projectSchema.partial().parse(req.body);
    const project = projectService.updateProject(req.params.id as string, validatedData);
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = projectService.deleteProject(req.params.id as string);
    if (!success) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, null);
  } catch (error) {
    next(error);
  }
};
