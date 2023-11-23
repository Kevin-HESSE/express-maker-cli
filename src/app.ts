#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/initCommand';

const program = new Command();

program
  .name('express-maker-cli')
  .description('CLI which generate files for an express server')
  .version('1.0.0');

program
  .command('init')
  .action(initCommand)

program.parse();