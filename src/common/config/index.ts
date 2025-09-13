import * as Joi from 'joi';
import { config as dotenv } from 'dotenv';
import { IConfig } from '../types';

dotenv();

export const configSchema = Joi.object<IConfig, true>({
  JWT_SECRET_KEY: Joi.string().required(),
  MONGO_DB_URL: Joi.string().required(),
  PORT: Joi.number().required(),
  AWS_S3_REGION: Joi.string().required(),
  AWS_PRIVATE_ACCESS_KEY: Joi.string().required(),
  AWS_ACCESS_KEY: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
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
  AWS_ACCESS_KEY: String(validatedEnv.AWS_ACCESS_KEY),
  AWS_PRIVATE_ACCESS_KEY: String(validatedEnv.AWS_PRIVATE_ACCESS_KEY),
  AWS_S3_REGION: String(validatedEnv.AWS_S3_REGION),
  AWS_BUCKET_NAME: String(validatedEnv.AWS_BUCKET_NAME),
};
