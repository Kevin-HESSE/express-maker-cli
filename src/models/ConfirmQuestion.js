const Question = require("./Question");

class ConfirmQuestion extends Question {
  constructor(name, message){
    super('confirm', name, message);
  }
};

module.exports = ConfirmQuestion;