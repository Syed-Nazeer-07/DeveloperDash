import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ZodError) {
    const message = err.issues.map((e: any) => e.message).join(', ');
    return sendError(res, message, 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, 'Route not found', 404);
};
