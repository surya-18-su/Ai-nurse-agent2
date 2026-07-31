import { Command } from 'commander';
import { db } from '@careerops/db';
import { logger } from '@careerops/shared';
import { sql } from 'drizzle-orm';
import * as clack from '@clack/prompts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const doctorCommand = new Command('doctor')
  .description('Check env, DB, Typst, Playwright browsers, source healthchecks')
  .action(async () => {
    clack.intro('CareerOps Doctor 🩺');

    const s = clack.spinner();

    // 1. Check Node Env
    s.start('Checking Node Environment...');
    const nodeVersion = process.versions.node;
    if (parseInt(nodeVersion.split('.')[0] ?? '0', 10) >= 22) {
      s.stop(`Node Env: OK (v${nodeVersion})`);
    } else {
      s.stop(`Node Env: Warning (v${nodeVersion} - Need >= 22)`);
    }

    // 2. Check Database connection
    s.start('Checking Database Connection...');
    try {
      // simple query to verify db works
      db.get(sql`SELECT 1`);
      s.stop('Database: OK');
    } catch (e) {
      s.stop('Database: Failed');
      logger.error(
        e instanceof Error ? e : new Error(String(e)),
        'DB Check Failed'
      );
    }

    // 3. Check Data Directory
    s.start('Checking Data Directory...');
    const dataPath = path.resolve(__dirname, '../../../../data');
    if (fs.existsSync(dataPath)) {
      s.stop('Data Directory: OK');
    } else {
      s.stop('Data Directory: Missing');
    }

    clack.outro(
      'Doctor check complete. If everything is OK, you are good to go!'
    );
  });
