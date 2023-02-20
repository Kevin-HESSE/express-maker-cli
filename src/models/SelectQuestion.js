const Question = require("./Question");

class SelectQuestion extends Question {
  /**
   * 
   * @param {String} name The key of the response
   * @param {String} message The message to display
   * @param {Array{}} choices All choices needed
   */
  constructor(name, message, choices){
    super('select', name, message);
    this.choices = choices
  };
};

module.exports = SelectQuestion;