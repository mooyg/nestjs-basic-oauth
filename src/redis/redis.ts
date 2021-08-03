import * as Redis from 'ioredis';
import 'dotenv/config';

export const redis = new Redis({
  port: 15222,
  host: process.env.REDIS_HOST,
  family: 4,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});
