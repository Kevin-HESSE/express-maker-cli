//Import modules
const config = require('../modules/configGenerate');

//Import Helpers
const fileHelper = require('../helpers/fileHelper');
const directoryHelper = require('../helpers/directoryHelper');
const displayHelper = require('../helpers/displayHelper');

/**
 * Function executed with the command `express-maker init`.
 * 
 * It asks several questions in order to create a basic setup for an Express Server. 
 * 
 * Elements created by default : 
 * - `./<appDirectory>/models/mainController.js`
 * - `./<appDirectory>/routers/main.router.js`
 * - `./index.js`
 */
async function initCommand(){
  const userConfig = await config.generate();
  let npm = `npm i express dotenv`;

  if(userConfig.hasViewEngine){
    await directoryHelper.create('./views');
    await directoryHelper.create('./public');
    await directoryHelper.create('./public/css');
    npm += ` ejs`;
  }

  if(userConfig.isApiRest){
    npm += ` cors`;
  }

  const appDirectory = userConfig.appDirectory;

  await directoryHelper.create(`./${appDirectory}`);
  await directoryHelper.create(`./${appDirectory}/models`);
  await directoryHelper.create(`./${appDirectory}/routers`);
  await directoryHelper.create(`./${appDirectory}/controllers`);

  fileHelper.copyEnv();
  fileHelper.copyGitIgnore();
  fileHelper.createIndex('index', userConfig);
  fileHelper.createRouter({ modelName: 'main.router' });
  fileHelper.createController({ modelName: 'mainController', isApiRest: userConfig.isApiRest });

  displayHelper.advice(`Don't forget to run this command`, npm)
  displayHelper.advice(`Initialize your project for git if not`, `git init`);
}

module.exports = initCommand;