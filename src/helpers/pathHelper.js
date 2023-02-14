const fs = require('fs');

const pathHelpers = {
  getModelDirectory: function(){
    if(fs.existsSync('./app/models')){
      return './app/models';
    } else if(fs.existsSync('./src/models')){
        return './src/models';
    } else {
        return null;
    }
  },
  getRouterDirectory: function(){
    if(fs.existsSync('./app/routers')){
      return './app/routers';
    } else if(fs.existsSync('./src/routers')){
        return './src/routers';
    } else {
        return null;
    }
  },
  getControllerDirectory: function(){
    if(fs.existsSync('./app/controllers')){
      return './app/controllers';
    } else if(fs.existsSync('./src/controllers')){
        return './src/controllers';
    } else {
        return null;
    }
  }
};

module.exports = pathHelpers;
