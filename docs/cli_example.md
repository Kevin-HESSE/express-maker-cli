# Fil conducteur du CLI

## Question initiale

1. Quel est le nom du modèle ?

```js
[
    {
        type: 'text',
        name: 'modelName',
        message: 'Define the model to create :',
        validate: ((val) => stringValidate(val))
    }
]
```

2. Saisir un premier attribut:

    - Le nom
    - Le type
    - defaultvalue
    - allowNull

```js
[
   {
       type: 'text',
       name: 'attribute',
       message: 'The name of the attribute :'
   },
    {
        type: 'autocomplete',
        name: 'type',
        message: 'The type of the attribute :',
        choices: [
            { title: 'string'},
            { title: 'integer'},
            { title: 'date'},
        ]       
    },
    {
        type: 'toggle',
        name: 'allowNull',
        message: 'Can be null ?',
        initial: true,
        active: 'yes',
        inactive: 'no'
    },
]
```

1. Proposer de continuer.
    - Si oui, recommencer l'étape 2
    - Si non, continuez
2. Saisir le nom de la table
3. Deux possibilités 
    - soit un fichier config
    - soit poser des questions

## Element annexe

Validator string

```js
function stringValidate(val){
    const expression = new RegExp(/^[a-zA-Z]+$/g);

    if(!val.match(expression)){
        return `Warning : the string format is wrong`;
    } else {
        return true;
    }
}
```
