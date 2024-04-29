import fs from 'fs';
import path from 'path';

import { folderEnum } from '@/enum/FolderEnum';

function getAppDirectory(): string{
  if(fs.existsSync(`./${folderEnum.main}`)) {
    return `./${folderEnum.main}`;
  } else {
    throw new Error('The src directory does not exist !');
  }
}

/**
 * pathHelpers contains all methods which check if some directory exists or not
 * @method getAppDirectory
 * @method getDirectory
 * @method getTemplateDirectory
 */
export const pathHelpers = {
  /**
   * Verify if the application directory 'src_old' or 'app exists.
   * If not return null otherwise return the correct directory.
   * @returns {String | null} Return the application directory or null
   */

  /**
   * Verify if the specified directory exist and return it or return null if not.
   * @param {String} targetDirectory The directory to verify
   * @returns {String} The path to the specified directory or null
   */
  getDirectory: function(targetDirectory: string): string{
    const appDirectory = getAppDirectory();
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
  getTemplateDirectory: function(): string{
    return path.resolve(__dirname, `../templates`);
  }
};
