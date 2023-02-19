const messageHelper = require('../helpers/messageHelper');

class RouterMiddleware {
  constructor(model){
    this.model = model;
    this.name = model.name.toLowerCase();
  }

  getParam = async (request, response, next, modelId) => {
    const id = Number(modelId);
    
    if(id){
      const result = await this.model.findByPk(id);

      if(result) {
        request[this.name] = result;
        next();
      } else {
        next('route');
      }
    } else {
      messageHelper.requestError(response);
    } 
  }
}

module.exports = RouterMiddleware;