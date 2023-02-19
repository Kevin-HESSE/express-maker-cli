# Version: 0.5.0

## New Features

- New command available :
  - `express-maker sequelize:connect` &rarr; Generate a file into  `appDirectory/services/dbConnectService.js` which configure the connection between sequelize and the database.

## Modification

- Create a `prompts` helper
- Renaming existing command `express-maker model` &rarr; `express-maker sequelize:model`
- Spliting `./models/Question` into more simples files. And refactoring his references.
- Change the import into the `modelTemplate.js`

## Bug Fixes

- Correct a typo for the word `Datatypes` &rarr; `DataTypes`
- Supress the space inside the `.env` files.
