const kleur = require('kleur');
const _ = require('lodash');

/**
 * A list of method for displaying message in the terminal with the module kleur
 * @method fileCreated
 * @method advice
 * @method warning
 * @method errorDirectory
 * @method errorMessage
 */
const displayHelper = {

  /**
   * Convert a message with kleur.
   * @param {String} message The message to display
   * @returns A formatted message with kleur
   */
  prompt: function(message){
    return kleur.cyan().underline(message)
  },
  /**
   * Display a message to indicate when a fil is created and where.
   * @param {String} type The type of the file
   * @param {String} name The name of the file
   * @param {String} directory The directory of the file
   */
  fileCreated: function(type, name, directory){
    console.log(`${ type } : ${ kleur.green(name) } has been created in ${ kleur.green(directory) }`)
  },

  /**
   * Display a message to indicate which command to run when an action is done
   * @param {String} message The message to print
   * @param {String} command The command to run
   */
  advice: function(message, command){
    console.log(`\n${message} : ${kleur.green().bold(command)}`);
  },

  /**
   * Display a message to alert the user.
   * @param {String} message The message to print 
   */
  warning: function(message){
    console.log(kleur.bold().yellow(message));
  },

  /**
   * Display an error when the following directory(ies) has not been created.
   * @param {String[]} directories An array which contains the directories
   */
  errorDirectory: function(directories){
    const colorDirectories = directories.map((directory) => kleur.yellow(directory));
    const stringDirectories = _.join(colorDirectories, ' / ');
    console.log(`\n${kleur.red().underline('Error')} : Have you create the followed directory ? [ ${ stringDirectories } ]\n`);
  },
  
  /**
   * Display an error message when something goes wrong.
   * @param {String} message The message to display
   */
  errorMessage: function(message){
    console.log(kleur.red(message));
  }
}

module.exports = displayHelper;