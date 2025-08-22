import { CONTROLLERS_NAMES } from '.';

const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUsersById,
  signIn,
  signUp,
  updateUserById,

  createPost,
  deletePostById,
  getAllPosts,
  getPostsById,
  updatePostById,
} = CONTROLLERS_NAMES;

export const PERMISSIONS = {
  user: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
    createPost,
    deletePostById,
    getAllPosts,
    getPostsById,
    updatePostById,
  ]),
  admin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
    createPost,
    deletePostById,
    getAllPosts,
    getPostsById,
    updatePostById,
  ]),
  superAdmin: new Set([
    createUser,
    deleteUserById,
    getAllUsers,
    getUsersById,
    updateUserById,
    createPost,
    deletePostById,
    getAllPosts,
    getPostsById,
    updatePostById,
  ]),
  whiteList: new Set([signIn, signUp]),
};
