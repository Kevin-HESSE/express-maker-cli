const fs = require('fs');
const path = require('path');

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
  getDirectory: function(targetDirectory){
    const appDirectory = pathHelpers.getAppDirectory();

    if(appDirectory && fs.existsSync(`${appDirectory}/${targetDirectory}`)) {
      return `${appDirectory}/${targetDirectory}`;
    } else {
      return null;
    }
  },

  /**
   * Return the path of the template directory for this application
   * @returns {String} Path of the template directory
   */
  getTemplateDirectory: function(){
    return path.resolve(__dirname, `../assets/templates`);
  }
};

module.exports = pathHelpers;
