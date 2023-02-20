const validator = require("../helpers/validate");
const Question = require("./Question");

class TextQuestion extends Question {
  /**
   * @param {String} name The key of the response
   * @param {String} message The message to display
   */
  constructor(name, message){
    super('text', name, message);
    this.validate = validator.string;
  }
};

module.exports = TextQuestion;