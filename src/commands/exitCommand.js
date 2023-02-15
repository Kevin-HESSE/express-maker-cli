const { exit } = require('process');

/**
 * Abort the programm when the command `ctrl + c` as been invoked.
 * @param {*} prompt 
 */
function exitCommand(prompt){
  console.log(`Aborting action !`);
  exit(1);
}

module.exports = exitCommand;