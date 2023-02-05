const fs = require('fs');
const path = require('path');
const _ = require ('lodash');
const beautify = require('js-beautify');

function generateFile(model){
    /** On récupère le fichier modelTemplate.js */
    const file = path.resolve(__dirname, '../assets/models/modelTemplate.js');
    /** On lit ce dernier et on le rend lisible avec toString() */
    const fileRead = fs.readFileSync(file).toString();

    /** On compile le fichier en remplaçant les balises par les informations transmises dans model. */
    let content = _.template(fileRead)(model);

    /** On définit les options de beautify */
    const option = {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 2,
        brace_style: "collapse",
        end_with_newline: true
    }

    content = beautify(content, option);

    /** On ecrit dans un fichier modelTemplate.js le contenu généré au préalable. */
    fs.writeFileSync('./modelTemplate.js', content);
}

module.exports = generateFile;
