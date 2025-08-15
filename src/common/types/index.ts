import { Types } from 'mongoose';

export interface IConfig {
  JWT_SECRET_KEY: string;
  MONGO_DB_URL: string;
  PORT: number;
}

export type mongoID = Types.ObjectId;
