const prompts = require('prompts');
const onCancel = require('../commands/exitCommand');
const app = require('../enum/appEnum');
const Question = require('../models/Question');

const config = {
  generate: async function(){
    const askCustomConfig = [
      new Question('select', 'appDirectory', 'The name of your application directory :', app),
      new Question('toggle', 'hasViewEngine', 'Do you intend to use a view engine ?'),
      new Question('toggle', 'isApiRest', 'Do you intend to use your server as an ApiREST ?')
    ];
    return await prompts(askCustomConfig , { onCancel })
  },
}

module.exports = config;