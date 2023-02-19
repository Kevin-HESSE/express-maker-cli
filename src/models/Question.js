const displayHelper = require("../helpers/displayHelper");

class Question {
  constructor(type, name, message){
    this.type = type;
    this.name = name;
    this.message = displayHelper.prompt(message);
  }
}

module.exports = Question;