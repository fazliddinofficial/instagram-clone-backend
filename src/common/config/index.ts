import * as Joi from 'joi';
import { config as dotenv } from 'dotenv';
import { IConfig } from '../types';

dotenv();

export const configSchema = Joi.object<IConfig, true>({
  JWT_SECRET_KEY: Joi.string().required(),
  MONGO_DB_URL: Joi.string().required(),
  PORT: Joi.number().required(),
});

const { error, value: validatedEnv } = configSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

export const config: IConfig = {
  JWT_SECRET_KEY: String(validatedEnv.JWT_SECRET_KEY),
  MONGO_DB_URL: String(validatedEnv.MONGO_DB_URL),
  PORT: Number(validatedEnv.PORT),
};
