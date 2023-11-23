//Import modules
// import config from '../modules/configGenerate';

//Import Helpers
// import fileHelper from '../helpers/fileHelper';
// import directoryHelper from '../helpers/directoryHelper';
// import displayHelper from '../helpers/displayHelper';
// import directoryEnum from '../enum/directoryEnum';

import { configGenerate } from '../modules/configGenerate';
import { UserAnswers } from '../interface/UserConfiguration';
import { directoryHelper } from '../helpers/directoryHelper';
import { folderEnum } from '../enum/FolderEnum';
import { displayHelper } from '../helpers/displayHelper';
import { fileHelper } from '../helpers/fileHelper';

/**
 * Function executed with the command `express-maker init`.
 *
 * It asks several questions in order to create a basic setup for an Express Server.
 *
 * Elements created by default :
 * - `./src_old/models/mainController.js`
 * - `./src_old/routers/main.router.js`
 * - `./server.js`
 */
export async function initCommand() : Promise<void> {
  const userConfig: UserAnswers = await configGenerate();

  const dependencies: string[] = ['express', 'dotenv']
  const devDependencies: string[] = ['nodemon']

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

  directoryHelper.create(`./${folderEnum.main}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.model}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.router}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.controller}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.middleware}`);

  fileHelper.copyFile('env', 'env');
  fileHelper.copyFile('env', 'env.example');
  fileHelper.copyFile('gitignore', 'gitignore');
  fileHelper.createIndex('index', userConfig);
  fileHelper.createRouter('main.router', userConfig);
  fileHelper.createController('mainController', userConfig);

  const dependenciesInstruction = `npm install ${dependencies.join(' ')}`;
  const devDependenciesInstruction = `npm install --save-dev ${devDependencies.join(' ')}`;
  //
  displayHelper.advice(`\nDon't forget to install your main dependencies with this command`, dependenciesInstruction);
  displayHelper.advice(`Don't forget to install your dev dependencies with this command`, devDependenciesInstruction);
}