import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { userSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = userService.getAllUsers();
    return sendSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = userService.getUserById(req.params.id as string);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = userService.createUser(validatedData);
    return sendSuccess(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = userSchema.partial().parse(req.body);
    const user = userService.updateUser(req.params.id as string, validatedData);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = userService.deleteUser(req.params.id as string);
    if (!success) return sendError(res, 'User not found', 404);
    return sendSuccess(res, null);
  } catch (error) {
    next(error);
  }
};
