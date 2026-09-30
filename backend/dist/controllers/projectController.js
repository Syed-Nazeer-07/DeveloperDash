"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const Task_1 = __importDefault(require("../models/Task"));
const validators_1 = require("../validators");
const response_1 = require("../utils/response");
const getProjects = async (req, res, next) => {
    try {
        const projects = await Project_1.default.find({ user: req.user._id }).populate('teamMembers').sort({ createdAt: -1 });
        return (0, response_1.sendSuccess)(res, projects);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
const getProject = async (req, res, next) => {
    try {
        const project = await Project_1.default.findOne({ _id: req.params.id, user: req.user._id }).populate('teamMembers');
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        // Also get tasks for this project
        const tasks = await Task_1.default.find({ projectId: project._id });
        return (0, response_1.sendSuccess)(res, { ...project.toJSON(), tasks });
    }
    catch (error) {
        next(error);
    }
};
exports.getProject = getProject;
const createProject = async (req, res, next) => {
    try {
        const validatedData = validators_1.projectSchema.parse(req.body);
        const project = await Project_1.default.create({
            ...validatedData,
            user: req.user._id,
            teamMembers: [req.user._id],
        });
        return (0, response_1.sendSuccess)(res, await project.populate('teamMembers'), 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const updateProject = async (req, res, next) => {
    try {
        const validatedData = validators_1.projectSchema.partial().parse(req.body);
        const project = await Project_1.default.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, validatedData, { new: true, runValidators: true }).populate('teamMembers');
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        return (0, response_1.sendSuccess)(res, project);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project_1.default.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        // Delete associated tasks
        await Task_1.default.deleteMany({ projectId: req.params.id });
        return (0, response_1.sendSuccess)(res, null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
