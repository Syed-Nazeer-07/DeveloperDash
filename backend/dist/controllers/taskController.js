"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const Project_1 = __importDefault(require("../models/Project"));
const validators_1 = require("../validators");
const response_1 = require("../utils/response");
const getTasks = async (req, res, next) => {
    try {
        // Find all projects owned by the user
        const projects = await Project_1.default.find({ user: req.user._id }).select('_id');
        const projectIds = projects.map(p => p._id);
        let query = { projectId: { $in: projectIds } };
        // Basic filtering
        if (req.query.projectId)
            query.projectId = req.query.projectId;
        if (req.query.status)
            query.status = req.query.status;
        if (req.query.priority)
            query.priority = req.query.priority;
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }
        const tasks = await Task_1.default.find(query).sort({ createdAt: -1 }).populate('projectId', 'name').populate('assignee');
        return (0, response_1.sendSuccess)(res, tasks);
    }
    catch (error) {
        next(error);
    }
};
exports.getTasks = getTasks;
const getTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findById(req.params.id).populate('projectId', 'name user').populate('assignee');
        if (!task)
            return (0, response_1.sendError)(res, 'Task not found', 404);
        // Check ownership via populated project
        const project = task.projectId;
        if (project.user.toString() !== req.user._id.toString()) {
            return (0, response_1.sendError)(res, 'Not authorized', 401);
        }
        return (0, response_1.sendSuccess)(res, task);
    }
    catch (error) {
        next(error);
    }
};
exports.getTask = getTask;
const createTask = async (req, res, next) => {
    try {
        const validatedData = validators_1.taskSchema.parse(req.body);
        // Verify project exists and belongs to user
        const project = await Project_1.default.findOne({ _id: validatedData.projectId, user: req.user._id });
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found or not authorized', 404);
        const task = await Task_1.default.create({
            ...validatedData,
            assignee: validatedData.assignee || req.user._id // Assign to creator by default if not provided
        });
        return (0, response_1.sendSuccess)(res, await task.populate('assignee'), 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createTask = createTask;
const updateTask = async (req, res, next) => {
    try {
        const validatedData = validators_1.taskSchema.partial().parse(req.body);
        const task = await Task_1.default.findById(req.params.id).populate('projectId');
        if (!task)
            return (0, response_1.sendError)(res, 'Task not found', 404);
        const project = task.projectId;
        if (project.user.toString() !== req.user._id.toString()) {
            return (0, response_1.sendError)(res, 'Not authorized', 401);
        }
        const updatedTask = await Task_1.default.findByIdAndUpdate(req.params.id, validatedData, { new: true, runValidators: true }).populate('assignee');
        return (0, response_1.sendSuccess)(res, updatedTask);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTask = updateTask;
const updateTaskStatus = async (req, res, next) => {
    try {
        const validatedData = validators_1.taskStatusSchema.parse(req.body);
        const task = await Task_1.default.findById(req.params.id).populate('projectId');
        if (!task)
            return (0, response_1.sendError)(res, 'Task not found', 404);
        const project = task.projectId;
        if (project.user.toString() !== req.user._id.toString()) {
            return (0, response_1.sendError)(res, 'Not authorized', 401);
        }
        task.status = validatedData.status;
        await task.save();
        return (0, response_1.sendSuccess)(res, await task.populate('assignee'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task_1.default.findById(req.params.id).populate('projectId');
        if (!task)
            return (0, response_1.sendError)(res, 'Task not found', 404);
        const project = task.projectId;
        if (project.user.toString() !== req.user._id.toString()) {
            return (0, response_1.sendError)(res, 'Not authorized', 401);
        }
        await task.deleteOne();
        return (0, response_1.sendSuccess)(res, null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTask = deleteTask;
