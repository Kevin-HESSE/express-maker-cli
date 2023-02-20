const displayHelper = require("../helpers/displayHelper");

/**
 * Class related to a question for prompts, only used to be extended.
 */
class Question {
  /**
   * @param {String} type The type of the question
   * @param {String} name The key of the response
   * @param {String} message The message to display
   */
  constructor(type, name, message){
    this.type = type;
    this.name = name;
    this.message = displayHelper.prompt(message);
  }
}

module.exports = Question;