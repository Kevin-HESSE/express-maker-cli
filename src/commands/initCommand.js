//Import modules
const config = require('../modules/configGenerate');

//Import Helpers
const fileHelper = require('../helpers/fileHelper');
const directoryHelper = require('../helpers/directoryHelper');
const displayHelper = require('../helpers/displayHelper');

/**
 * @typedef {Object} userConfig
 * @property {String} appDirectory
 * @property {String} viewEngine
 * @property {Boolean} isApiRest
 * @property {Number} port
 *
 * Function executed with the command `express-maker init`.
 * 
 * It asks several questions in order to create a basic setup for an Express Server. 
 * 
 * Elements created by default : 
 * - `./<appDirectory>/models/mainController.js`
 * - `./<appDirectory>/routers/main.router.js`
 * - `./server.js`
 */
async function initCommand(){
  const userConfig = await config.generate();
  let npm = `npm i express dotenv`;

  if(userConfig.viewEngine !== 'none'){
    directoryHelper.create('./views');
    directoryHelper.create('./public');
    directoryHelper.create('./public/css');
    npm += ` ${userConfig.viewEngine}`;
  }

  if(userConfig.isApiRest){
    npm += ` cors`;
  }
  console.time('All Creation');
  console.time('Creation');
  /**
   * @type {String}
   */
  const appDirectory = userConfig.appDirectory;

  directoryHelper.create(`./${appDirectory}`);
  directoryHelper.create(`./${appDirectory}/models`);
  directoryHelper.create(`./${appDirectory}/routers`);
  directoryHelper.create(`./${appDirectory}/controllers`);
  directoryHelper.create(`./${appDirectory}/middlewares`);
  directoryHelper.create(`./${appDirectory}/services`);

  console.timeEnd('Creation');

  fileHelper.copyEnv();
  fileHelper.copyGitIgnore();
  fileHelper.createServer(userConfig, appDirectory);
  fileHelper.createRouter({ modelName: 'main.router' });
  fileHelper.createController({ modelName: 'mainController', isApiRest: userConfig.isApiRest });

  displayHelper.advice(`Don't forget to run this command`, npm)
  displayHelper.advice(`Initialize your project for git if not`, `git init`);

  console.timeEnd('All Creation');
}

module.exports = initCommand;