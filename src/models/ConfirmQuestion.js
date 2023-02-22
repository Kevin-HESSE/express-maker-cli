const Question = require("./Question");

/**
 * Class related to the confirm type for `prompts`
 */
class ConfirmQuestion extends Question {
  constructor(name, message){
    super('confirm', name, message);
  }
};

module.exports = ConfirmQuestion;