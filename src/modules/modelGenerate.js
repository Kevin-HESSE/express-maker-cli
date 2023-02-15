const prompts = require('prompts');
const types = require('../enum/typesEnum');
const Question = require('../models/Question');
const onCancel = require('../commands/exitCommand');
const displayHelper = require('../helpers/displayHelper');

const model = {
    askAttributes : [
        new Question('text', 'attribute', 'The name of the attribute :'),
        new Question('select', 'type', 'The type of the attribute :', types ),
        new Question('toggle', 'allowNull', 'Can be null ?', true),
        new Question('toggle', 'continue', 'Would you like to add an other attribute ?', false),
    ],
    askForeignKeys: [
        new Question('text', 'attribute', 'The name of the foreignKey :'),
        new Question('select', 'type', 'The type of the foreignKey :', types ),
        new Question('text', 'referenceModel', 'The name of the reference model :'),
        new Question('text', 'referenceAttr', 'The attribute to refer :'),
        new Question('toggle', 'continue', 'Would you like to add an other attribute ?', false),
    ],
    askOptions : [
        new Question('text', 'tableName', 'Define the name of the table :'),
        new Question('toggle', 'underscored', 'Would you like to activate the underscored option ?', true),
        new Question('toggle', 'timestamps', 'Would you like to activate the timestamps option ?', true),
    ],
    generate : async function(modelName){
        const attr = [];
        const foreignKey = [];
        let status = true;
        let repeatFK = true;

        displayHelper.warning('Answer all questions in order to generate the model');
        while (status){
            
            const attributes = await prompts(this.askAttributes, { onCancel });

            if(!attributes.continue){
                status = false;
            }

            delete attributes.continue;
            attr.push(attributes);
        }

        const hasForeignKey = await prompts(
            new Question('confirm', 'hasForeignKey', 'Would you like to declare foreign keys'),
            { onCancel }
        );

        if(hasForeignKey.hasForeignKey) {
            while(repeatFK){
                const attributeFK = await prompts(this.askForeignKeys, { onCancel });

                if(!attributeFK.continue){
                    repeatFK = false;
                }
    
                delete attributeFK.continue;
                foreignKey.push(attributeFK);
            }
        }

        const options = await prompts(this.askOptions, { onCancel });
        if(hasForeignKey.hasForeignKey) { displayHelper.warning(`Don't forget to require all references models for your class !`) }

        return {
            modelName,
            attributes : attr,
            foreignKey: hasForeignKey ? foreignKey : null,
            options
        };
    }
};

module.exports = model;
