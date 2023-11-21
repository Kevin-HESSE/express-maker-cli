# Changelog

## Version 0.9.0

Beta version of the project released on npm.

### New Features

- Possibility to create an Express server with Typescript.

### Modification 
- Remove all resources (file and command line) related to sequelize.
- Removing the question about the main directory to keep things simple.
- Add a list of dev Dependencies when a new project is created.
- Make display message consistent
- Make creation of the different file consistent

### Bug Fixes

- Check if the file exists before create it.

## Version: 0.6.0

### New Features

- New command available :
  - `express-maker sequelize:connect` &rarr; Generate a file into  `appDirectory/services/dbConnectService.js` which configure the connection between sequelize and the database.
  - `express-maker sequelize:crud` &rarr; Generate a router and a controller file for sequelize and for APIRest Server.

### Modification

- Create a `prompts` helper
- Renaming existing command `express-maker model` &rarr; `express-maker sequelize:model`
- Spliting `./models/Question` into more simples files. And refactoring his references.
- Change the import into the `modelTemplate.js`

### Bug Fixes

- Correct a typo for the word `Datatypes` &rarr; `DataTypes`
- Supress the space inside the `.env` files.
