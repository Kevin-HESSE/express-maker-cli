const kleur = require( 'kleur' );
const _ = require( 'lodash' );
const { exit } = require('process');

/**
 * A list of method for displaying message in the terminal with the module kleur
 * @method fileCreated
 * @method advice
 * @method warning
 * @method errorMessage
 */
const displayHelper = {

  /**
   * Convert a message with kleur.
   * @param {String} message The message to display
   * @returns A formatted message with kleur
   */
  prompt: function ( message ) {
    return kleur.cyan().underline( message );
  },
  /**
   * Display a message to indicate when a fil is created and where.
   * @param {String} fileType The type of the file
   * @param {String} fileName The name of the file
   * @param {String} fileDirectory The directory of the file
   */
  fileCreated: function ( fileType, fileName, fileDirectory ) {
    console.log( `${ kleur.underline( fileType ) } : ${ kleur.green( fileName ) } has been created in ${ kleur.green( fileDirectory ) }` );
  },

  /**
   * Display a message to indicate which command to run when an action is done
   * @param {String} message The message to print
   * @param {String} command The command to run
   */
  advice: function ( message, command ) {
    console.log( `${ message } : ${ kleur.green().bold( command ) }` );
  },

  /**
   * Display a message to alert the user.
   * @param {String} fileType The type of the file
   * @param {String} fileName The name of the file
   */
  warning: function ( fileType, fileName ) {
    console.log( `${ kleur.underline( fileType ) } : ${ kleur.yellow( fileName ) } already exists` );
  },

  /**
   * Display an error message when something goes wrong.
   * @param {String} message The message to display
   */
  errorMessage: function ( message ) {
    console.log( kleur.red( message ) );
    exit(1);
  },
};

module.exports = displayHelper;