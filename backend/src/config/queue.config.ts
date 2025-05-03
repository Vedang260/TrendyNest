// src/config/queue.config.ts
import { BullModuleOptions } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
export const bullConfig = (config: ConfigService): BullModuleOptions => ({
  redis: {
    host: process.env.REDIS_HOST,       // Upstash Redis URL
    port: Number(process.env.REDIS_PORT),       // Upstash Redis port
    password: process.env.REDIS_PASSWORD, // Upstash Redis password
    tls: {},                              // Required for Upstash (SSL)
  },
});