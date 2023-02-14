const fs = require('fs/promises');
const kleur = require('kleur');

const directoryHelper = {
  create: async function(directory) {
      try {
        await fs.mkdir(directory, {mode: 0775});
        console.log(`The directory ${ kleur.green(directory) } has been created.`);
      } catch (error) {
        console.log(`The directory ${ kleur.yellow(directory) } already exists.`);
      }
  }
};

module.exports = directoryHelper;