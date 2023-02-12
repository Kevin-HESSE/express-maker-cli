const types = require("../enum/typesEnum");

const validator = {
  string: function (val){
    const expression = new RegExp(/^[a-zA-Z]+$/g);
  
    if(!val.match(expression)){
        return `Warning : the string format is wrong`;
    } else {
        return true;
    }
  },
  choice: function(val){
    console.log(val);
    if(!types.includes(val)){
      
      return `Warning : the selected type doesn't exist !`;
    } else {
      return true;
    }
  }
}

module.exports = validator;
