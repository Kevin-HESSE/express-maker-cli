#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const modelAction = require('./src/actions/modelAction');

program
    .name('express-maker-cli')
    .description('CLI for making files for an express server')
    .version('0.1.0');


program.command('model')
    .argument('<string>', 'Name of a model')
    .action(modelAction)

program.parse();
