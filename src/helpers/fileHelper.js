const fs = require('fs');
const path = require('path');
const _ = require ('lodash');

const pathHelpers = require('./pathHelper');
const formatContent = require('./beautifyHelper');
const displayHelper = require('./displayHelper');
const filesEnum = require('../enum/fileEnum');

/**
 * A list of method related to manipulate files
 * @method content create the content for a new file
 * @method createIndex
 * @method createModel
 * @method createRouter
 * @method createController
 * @method copyEnv
 * @method copyGitIgnore
 */
const fileHelper = {
    /**
     * Generate and compile the content of a file with some variables.
     * @param {String} template The name of the template to copy
     * @param {Object} model Information needed to create the file
     * @returns {String}
     */
    content: function (template, model){
        const templateDirectory = pathHelpers.getTemplateDirectory()
        const file = path.resolve(templateDirectory, `${template}.js`);
        
        const fileRead = fs.readFileSync(file).toString();

        let content = _.template(fileRead)(model);

        return formatContent(content);
    },

    /**
     * Create an `index.js` file with basic setup
     * @param {String} template The name of the template to copy
     * @param {Object} model Information needed to create the file
     */
    createIndex: function (template, model){
        const content = fileHelper.content(template, model);
        fs.writeFileSync('./index.js', content);
        displayHelper.fileCreated(filesEnum.index, 'index.js', 'the root of the project');
    },

    /**
     * Create a model with some parameters inside the models directory of the application.
     * @param {Object} model Information needed to create the file
     */
    createModel: function(model){
        const content = fileHelper.content('sequelize/modelTemplate', model);
        const modelDirectory = pathHelpers.getDirectory('models');

        if(modelDirectory){
            fs.writeFileSync(`${ modelDirectory }/${model.modelName}.js`, content);
            displayHelper.fileCreated(filesEnum.model, model.modelName, modelDirectory);
        } else {
            displayHelper.errorDirectory(['./app/models', './src/models']);
        }
    },

    /**
     * Create a router with some parameters inside the routers directory of the application.
     * @param {Object} model Information needed to create the file
     */
    createRouter: function(model){
        const content = fileHelper.content('router/template.router', model);
        const routerDirectory = pathHelpers.getDirectory('routers');

        fs.writeFileSync(`${ routerDirectory }/${model.modelName}.js`, content);
        displayHelper.fileCreated(filesEnum.router, model.modelName, routerDirectory);
    },
    
    /**
     * Create a controller with some parameters inside the controllers directory of the application.
     * @param {Object} model Information needed to create the file
     */
    createController: function(model){
        const content = fileHelper.content('controller/templateController', model);
        const controllerDirectory = pathHelpers.getDirectory('controllers');

        fs.writeFileSync(`${ controllerDirectory }/${model.modelName}.js`, content);
        displayHelper.fileCreated(filesEnum.controller, model.modelName, controllerDirectory);
    },

    /**
     * Create the service between sequelize and the requested database from the user inside the services directory.
     * @param {String} db The database requested
     */
    createConnect: function(db){
        const content = fileHelper.content('sequelize/connect', { db });

        const servicesDirectory = pathHelpers.getDirectory('services', true);

        fs.writeFileSync(`${servicesDirectory}/dbConnectService.js`, content);
        displayHelper.fileCreated(filesEnum.helper, 'dbConnectService', servicesDirectory);
    },

    /**
     * Copy an `.env` and a `.env.example` file at the root of the project.
     */
    copyEnv: function(){
        const templateDirectory = pathHelpers.getTemplateDirectory();
        const envFile = path.resolve(templateDirectory, `env.template`);
        fs.copyFileSync(envFile, './.env');
        fs.copyFileSync(envFile, './.env.example');
    },

    modifyEnv: function(){
        //Todo
    },

    /**
     * Copy an `.gitignore` file at the root of the project.
     */
    copyGitIgnore: function(){
        const templateDirectory = pathHelpers.getTemplateDirectory();
        const gitIgnoreFile = path.resolve(templateDirectory, `gitignore.template`);
        fs.copyFileSync(gitIgnoreFile, './.gitignore');
    }
}
module.exports = fileHelper;
