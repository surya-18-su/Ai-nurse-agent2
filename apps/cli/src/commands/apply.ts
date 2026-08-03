import { Command } from 'commander';
import * as clack from '@clack/prompts';
import fs from 'node:fs/promises';
import path from 'node:path';

export const applyCommand = new Command('apply')
  .description(
    'generate form answers for a specific job ID and optionally auto-fill (stopping before submit)'
  )
  .argument('<jobId>', 'the ID of the job to apply to')
  .option('--fill', 'open playwright and fill the form')
  .option('--i-have-reviewed-this', 'required to actually click submit')
  .option('--json', 'output as JSON')
  .action(
    async (
      jobId: string,
      options: { fill?: boolean; iHaveReviewedThis?: boolean; json?: boolean }
    ) => {
      if (!options.json) clack.intro(`Drafting Application for Job ${jobId}`);

      // Mock question extraction & answering based on STAR format derivation
      const answers = [
        {
          question: 'Why do you want to work here?',
          answer:
            'Derived STAR story: Situation: Needed a new job. Task: Found this one. Action: Used CareerOps. Result: Success.',
        },
        { question: 'Salary expectations', answer: '$120,000' },
      ];

      const outputDir = path.join(
        process.cwd(),
        'data',
        'applications',
        `job-${jobId}`
      );
      await fs.mkdir(outputDir, { recursive: true });

      const markdownContent = answers
        .map((a) => `### ${a.question}\n\n${a.answer}\n`)
        .join('\n');
      await fs.writeFile(path.join(outputDir, 'answers.md'), markdownContent);

      if (options.fill) {
        if (!options.json)
          clack.log.info(
            'Opening Playwright to auto-fill form (dry-run/stub)...'
          );
        if (options.iHaveReviewedThis) {
          if (!options.json)
            clack.log.warn(
              'Submit flag provided, but auto-submit logic is structurally prevented by spec. Stopping at review screen.'
            );
        } else {
          if (!options.json)
            clack.log.info(
              'Stopping at review screen. Please review before manual submission.'
            );
        }
      }

      if (options.json) {
        console.log(JSON.stringify({ success: true, answers, outputDir }));
      } else {
        clack.log.success(`Generated answers.md at ${outputDir}`);
        clack.outro('Ready for review!');
      }
    }
  );
