const promptTerminal = require("../helpers/promptsHelper");
const { select } = require('../models');


async function crudGenerate(listsModels){
  const modelQuestion = new select('name', 'Choose a model :', listsModels);
  const model = await promptTerminal(modelQuestion);
  return model;
};

module.exports = crudGenerate;