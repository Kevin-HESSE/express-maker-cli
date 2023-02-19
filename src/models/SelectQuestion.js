const Question = require("./Question");

class SelectQuestion extends Question {
  constructor(name, message, choices){
    super('select', name, message);
    this.choices = choices
  };
};

module.exports = SelectQuestion;