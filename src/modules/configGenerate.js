const app = require('../enum/appEnum');
const engine = require('../enum/engineEnum');
const promptTerminal = require('../helpers/promptsHelper');
const Question = require('../models');

const config = {
  generate: async function(){
    const askCustomConfig = [
      new Question.select('appDirectory', 'The name of your application directory :', app),
      new Question.select('viewEngine', 'Do you intend to use a view engine ?', engine),
      new Question.toggle('isApiRest', 'Do you intend to use your server as an ApiREST ?'),
      new Question.number('port', 'What port do you want to use ?', 3000)
    ];
    return await promptTerminal(askCustomConfig);
  },
}

module.exports = config;