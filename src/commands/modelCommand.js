const model = require('../modules/modelGenerate');
const validator = require('../helpers/validate');
const kleur = require('kleur');
const fileHelper = require('../helpers/fileRender');
const pathHelpers = require('../helpers/pathHelper');

async function modelCommand(argv) {
    if(validator.string(argv) === true){
        if(pathHelpers.getModelDirectory()){
            const modelGenerated = await model.generate(argv);
            fileHelper.createModel(modelGenerated)
        } else {
            console.error(`
An error has occured :
    ${kleur.red().underline(`Error : Have you create the followed directory ? [ ${ kleur.yellow('./app/models') } or ${ kleur.yellow('./src/models') } ]`)})
            `)
        }
    } else {
        console.log(kleur.red(`The name of the model is incorrect.`))
    }
}

module.exports = modelCommand;
