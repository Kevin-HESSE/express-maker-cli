const fs = require('fs');
const path = require('path');

const modelsDir = fs.readdirSync(__dirname);
const modulesExport = {};

for (const file of modelsDir) {
  if(file !== 'index.js' && file !== 'Question.js'){ 
    const name = file.replace('Question.js', '').toLowerCase();
    modulesExport[name] = require(path.resolve(__dirname, file));
  }
}

module.exports = modulesExport;
