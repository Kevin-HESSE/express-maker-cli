const renderFile = require('../modules/render');
const model = require('../modules/modelGenerate');

async function modelAction(argv) {
    const modelGenerated = await model.generate(argv);
    renderFile(modelGenerated);
}

module.exports = modelAction;
