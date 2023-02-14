const config = require('../modules/configGenerate');
const fileHelper = require('../helpers/fileRender');
const directoryHelper = require('../helpers/directoryHelper');
const kleur = require('kleur');

async function initCommand(){
  const userConfig = await config.generate();
  let npm = `npm i express`;


  if(userConfig.hasViewEngine){
    await directoryHelper.create('./views');
    await directoryHelper.create('./public');
    await directoryHelper.create('./public/css');
    npm += ` ejs`;
  }

  const appDirectory = userConfig.appDirectory;

  await directoryHelper.create(`./${appDirectory}`);
  await directoryHelper.create(`./${appDirectory}/models`);
  await directoryHelper.create(`./${appDirectory}/routers`);
  fileHelper.createRouter({ modelName: 'main.router' });
  await directoryHelper.create(`./${appDirectory}/controllers`);
  fileHelper.createController({ modelName: 'mainController', isApiRest: userConfig.isApiRest });

  fileHelper.createIndex('index', userConfig);

  console.log(`\nDon't forget to run this command : ${kleur.green().bold(npm)}`);
}

module.exports = initCommand;