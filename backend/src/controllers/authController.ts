import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { registerSchema, loginSchema } from '../validators';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../middleware/auth';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const userExists = await User.findOne({ email: validatedData.email });
    if (userExists) {
      return sendError(res, 'User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    const token = generateToken((user._id as any).toString());

    return sendSuccess(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    }, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(validatedData.password, user.password as string);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = generateToken((user._id as any).toString());

    return sendSuccess(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return sendError(res, 'Not authorized', 401);
    }
    return sendSuccess(res, {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    next(error);
  }
};
