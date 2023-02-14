#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const initCommand = require('./src/commands/initCommand');
const modelCommand = require('./src/commands/modelCommand');

program
    .name('express-maker-cli')
    .description('CLI for making files for an express server')
    .version('0.1.0');

program.command('init')
    .action(initCommand)
    .summary('Initialize an express project')

program.command('model')
    .argument('<string>', 'Name of a model')
    .action(modelCommand)
    .summary('generate a model')
    .description('Generate a model based on the answer you give.')

program.parse();
