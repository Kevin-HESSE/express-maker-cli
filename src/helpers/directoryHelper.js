const fs = require('fs');

/**
 * A list of method related to directory
 * @method create
 */
const directoryHelper = {
  /**
   * Verify if the directory exists, if not create it with permission 0755
   * @param {String} directory THe name of the directory
   */
  create: async function(directory) {
    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory, {mode: 0755});
    }
  }
};

module.exports = directoryHelper;