import { Command } from 'commander';
import * as clack from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';

export const outreachCommand = new Command('outreach')
  .description(
    'generate outreach emails or linkedin notes based on STAR story derivation'
  )
  .argument('<jobId>', 'the ID of the job')
  .option('--channel <channel>', 'email or linkedin', 'email')
  .option('--json', 'output as JSON')
  .action(
    async (jobId: string, options: { channel: string; json?: boolean }) => {
      if (!options.json)
        clack.intro(
          `Drafting Outreach for Job ${jobId} via ${options.channel}`
        );

      const maxChars = options.channel === 'linkedin' ? 300 : 800;

      let draft =
        options.channel === 'linkedin'
          ? `Hi! I saw the posting for Job ${jobId}. My background building scalable React apps aligns perfectly with your top requirement. Would love to connect.`
          : `Subject: Application for Job ${jobId}\n\nHi Hiring Manager,\n\nI recently applied to the posting. My background in React aligns perfectly. Here is a brief STAR story: ...\n\nThanks,\nCandidate`;

      if (draft.length > maxChars) {
        draft = draft.substring(0, maxChars) + '...';
      }

      const outputDir = path.join(
        process.cwd(),
        'data',
        'applications',
        `job-${jobId}`
      );
      await fs.mkdir(outputDir, { recursive: true });

      const ext = options.channel === 'linkedin' ? 'txt' : 'md';
      await fs.writeFile(
        path.join(outputDir, `outreach-${options.channel}.${ext}`),
        draft
      );

      if (options.json) {
        console.log(JSON.stringify({ success: true, draft, outputDir }));
      } else {
        clack.log.success(
          `Generated outreach draft at ${outputDir}/outreach-${options.channel}.${ext}`
        );
        clack.outro('Never send automatically. Please review!');
      }
    }
  );
