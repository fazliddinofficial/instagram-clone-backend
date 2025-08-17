import { registerEnumType } from '@nestjs/graphql';

export const CONTROLLERS_NAMES = {
  createUser: 'createUser',
  updateUserById: 'updateUserById',
  deleteUserById: 'deleteUserById',
  getUsersById: 'getUsersById',
  getAllUsers: 'getAllUsers',
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
