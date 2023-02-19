const validator = require("../helpers/validate");
const Question = require("./Question");

class TextQuestion extends Question {
  constructor(name, message){
    super('text', name, message);
    this.validate = validator.string;
  }
};

module.exports = TextQuestion;