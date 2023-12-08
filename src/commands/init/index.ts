//Import modules
import { builder } from './builder';
import { InitOptions } from './interface';

//Import Helpers
import { directoryHelper } from '@/helpers/directoryHelper';
import { folderEnum } from '@/enum/FolderEnum';
import { displayHelper } from '@/helpers/displayHelper';
import { fileHelper } from '@/helpers/fileHelper';

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
export async function initCommand( options: InitOptions ): Promise<void> {
  let userConfig;

  if(options.template) {
    try {
      userConfig = builder.getTemplate(options);
    } catch ( e ) {
      if ( e instanceof Error ) {
        displayHelper.errorMessage(e.message)
      } else {
        console.error('Unknown error occurs on the init command with template option!');
      }
    }
  } else {
    userConfig = await builder.getQuestion();
  }

  if ( userConfig!.hasViewEngine ) {
    directoryHelper.create('./views');
    directoryHelper.create('./public');
    directoryHelper.create('./public/css');
  }

  directoryHelper.create(`./${folderEnum.main}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.model}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.router}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.controller}`);
  directoryHelper.create(`./${folderEnum.main}/${folderEnum.middleware}`);

  fileHelper.copyFile('env', 'env');
  fileHelper.copyFile('env', 'env.example');
  fileHelper.copyFile('gitignore', 'gitignore');
  fileHelper.createIndex(userConfig!);
  fileHelper.createRouter('main.router', userConfig!);
  fileHelper.createController('mainController', userConfig!);

  try {
    const instructions = builder.getInstructions(userConfig!);

    displayHelper.advice(`\nDon't forget to install your main dependencies with this command`, instructions.mandatory);
    displayHelper.advice(`Don't forget to install your dev dependencies with this command`, instructions.dev);
  } catch ( e ) {
    if(e instanceof Error) {
      displayHelper.errorMessage('e.message')
    } else {
      console.error('Unknown error occurs on the init command with instructions!');
    }
  }
}