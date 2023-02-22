const CommonController = require('./CommonController');

class <%= name %>Controller extends CommonController{
  constructor(model){
    super(model);
  };
};

module.exports = <%= name %>Controller;