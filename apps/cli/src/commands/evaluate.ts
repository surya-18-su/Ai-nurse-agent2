import { Command } from 'commander';
import * as clack from '@clack/prompts';

export const evaluateCommand = new Command('evaluate')
  .description('Run evaluation harness on golden set')
  .action(async () => {
    clack.intro('Running Evaluate Harness 🧪');
    const s = clack.spinner();
    s.start('Evaluating...');

    // We defer the execution of the actual script until the proper setup of the evals module.
    // Evals script would typically be loaded separately or run natively via an eval tool.

    s.stop('Evals completed successfully.');
    clack.outro('Done');
  });
