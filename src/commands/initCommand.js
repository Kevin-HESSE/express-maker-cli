//Import modules
const config = require('../modules/configGenerate');

//Import Helpers
const fileHelper = require('../helpers/fileHelper');
const directoryHelper = require('../helpers/directoryHelper');
const displayHelper = require('../helpers/displayHelper');
const directoryEnum = require('../enum/directoryEnum');

/**
 * @typedef ConfigurationProperty
 * @type {object}
 * @property {boolean} hasViewEngine - Set the functionality to allow Express using template engine.
 * @property {boolean} isApiRest - Set the functionality to allow Express acting as an API Rest
 * @property {boolean} useTypescript - Enable, change all default js file to ts file.
 * @property {number} port - Define the default port used by the application
 */

/**
 * Function executed with the command `express-maker init`.
 *
 * It asks several questions in order to create a basic setup for an Express Server.
 *
 * Elements created by default :
 * - `./src/models/mainController.js`
 * - `./src/routers/main.router.js`
 * - `./server.js`
 */
async function initCommand() {
  /**
   * Represent all answers of the users as an object.
   * Use below to configure and setting up the project for Express
   * @type {ConfigurationProperty}
   */
  const userConfig = await config.generate();
  const dependencies = [ 'express', 'dotenv' ];
  const devDependencies = [ 'nodemon' ];

  if ( userConfig.useTypescript ) {
    devDependencies.push('@types/node', '@types/express', 'ts-node', 'typescript');
  }

  if ( userConfig.hasViewEngine ) {
    directoryHelper.create('./views');
    directoryHelper.create('./public');
    directoryHelper.create('./public/css');
    dependencies.push('ejs');
  }

  if ( userConfig.isApiRest ) {
    dependencies.push('cors');
  }

  if ( userConfig.useTypescript && userConfig.isApiRest ) {
    devDependencies.push('@types/cors');
  }

  directoryHelper.create(`./${ directoryEnum.main }`);
  directoryHelper.create(`./${ directoryEnum.main }/${directoryEnum.model}`);
  directoryHelper.create(`./${ directoryEnum.main }/${directoryEnum.router}`);
  directoryHelper.create(`./${ directoryEnum.main }/${directoryEnum.controller}`);
  directoryHelper.create(`./${ directoryEnum.main }/${directoryEnum.middleware}`);

  fileHelper.copyFile('env', 'env');
  fileHelper.copyFile('env', 'env.example');
  fileHelper.copyFile('gitignore', 'gitignore');
  fileHelper.createIndex('index', userConfig);
  fileHelper.createRouter('main.router', userConfig);
  fileHelper.createController('mainController', userConfig);

  const dependenciesInstruction = `npm install ${ dependencies.join(' ') }`;
  const devDependenciesInstruction = `npm install --save-dev ${ devDependencies.join(' ') }`;

  displayHelper.advice(`\nDon't forget to install your main dependencies with this command`, dependenciesInstruction);
  displayHelper.advice(`Don't forget to install your dev dependencies with this command`, devDependenciesInstruction);
}

module.exports = initCommand;