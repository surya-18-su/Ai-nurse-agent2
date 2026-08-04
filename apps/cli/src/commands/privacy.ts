import { Command } from 'commander';
import * as clack from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';

export const privacyCommand = new Command('privacy')
  .description('manage and audit privacy rules and data access')
  .command('audit')
  .description('audit outbound network calls for privacy compliance')
  .action(async () => {
    clack.intro('Running Privacy Network Audit');

    const logPath = path.join(process.cwd(), 'data', '.audit', 'network.jsonl');

    try {
      const data = await fs.readFile(logPath, 'utf8');
      const lines = data.split('\n').filter((l) => l.trim().length > 0);

      const hostCounts = new Map<string, number>();

      for (const line of lines) {
        try {
          const entry = JSON.parse(line);
          if (entry.host) {
            hostCounts.set(entry.host, (hostCounts.get(entry.host) || 0) + 1);
          }
        } catch {
          // ignore parse errors
        }
      }

      if (hostCounts.size === 0) {
        clack.log.success('No outbound network calls found in audit log.');
      } else {
        clack.log.info('Outbound network calls by host:');
        for (const [host, count] of hostCounts.entries()) {
          clack.log.message(`- ${host}: ${count} calls`);
        }
        clack.log.warn('Please review the hosts above to ensure no PII leaks.');
      }

      clack.outro('Audit complete.');
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err as NodeJS.ErrnoException).code === 'ENOENT'
      ) {
        clack.log.success(
          'No network audit log exists (no external calls made).'
        );
        clack.outro('Audit complete.');
      } else {
        clack.log.error(
          `Failed to read audit log: ${err instanceof Error ? err.message : String(err)}`
        );
        process.exit(1);
      }
    }
  });
