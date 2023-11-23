import fs from 'fs';

/**
 * A list of method related to directory
 * @method create
 */
export const directoryHelper = {
  /**
   * Verify if the directory exists, if not create it with permission 0755
   * @param {String} directory THe name of the directory
   */
  create: function(directory: string): void {
    if(!fs.existsSync(directory)){
      fs.mkdirSync(directory, {mode: 0o755 });
    }
  },
};
