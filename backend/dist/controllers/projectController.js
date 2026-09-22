"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const projectService = __importStar(require("../services/projectService"));
const validators_1 = require("../validators");
const response_1 = require("../utils/response");
const getProjects = (req, res, next) => {
    try {
        const projects = projectService.getAllProjects();
        return (0, response_1.sendSuccess)(res, projects);
    }
    catch (error) {
        next(error);
    }
};
exports.getProjects = getProjects;
const getProject = (req, res, next) => {
    try {
        const project = projectService.getProjectById(req.params.id);
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        return (0, response_1.sendSuccess)(res, project);
    }
    catch (error) {
        next(error);
    }
};
exports.getProject = getProject;
const createProject = (req, res, next) => {
    try {
        const validatedData = validators_1.projectSchema.parse(req.body);
        const project = projectService.createProject(validatedData);
        return (0, response_1.sendSuccess)(res, project, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createProject = createProject;
const updateProject = (req, res, next) => {
    try {
        const validatedData = validators_1.projectSchema.partial().parse(req.body);
        const project = projectService.updateProject(req.params.id, validatedData);
        if (!project)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        return (0, response_1.sendSuccess)(res, project);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => {
    try {
        const success = projectService.deleteProject(req.params.id);
        if (!success)
            return (0, response_1.sendError)(res, 'Project not found', 404);
        return (0, response_1.sendSuccess)(res, null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
