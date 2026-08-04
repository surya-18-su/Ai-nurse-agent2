#!/usr/bin/env node

import { Command } from 'commander';
import { doctorCommand } from './commands/doctor.js';
import { evaluateCommand } from './commands/evaluate.js';
import { tailorCommand } from './commands/tailor.js';
import { applyCommand } from './commands/apply.js';
import { outreachCommand } from './commands/outreach.js';
import { privacyCommand } from './commands/privacy.js';

const program = new Command();

program
  .name('careerops')
  .description('Autonomous multi-agent job search & application platform')
  .version('1.0.0');

program.addCommand(doctorCommand);
program.addCommand(evaluateCommand);
program.addCommand(tailorCommand);
program.addCommand(applyCommand);
program.addCommand(outreachCommand);
program.addCommand(privacyCommand);

program.parse(process.argv);
