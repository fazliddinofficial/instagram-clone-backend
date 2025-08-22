import { CONTROLLERS_NAMES } from '.';

const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUsersById,
  signIn,
  signUp,
  updateUserById,
} = CONTROLLERS_NAMES;

export const PERMISSIONS = {
  user: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
  ]),
  admin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
  ]),
  superAdmin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
  ]),
  whiteList: new Set([signIn, signUp]),
};
