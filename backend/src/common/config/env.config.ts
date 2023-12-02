import { config } from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

config();

export const env = cleanEnv(process.env, {
  PORT: num(),
  DATABASE_HOST: str(),
  DATABASE_PORT: num(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
});
