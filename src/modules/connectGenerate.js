const promptTerminal = require("../helpers/promptsHelper");
const Question = require("../models");
const database = require('../enum/databaseEnum');

async function connectGenerate(){
  const dbQuestion = new Question.select('db', 'Choose which database do you want to use : ', database);

  return dbUser = await promptTerminal(dbQuestion);
}

module.exports = connectGenerate;