const crudHelper = require("../helpers/crudHelper");
const displayHelper = require('../helpers/displayHelper');
const crudGenerate = require("../modules/crudGenerate");

async function crudCommand(){
  const models = crudHelper.getAllModels();

  if(models.length === 0) {
    return displayHelper.errorMessage(`No models found !\nPlease create one model before executing this command.`);
  };

  const listsModels = crudHelper.createList(models);
  const model = await crudGenerate(listsModels);

  crudHelper.checkFilesImportant();
  crudHelper.createCRUD(model);
};

module.exports = crudCommand;