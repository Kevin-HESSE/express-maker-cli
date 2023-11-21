const fs = require('fs');
const path = require('path');
const _ = require ('lodash');

const pathHelpers = require('./pathHelper');
const formatContent = require('./beautifyHelper');
const displayHelper = require('./displayHelper');
const filesEnum = require('../enum/fileEnum');
const directoryEnum = require('../enum/directoryEnum');

/**
 * @typedef ConfigurationProperty
 * @type {object}
 * @property {boolean} hasViewEngine - Set the functionality to allow Express using template engine.
 * @property {boolean} isApiRest - Set the functionality to allow Express acting as an API Rest
 * @property {boolean} useTypescript - Enable, change all default js file to ts file.
 * @property {number} port - Define the default port used by the application
 */

/**
 * Generate and compile the content of a file with some variables.
 * @param {String} template The name of the template to copy
 * @param {Object} model Information needed to create the file
 * @returns {String}
 */
function generateContent(template, model) {
    const templateDirectory = pathHelpers.getTemplateDirectory()
    const file = path.resolve(templateDirectory, `${template}.js`);

    const fileRead = fs.readFileSync(file).toString();

    let content = _.template(fileRead)(model);

    return formatContent(content);
}

/**
 * Return the correct extension.
 * @param {boolean} isTypeScript
 * @returns {string}
 */
function getFileExtension(isTypeScript) {
    return isTypeScript ? 'ts' : 'js';
}

/**
 * If the file doesn't exist, it creates it.
 * @param {string} fileType
 * @param {string} fileName
 * @param {ConfigurationProperty} userConfig
 */
function createFile(fileType, fileName, userConfig) {
    const extension = getFileExtension(userConfig.useTypescript);
    let fileDirectory;

    try {
        fileDirectory = pathHelpers.getDirectory(directoryEnum[fileType]);
    } catch (error) {
        displayHelper.errorMessage(error.message);
    }

    if(fs.existsSync(`${ fileDirectory }/${fileName}.${extension}`)){
        displayHelper.warning(filesEnum[fileType], `${fileName}.${extension}`);
        return;
    }

    const content = generateContent('router/template.router', userConfig);
    fs.writeFileSync(`${ fileDirectory }/${fileName}.${extension}`, content);
    displayHelper.fileCreated(filesEnum[fileType], `${fileName}.${extension}`, fileDirectory);
}

/**
 * A list of method related to manipulate files
 * @method createIndex
 * @method createRouter
 * @method createController
 * @method copyFile
 */
const fileHelper = {
    /**
     * Create an `index.js` file with basic setup
     * @param {String} template The name of the template to copy
     * @param {ConfigurationProperty} userConfig Information needed to create the file
     */
    createIndex: function (template, userConfig){
        const extension = getFileExtension(userConfig.useTypescript);

        if(fs.existsSync(`./server.${extension}`)){
            displayHelper.warning(filesEnum.index, `server.${extension}`);
            return;
        }

        const content = generateContent(template, userConfig);

        fs.writeFileSync(`./server.${extension}`, content);
        displayHelper.fileCreated(filesEnum.index, `server.${extension}`, 'the root of the project');
    },

    /**
     * Create a router with some parameters inside the routers directory of the application.
     * @param {string} fileName The name of the file created
     * @param {ConfigurationProperty} userConfig Information needed to create the file
     */
    createRouter: function(fileName, userConfig){
        createFile('router', fileName, userConfig);
    },
    
    /**
     * Create a controller with some parameters inside the controllers directory of the application.
     * @param {string} fileName The name of the file created
     * @param {ConfigurationProperty} userConfig Information needed to create the file
     */
    createController: function(fileName, userConfig){
        createFile('controller', fileName, userConfig);
    },

    /**
     * Copy a template file in the root of the project.
     * @param {string} templateFile Represent the template name to copy
     * @param {string} targetFileName Represent the name of the copied file.
     */
    copyFile: function (templateFile, targetFileName) {
        if(fs.existsSync(`.${targetFileName}`)){
            displayHelper.warning(filesEnum.configuration, `.${targetFileName}`);
            return;
        }

        const templateDirectory = pathHelpers.getTemplateDirectory();
        const file = path.resolve(templateDirectory, `${templateFile}.template`);

        fs.copyFileSync(file, `./.${targetFileName}`);
        displayHelper.fileCreated(filesEnum.configuration, `.${targetFileName}`, 'the root of the project');
    }
}

module.exports = fileHelper;
