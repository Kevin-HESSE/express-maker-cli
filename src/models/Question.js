const kleur = require("kleur");
const validator = require("../helpers/validate");

function Question (type, name, message, options = null){
    this.type = type;
    this.name = name;
    this.message = kleur.cyan().underline(message);

    switch (this.type) {
        case 'toggle':
            this.initial = options;
            this.active = 'yes';
            this.inactive = 'no';
            break;
        case 'select':
            this.choices = options.map( (option) => { return { title: option } });
            this.format = (val) => val = options[val];
            break;
        case 'text': 
            this.validate = validator.string;
    }
}

module.exports = Question;