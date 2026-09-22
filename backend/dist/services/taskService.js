"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskStatus = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const data_1 = require("../data");
const getAllTasks = () => {
    return data_1.tasks;
};
exports.getAllTasks = getAllTasks;
const getTaskById = (id) => {
    return data_1.tasks.find(t => t.id === id);
};
exports.getTaskById = getTaskById;
const createTask = (data) => {
    const newTask = {
        id: Date.now().toString(),
        ...data
    };
    data_1.tasks.push(newTask);
    return newTask;
};
exports.createTask = createTask;
const updateTask = (id, data) => {
    const index = data_1.tasks.findIndex(t => t.id === id);
    if (index === -1)
        return undefined;
    data_1.tasks[index] = { ...data_1.tasks[index], ...data };
    return data_1.tasks[index];
};
exports.updateTask = updateTask;
const updateTaskStatus = (id, status) => {
    const index = data_1.tasks.findIndex(t => t.id === id);
    if (index === -1)
        return undefined;
    data_1.tasks[index].status = status;
    return data_1.tasks[index];
};
exports.updateTaskStatus = updateTaskStatus;
const deleteTask = (id) => {
    const index = data_1.tasks.findIndex(t => t.id === id);
    if (index === -1)
        return false;
    data_1.tasks.splice(index, 1);
    return true;
};
exports.deleteTask = deleteTask;
