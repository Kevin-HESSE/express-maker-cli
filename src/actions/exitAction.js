const { exit } = require('process');

function exitAction(prompt){
  console.log(`Aborting action !`);
  exit(1);
}

module.exports = exitAction;