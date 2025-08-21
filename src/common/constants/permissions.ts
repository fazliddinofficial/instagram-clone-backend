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
    signIn,
    signUp,
    updateUserById,
  ]),
  admin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    signIn,
    signUp,
    updateUserById,
  ]),
  superAdmin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    signIn,
    signUp,
    updateUserById,
  ]),
  whiteList: new Set([signIn, signUp]),
};
