const Question = require("./Question");

class NumberQuestion extends Question {
  constructor(name, message, initialValue){
    super('number', name, message);
    this.initial = initialValue;
  }
};

module.exports = NumberQuestion;