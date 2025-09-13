import { Types } from 'mongoose';
import { USER_ROLES_ENUM } from '../constants';

export interface IConfig {
  JWT_SECRET_KEY: string;
  MONGO_DB_URL: string;
  PORT: number;
  AWS_S3_REGION: string;
  AWS_ACCESS_KEY: string;
  AWS_PRIVATE_ACCESS_KEY: string;
  AWS_BUCKET_NAME: string;
}

export type mongoID = Types.ObjectId;

export interface IToken {
  email: string;
  userId: string;
  role: string;
}

export interface CustomContext extends Request {
  user: {
    args: IToken;
  };
}
export interface IContext {
  req: CustomContext;
  res: Response;
  payload?: any;
}

export interface IUser {
  email: string;
  userId: mongoID;
  role: USER_ROLES_ENUM;
  iat: number;
  exp: number;
}
