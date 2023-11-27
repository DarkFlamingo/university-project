import { config } from 'dotenv';
import { AppEnvironment } from '~/common/enums/app/app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  DB_CONNECTION_STRING,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_CLIENT,
  SECRET_KEY,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
  },
  DB: {
    CONNECTION_STRING: DB_CONNECTION_STRING,
    CLIENT: DB_CLIENT,
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '24h',
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
};

export { ENV };
