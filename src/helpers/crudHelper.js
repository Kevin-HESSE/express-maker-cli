const fs= require('fs');
const path = require('path');
const directoryHelper = require('./directoryHelper');
const displayHelper = require('./displayHelper');
const fileHelper = require('./fileHelper');
const pathHelper = require('./pathHelper');

const crudHelper = {
  appDirectory: pathHelper.getAppDirectory(),
  templateDirectory: pathHelper.getTemplateDirectory(),
  getAllModels: function(){
    const files = directoryHelper.read(`${this.appDirectory}/models`).map((file) => file.replace('.js', ''));
    return files;
  },
  createList: function(tags){
    const lists = tags.map((tag) =>{ return { title: tag, value: tag } });
    return lists;
  },
  checkFilesImportant: function(){
    if(!fs.existsSync(`${this.appDirectory}/controllers/CommonController.js`)){
      this.copyFile('controller', 'CommonController', 'controllers', 'CommonController');
    }
 
    if(!fs.existsSync(`${this.appDirectory}/middlewares/ParamRouterMiddleware.js`)){
      this.copyFile('middlewares', 'RouterMiddleware', 'middlewares', 'ParamRouterMiddleware');
    }
  },
  copyFile: function(srcDir, srcFile, userDir, userFile){
    const templateDirectory = pathHelper.getTemplateDirectory();
    const template = path.resolve(templateDirectory, `${srcDir}/${srcFile}.js`);

    fs.copyFileSync(template, `${this.appDirectory}/${userDir}/${userFile}.js`);

    displayHelper.fileCreated(srcDir.toUpperCase(), userFile, `${this.appDirectory}/${userDir}/`)
  },
  createCRUD: function(model){
    console.log(model);
    const routerContent = fileHelper.content('router/crud.router', model);
    const controllerContent = fileHelper.content('controller/ClassController', model);

    fs.writeFileSync(`${this.appDirectory}/routers/${model.name.toLowerCase()}.router.js`, routerContent);
    fs.writeFileSync(`${this.appDirectory}/controllers/${model.name}Controller.js`, controllerContent);

    displayHelper.fileCreated('Router', `${model.name.toLowerCase()}.router.js`, `${this.appDirectory}/routers`);
    displayHelper.fileCreated('Controller', `${model.name}Controller.js`, `${this.appDirectory}/controllers`);
  }
};

module.exports = crudHelper;