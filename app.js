#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const initCommand = require('./src/commands/initCommand');
const modelCommand = require('./src/commands/modelCommand');
const connectCommand = require('./src/commands/connectCommand');
const crudCommand = require('./src/commands/crudCommand');

program
    .name('express-maker-cli')
    .description('CLI for making files for an express server')
    .version('0.1.0');

program.command('init')
    .action(initCommand)
    .summary('Initialize an express project')

program.command('sequelize:connect')
    .action(connectCommand)
    .summary(`create a file setting up a connection with sequelize`)

program.command('sequelize:model')
    .argument('<string>', 'Name of a model')
    .action(modelCommand)
    .summary('generate a model for sequelize')
    .description(`Generate a model for the library Sequelize. His content is based on the answer you give.`)

program.command('sequelize:crud')
    .action(crudCommand)
    .summary('generate a controller and a router for sequelize')
    .description(`Generate a CRUD controller and a CRUD router for sequelize. Be wary, the default response is in json. \nIf you need to change this behaviour, please refer to the documentation.`);
program.parse();
