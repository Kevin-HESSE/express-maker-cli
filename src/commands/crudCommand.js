const crudHelper = require("../helpers/crudHelper");
const displayHelper = require('../helpers/displayHelper');
const crudGenerate = require("../modules/crudGenerate");

function makeController(model){
  crudHelper.checkCommonController();
  crudHelper.createCRUDController(model);
};

function makeRouter(model){
  crudHelper.checkRouterMiddleware();
  crudHelper.createCRUDRouter(model);
}

async function crudCommand(opts){
  const models = crudHelper.getAllModels();

  if(models.length === 0) {
    return displayHelper.errorMessage(`No models found !\nPlease create one model before executing this command.`);
  };

  const listsModels = crudHelper.createList(models);
  const model = await crudGenerate(listsModels);

  if(opts.controller){
    makeController(model);
  } else if (opts.router) {
    makeRouter(model);
  } else {
    makeRouter(model);
    makeController(model);
  }
};

module.exports = crudCommand;