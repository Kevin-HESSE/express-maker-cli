const prompts = require('prompts');
const onCancel = require('../commands/exitCommand');

/**
 * Prompt the question into the user's terminal
 * @param {Question || Question[]} question 
 * @returns {Object} Answer(s) of the question.
 */
async function promptTerminal(question){
  return await prompts(question, { onCancel });
}

module.exports = promptTerminal;