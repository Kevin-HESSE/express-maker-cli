const validator = {
  /**
   * This function compare a string in parameter and verify if it is correct.
   * @param {String} val The value to compare
   * @returns Boolean | String
   */
  string: function (val){
    const expression = new RegExp(/^[a-zA-Z]+$/g);
  
    if(!val.match(expression)){
        return `Warning : the string format is wrong`;
    } else {
        return true;
    }
  }
}

module.exports = validator;
