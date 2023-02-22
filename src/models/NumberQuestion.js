const Question = require("./Question");

/**
 * Class related to the number type for prompts
 */
class NumberQuestion extends Question {
  /**
   * @param {String} name The key of the response
   * @param {String} message The message to display
   * @param {Number} initialValue The default value
   */
  constructor(name, message, initialValue){
    super('number', name, message);
    this.initial = initialValue;
  }
};

module.exports = NumberQuestion;