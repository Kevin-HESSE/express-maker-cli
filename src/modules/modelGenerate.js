const Question = require('../models/Question');
const prompts = require('prompts');
const types = require('../enum/typesEnum');

const model = {

    askModelName : new Question('text', 'modelName', 'Define the model to create :'),
    askAttributes : [
        new Question('text', 'attribute', 'The name of the attribute :'),
        new Question('autocomplete', 'type', 'The type of the attribute :', types ),
        new Question('toggle', 'allowNull', 'Can be null ?', true),
        new Question('toggle', 'continue', 'Would you like to add an other attribute ?', false)
    ],
    askOptions : [
        new Question('text', 'tableName', 'Define the name of the table :'),
        new Question('toggle', 'underscored', 'Would you like to activate the underscored option ?', true),
        new Question('toggle', 'timestamps', 'Would you like to activate the timestamps option ?', true),
    ],
    //askTableName : new Question('text', 'tableName', 'Define the name of the table :'),
    //askUnderscored : new Question('confirm', 'underscored', 'Would you like to activate the underscored option ?', true),
    //askTimestamps : new Question('confirm', 'timestamps', 'Would you like to activate the timestamps option ?', true),
    generate : async function(modelName){
        const attr = [];
        let status = true;

        while (status){
            const attributes = await prompts(this.askAttributes);

            if(!attributes.continue){
                status = false;
            }

            delete attributes.continue;
            attr.push(attributes);
        }

        const options = await prompts(this.askOptions);

        return {
            modelName,
            attributes : attr,
            options
        };
    }
};

module.exports = model;
