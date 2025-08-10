import * as Joi from 'joi';
import { config as dotenv } from 'dotenv';
import { IConfig } from '../types';

dotenv();

export const configSchema = Joi.object<IConfig, true>({
  JWT_SECRET_KEY: Joi.string().required(),
  MONGO_DB_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});

export const config: IConfig = {
  JWT_SECRET_KEY: String(process.env.JWT_SECRET_KEY),
  MONGO_DB_URL: String(process.env.MONGO_DB_URL),
  PORT: Number(process.env.PORT),
};
