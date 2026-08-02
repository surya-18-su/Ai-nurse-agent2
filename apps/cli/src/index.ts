#!/usr/bin/env node

import { Command } from 'commander';
import { doctorCommand } from './commands/doctor.js';
import { evaluateCommand } from './commands/evaluate.js';

const program = new Command();

program
  .name('careerops')
  .description('Autonomous multi-agent job search & application platform')
  .version('1.0.0');

program.addCommand(doctorCommand);
program.addCommand(evaluateCommand);

program.parse(process.argv);
