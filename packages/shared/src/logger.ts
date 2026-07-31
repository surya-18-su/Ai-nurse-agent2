import pino from 'pino';
import { config } from './config.js';

export const logger = pino({
  level: config.LOG_LEVEL,
  redact: ['process.env.OPENAI_API_KEY', 'process.env.ANTHROPIC_API_KEY'], // Hide PII paths
});
