import { Types } from 'mongoose';

export interface IConfig {
  JWT_SECRET_KEY: string;
  MONGO_DB_URL: string;
  PORT: number;
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
