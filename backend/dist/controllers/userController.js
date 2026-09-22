"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const response_1 = require("../utils/response");
const getUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find({});
        return (0, response_1.sendSuccess)(res, users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user)
            return (0, response_1.sendError)(res, 'User not found', 404);
        return (0, response_1.sendSuccess)(res, user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const createUser = async (req, res, next) => {
    // Normally handled by register, but leaving for compat
    try {
        const user = await User_1.default.create(req.body);
        return (0, response_1.sendSuccess)(res, user, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user)
            return (0, response_1.sendError)(res, 'User not found', 404);
        return (0, response_1.sendSuccess)(res, user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return (0, response_1.sendError)(res, 'User not found', 404);
        return (0, response_1.sendSuccess)(res, null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
