const Question = require("./Question");

class ToggleQuestion extends Question {
  constructor(name, message, initialValue){
    super('toggle', name, message);
    this.initial = initialValue;
    this.active = 'yes';
    this.inactive = 'no';
  }
};

module.exports = ToggleQuestion;