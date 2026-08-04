import { z } from 'zod';

export const EnvironmentSchema = z.enum(['development', 'test', 'production']);
export type Environment = z.infer<typeof EnvironmentSchema>;

export const PortSchema = z.number().int().min(1).max(65535);
