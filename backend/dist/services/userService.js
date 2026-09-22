"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const data_1 = require("../data");
const getAllUsers = () => {
    return data_1.users;
};
exports.getAllUsers = getAllUsers;
const getUserById = (id) => {
    return data_1.users.find(u => u.id === id);
};
exports.getUserById = getUserById;
const createUser = (data) => {
    const newUser = {
        id: Date.now().toString(),
        ...data
    };
    data_1.users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const updateUser = (id, data) => {
    const index = data_1.users.findIndex(u => u.id === id);
    if (index === -1)
        return undefined;
    data_1.users[index] = { ...data_1.users[index], ...data };
    return data_1.users[index];
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    const index = data_1.users.findIndex(u => u.id === id);
    if (index === -1)
        return false;
    data_1.users.splice(index, 1);
    return true;
};
exports.deleteUser = deleteUser;
