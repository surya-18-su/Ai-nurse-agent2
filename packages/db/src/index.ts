import Database, { Database as DatabaseType } from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local DB path
const dbPath =
  process.env.DB_PATH || path.resolve(__dirname, '../../../data/careerops.db');

export const sqlite: DatabaseType = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export * from './schema.js';
export * from './repositories/index.js';
