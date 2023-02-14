const { exit } = require('process');

function exitCommand(prompt){
  console.log(`Aborting action !`);
  exit(1);
}

module.exports = exitCommand;