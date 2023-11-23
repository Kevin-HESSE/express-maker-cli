import kleur from 'kleur';
import { exit } from 'process';

/**
 * A list of method for displaying message in the terminal with the module kleur
 * @method fileCreated
 * @method advice
 * @method warning
 * @method errorMessage
 */
export const displayHelper = {

  /**
   * Convert a message with kleur.
   * @param {String} message The message to display
   * @returns A formatted message with kleur
   */
  prompt: function ( message: string ) {
    return kleur.cyan().underline( message );
  },
  /**
   * Display a message to indicate when a fil is created and where.
   * @param {String} fileType The type of the file
   * @param {String} fileName The name of the file
   * @param {String} fileDirectory The directory of the file
   */
  fileCreated: function ( fileType: string, fileName: string, fileDirectory: string ) {
    console.log( `${ kleur.underline( fileType ) } : ${ kleur.green( fileName ) } has been created in ${ kleur.green( fileDirectory ) }` );
  },

  /**
   * Display a message to indicate which command to run when an action is done
   * @param {String} message The message to print
   * @param {String} command The command to run
   */
  advice: function ( message: string, command: string ) {
    console.log( `${ message } : ${ kleur.green().bold( command ) }` );
  },

  /**
   * Display a message to alert the user.
   * @param {String} fileType The type of the file
   * @param {String} fileName The name of the file
   */
  warning: function ( fileType: string, fileName: string ) {
    console.log( `${ kleur.underline( fileType ) } : ${ kleur.yellow( fileName ) } already exists` );
  },

  /**
   * Display an error message when something goes wrong.
   * @param {String} message The message to display
   */
  errorMessage: function ( message: string ) {
    console.log( kleur.red( message ) );
    exit(1);
  },
};