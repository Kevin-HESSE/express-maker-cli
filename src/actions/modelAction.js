const renderFile = require('../modules/render');
const model = require('../modules/modelGenerate');
const validator = require('../helpers/validate');
const kleur = require('kleur');

async function modelAction(argv) {
    if(validator.string(argv) === true){
        const modelGenerated = await model.generate(argv);
        renderFile(modelGenerated);
    } else {
        console.log(kleur.red(`The name of the model is incorrect.`))
    }
}

module.exports = modelAction;
