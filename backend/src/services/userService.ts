import { users } from '../data';
import { User } from '../types';

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const createUser = (data: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: Date.now().toString(),
    ...data
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id: string, data: Partial<Omit<User, 'id'>>): User | undefined => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return undefined;
  
  users[index] = { ...users[index], ...data };
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  
  users.splice(index, 1);
  return true;
};
