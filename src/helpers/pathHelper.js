const fs = require('fs');
const path = require('path');
const directoryHelper = require('./directoryHelper');

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
    if(fs.existsSync('./app')){
      return './app';
    } else if(fs.existsSync('./src')) {
      return './src';
    } else {
      return null;
    }
  },

  /**
   * Verify if the specified directory exist and return it or return null if not.
   * @param {String} targetDirectory The directory to verify
   * @returns {String || null} The path to the specified directory or null
   */
  getDirectory: function(targetDirectory, create=false){
    const appDirectory = pathHelpers.getAppDirectory();
    const directory = `${appDirectory}/${targetDirectory}`;
    
    if(appDirectory && fs.existsSync(directory)) {
      return directory;
    } else if(create){
      directoryHelper.create(directory);
      return directory;
    } else {
      return null;
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
