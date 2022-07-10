import User from '../classes/User.ts';

const newUser = () => {
  return new User();
};

const getAllUsers = () => {
  return [] as User[];
};

const getUserById = () => {
  return new User();
};

const getUserByEmail = () => {
  return new User();
};

const createUser = () => {
  return new User();
};

const updateUserById = () => {
  return new User();
};

const deleteUserById = () => {
  return new User();
};

export default {
  newUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
};
