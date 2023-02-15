const model = require('../modules/modelGenerate');
const validator = require('../helpers/validate');
const fileHelper = require('../helpers/fileHelper');
const pathHelpers = require('../helpers/pathHelper');
const displayHelper = require('../helpers/displayHelper');

/**
 * Function executed with the command `express-maker model <String>`.
 * 
 * It asks several questions in order to create a model for a project with Sequelize. 
 * 
 */
async function modelCommand(argv) {
    if(validator.string(argv) === true){
        if(pathHelpers.getDirectory('models')){
            const modelGenerated = await model.generate(argv);
            fileHelper.createModel(modelGenerated)
        } else {
            displayHelper.errorDirectory(['./app/models', './src/models']);
        }
    } else {
        displayHelper.errorMessage(`The name of the model is incorrect.`);
    }
}

module.exports = modelCommand;
