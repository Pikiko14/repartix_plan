import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_URL: string;
  APP_ENV: string;
  ATLAS_URL: string;
}

const envsSchema = joi.object({
  ATLAS_URL: joi.optional(),
  PORT: joi.number().required(),
  APP_ENV: joi.string().required(),
  DB_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({ 
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  port: envVars.PORT,
  app_env: envVars.APP_ENV,
  db_url: envVars.DB_URL,
  atlas_url: envVars.ATLAS_URL,
}