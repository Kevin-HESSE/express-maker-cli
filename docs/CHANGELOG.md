# Version: 0.6.0

## New Features

- New command available :
  - `express-maker sequelize:connect` &rarr; Generate a file into  `appDirectory/services/dbConnectService.js` which configure the connection between sequelize and the database.
  - `express-maker sequelize:crud` &rarr; Generate a router and a controller file for sequelize and for APIRest Server.

## Modification

- Create a `prompts` helper
- Renaming existing command `express-maker model` &rarr; `express-maker sequelize:model`
- Spliting `./models/Question` into more simples files. And refactoring his references.
- Change the import into the `modelTemplate.js`

## Bug Fixes

- Correct a typo for the word `Datatypes` &rarr; `DataTypes`
- Supress the space inside the `.env` files.
