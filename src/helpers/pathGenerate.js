const path = require('path');
const config = require('../assets/config/config.json');

const pathGenerate = {
  models: path.resolve('./', config.applicationDirectory, config.modelDirectory)
};

module.exports = pathGenerate;