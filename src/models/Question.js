function Question (type, name, message, options){
    this.type = type;
    this.name = name;
    this.message = message;

    switch (this.type) {
        case 'toggle':
            this.initial = options;
            this.active = 'yes';
            this.inactive = 'no';
            break;
        case 'autocomplete':
            this.limit = 5;
            this.choices = options.map( option => option);
            break;
    }
}

module.exports = Question;
