const fs = require('fs');
const path = require('path');

const modelsDir = fs.readdirSync(__dirname);
const modulesExport = {};

/**
 * For each file inside this directory, exclude index.js and Question.js,
 * stock them inside the modulesExport with a formatted tag.
 * 
 * ex : TextQuestion.js => modulesExport.text = require('./TextQuestion.js');
 */
for (const file of modelsDir) {
  if(file !== 'index.js' && file !== 'Question.js'){ 
    const tag = file.replace('Question.js', '').toLowerCase();
    modulesExport[tag] = require(path.resolve(__dirname, file));
  }
}

module.exports = modulesExport;
