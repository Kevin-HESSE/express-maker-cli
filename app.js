#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const initCommand = require('./src/commands/initCommand');

program
    .name('express-maker-cli')
    .description('CLI for making files for an express server')
    .version('0.5.0')

program.command('init')
    .action(initCommand)
    .summary('Initialize an express project')

program.parse();
