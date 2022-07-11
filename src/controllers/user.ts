import User from '../classes/User.ts';

const getAllUsers = () => {
  return [] as User[];
};

const createUser = () => {
  return new User();
};

const getUserById = () => {
  return new User();
};

const getUserByEmail = () => {
  return new User();
};

const updateUserById = () => {
  return new User();
};

const deleteUserById = () => {
  return new User();
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
};
