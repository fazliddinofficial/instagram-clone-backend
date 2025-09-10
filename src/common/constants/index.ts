import { registerEnumType } from '@nestjs/graphql';

export const CONTROLLERS_NAMES = {
  signIn: 'signIn',
  signUp: 'signUp',

  createUser: 'createUser',
  updateUserById: 'updateUserById',
  deleteUserById: 'deleteUserById',
  getUsersById: 'getUsersById',
  getAllUsers: 'getAllUsers',

  createPost: 'createPost',
  updatePostById: 'updatePostById',
  deletePostById: 'deletePostById',
  getPostsById: 'getPostsById',
  getAllPosts: 'getAllPosts',

  createComment: 'createComment',
  updateCommentById: 'updateCommentById',
  deleteCommentById: 'deleteCommentById',
  getAllComments: 'getAllComments',
};

export const saltRounds = 10;

export const PASSWORD_MIN_LENGTH: number = 4;

export enum USER_ROLES_ENUM {
  user = 'user',
  admin = 'admin',
  superAdmin = 'superAdmin',
}

registerEnumType(USER_ROLES_ENUM, {
  name: 'USER_ROLES_ENUM',
});
