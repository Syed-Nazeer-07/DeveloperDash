"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof zod_1.ZodError) {
        const message = err.issues.map((e) => e.message).join(', ');
        return (0, response_1.sendError)(res, message, 400);
    }
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return (0, response_1.sendError)(res, message, statusCode);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    return (0, response_1.sendError)(res, 'Route not found', 404);
};
exports.notFoundHandler = notFoundHandler;
