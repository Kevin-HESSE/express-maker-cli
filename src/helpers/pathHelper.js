const fs = require('fs');
const path = require('path');
const directoryHelper = require('./directoryHelper');
const directoryEnum = require('../enum/directoryEnum');

/**
 * pathHelpers contains all methods which check if some directory exists or not
 * @method getAppDirectory
 * @method getDirectory
 * @method getTemplateDirectory
 */
const pathHelpers = {
  /**
   * Verify if the application directory 'src' or 'app exists.
   * If not return null otherwise return the correct directory.
   * @returns {String | null} Return the application directory or null
   */
  getAppDirectory: function(){
    if(fs.existsSync(`./${directoryEnum.main}`)) {
      return `./${directoryEnum.main}`;
    } else {
      throw new Error('The src directory does not exist !');
    }
  },

  /**
   * Verify if the specified directory exist and return it or return null if not.
   * @param {String} targetDirectory The directory to verify
   * @returns {String || null} The path to the specified directory or null
   */
  getDirectory: function(targetDirectory){
    const appDirectory = pathHelpers.getAppDirectory();
    const directory = `${appDirectory}/${targetDirectory}`;
    
    if(appDirectory && fs.existsSync(directory)) {
      return directory;
    } else {
      throw new Error(`The ${targetDirectory} directory does not exist !`);
    }
  },

  /**
   * Return the path of the template directory for this application
   * @returns {String} Path of the template directory
   */
  getTemplateDirectory: function(){
    return path.resolve(__dirname, `../templates`);
  }
};

module.exports = pathHelpers;
