"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getAllProjects = void 0;
const data_1 = require("../data");
const getAllProjects = () => {
    return data_1.projects;
};
exports.getAllProjects = getAllProjects;
const getProjectById = (id) => {
    return data_1.projects.find(p => p.id === id);
};
exports.getProjectById = getProjectById;
const createProject = (data) => {
    const newProject = {
        id: Date.now().toString(),
        ...data
    };
    data_1.projects.push(newProject);
    return newProject;
};
exports.createProject = createProject;
const updateProject = (id, data) => {
    const index = data_1.projects.findIndex(p => p.id === id);
    if (index === -1)
        return undefined;
    data_1.projects[index] = { ...data_1.projects[index], ...data };
    return data_1.projects[index];
};
exports.updateProject = updateProject;
const deleteProject = (id) => {
    const index = data_1.projects.findIndex(p => p.id === id);
    if (index === -1)
        return false;
    data_1.projects.splice(index, 1);
    return true;
};
exports.deleteProject = deleteProject;
