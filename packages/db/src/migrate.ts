import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, sqlite } from './index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('Running migrations...');
  try {
    const migrationsFolder = path.resolve(__dirname, '../drizzle');
    migrate(db, { migrationsFolder });
    console.log('Migrations complete.');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

main();
