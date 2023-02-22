const Question = require("./Question");

class ToggleQuestion extends Question {
  /**
   * @param {String} name The key of the response
   * @param {String} message The message to display
   * @param {Boolean} initialValue The default value
   */
  constructor(name, message, initialValue){
    super('toggle', name, message);
    this.initial = initialValue;
    this.active = 'yes';
    this.inactive = 'no';
  }
};

module.exports = ToggleQuestion;