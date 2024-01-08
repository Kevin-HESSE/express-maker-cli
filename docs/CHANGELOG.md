# Changelog

## Version 1.1.0

### New Features

- New options are available during the creation process :
  - Add the test option. Give the possibility to create a test directory inside the project. 
  - Add the package manager option. For the moment, only npm and yarn are available.
- New CLI option available : -t for template. This allows to skip the question process and create an Express app with some configured template. Two are currently available :
  - api-js : Use npm as package manager with api rest and test options enable. The port by default is 3000
  - api-ts : Same as above except with the typescript option enable

### Modification

- Create multiples tests suites
- Create a dockerfile for testing the functionality of the CLI
- Splitting the init command file into smaller files

## Version 1.0.0

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
