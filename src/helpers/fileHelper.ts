import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import { pathHelpers } from './pathHelper';
import { displayHelper } from './displayHelper';
import { folderEnum } from '../enum/FolderEnum';
import { formatContent } from './beautifyHelper';
import { filesEnum } from '../enum/FileEnum';
import { UserConfiguration } from '../interface/UserConfiguration';

/**
 * Generate and compile the content of a file with some variables.
 * @param {String} template The name of the template to copy
 * @param {Object} model Information needed to create the file
 * @returns {String}
 */
function generateContent(template: string, model: UserConfiguration): string {
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
function getFileExtension(isTypeScript: boolean): string {
    return isTypeScript ? 'ts' : 'js';
}

/**
 * If the file doesn't exist, it creates it.
 * @param {string} fileType
 * @param {string} templateName
 * @param {string} fileName
 * @param {UserConfiguration} userConfig
 */
function createFile(fileType: string, templateName: string, fileName: string, userConfig: UserConfiguration) {
    const extension = getFileExtension(userConfig.useTypescript);
    let fileDirectory: string = '';

    try {
        fileDirectory = pathHelpers.getDirectory(folderEnum[fileType]);
    } catch (error) {
        if(error instanceof Error) displayHelper.errorMessage(error.message);
    }

    if(fs.existsSync(`${ fileDirectory }/${fileName}.${extension}`)){
        displayHelper.warning(filesEnum[fileType], `${fileName}.${extension}`);
        return;
    }

    const content = generateContent(templateName, userConfig);
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
export const fileHelper = {
    /**
     * Create an `index.js` file with basic setup
     * @param {String} template The name of the template to copy
     * @param {UserConfiguration} userConfig Information needed to create the file
     */
    createIndex: function (template: string, userConfig: UserConfiguration){
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
     * @param {UserConfiguration} userConfig Information needed to create the file
     */
    createRouter: function(fileName: string, userConfig: UserConfiguration){
        createFile('router', 'routers/router.template', fileName, userConfig);
    },
    
    /**
     * Create a controllers with some parameters inside the controllers directory of the application.
     * @param {string} fileName The name of the file created
     * @param {UserConfiguration} userConfig Information needed to create the file
     */
    createController: function(fileName: string, userConfig: UserConfiguration){
        createFile('controller', 'controllers/controller.template', fileName, userConfig);
    },

    /**
     * Copy a template file in the root of the project.
     * @param {string} templateFile Represent the template name to copy
     * @param {string} targetFileName Represent the name of the copied file.
     */
    copyFile: function (templateFile: string, targetFileName: string) {
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
