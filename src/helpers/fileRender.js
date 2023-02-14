const fs = require('fs');
const path = require('path');
const _ = require ('lodash');
const beautify = require('js-beautify');
const kleur = require('kleur');
const pathHelpers = require('./pathHelper');

const fileHelper = {
    content: function (template, model){
        const file = path.resolve(__dirname, `../assets/templates/${template}.js`);
        
        const fileRead = fs.readFileSync(file).toString();

        let content = _.template(fileRead)(model);

        const option = {
            indent_size: 2,
            preserve_newlines: true,
            max_preserve_newlines: 2,
            brace_style: "collapse",
            end_with_newline: true
        }

        return beautify(content, option);
    },

    createIndex: function (template, model){
        const content = fileHelper.content(template, model);
        fs.writeFileSync('./index.js', content);
        console.log(`The main ${ kleur.green('index.js') } file has been created at the root of the project with some setup. Modify it as you please !`);
    },

    createModel: function(model){
        const content = fileHelper.content('modelTemplate', model);
        const modelDirectory = pathHelpers.getModelDirectory();

        try {
            fs.writeFileSync(`${ modelDirectory }/${model.modelName}.js`, content);
            console.log(`Model ${kleur.green(model.modelName)} has been created in ${ kleur.green(modelDirectory) }`)
        } catch (error) {
            console.log(`${kleur.red().underline('Error')} : Have you create the followed directory ? [ ${ kleur.yellow('./app/models') } or ${ kleur.yellow('./src/models') } ]`);
        }
    },

    createRouter: function(model){
        const content = fileHelper.content('router/template.router', model);
        const routerDirectory = pathHelpers.getRouterDirectory();

        fs.writeFileSync(`${ routerDirectory }/${model.modelName}.js`, content);
        console.log(`Router ${kleur.green(model.modelName)} has been created in ${ kleur.green(routerDirectory) }`)
    },
    
    createController: function(model){
        const content = fileHelper.content('controller/templateController', model);
        const controllerDirectory = pathHelpers.getControllerDirectory();

        fs.writeFileSync(`${ controllerDirectory }/${model.modelName}.js`, content);
        console.log(`Controller ${kleur.green(model.modelName)} has been created in ${ kleur.green(controllerDirectory) }`)
    }
}
module.exports = fileHelper;
