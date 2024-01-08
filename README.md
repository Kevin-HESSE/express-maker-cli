# Express maker CLI

This package is a tool to generate an Express.js server with in few steps. I'm inspired by some others tools such as : 
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli), more information here 
- `symfony/maker-bundle`, a symfony package which generate some file.

This project is born of my need to generate a bunch of Express.js application during my formation.

## FeedBack

Don't hesistate to give feedback [here](https://github.com/Kevin-HESSE/express-maker-cli/issues). 

Try to explain how the problem occurs. It can be helpful to resolve.

## How to use

Run this command inside the project folder where you need to install express :

```bash 
npx @khesse-project/express-maker-cli init
```

You need to answer several questions :
- Do you want to use Typescript ?
- Do you need a view engine ? 
- Do you use the application as an APIRest ?
- Which default port do you want to use ?
- Which package manager do you want to use?
- Do you intend to use a test library?

After that, all files and folders will be created based on your answers. It will prompt you the list of dependencies to install with the npm command.

:warning: No dependencies will be installed ! :warning:. You have to do it manually.

You can use the -t, for template, option with an argument to skip all questions. There is only two templates available, api-js and api-ts.

```bash 
npx @khesse-project/express-maker-cli init -t api-js
```

- **api-js** is equal to :
  - Do you want to use Typescript ? ```False```
  - Do you need a view engine ? ```False```
  - Do you use the application as an APIRest ? ```True```
  - Which default port do you want to use ? ```3000```
  - Which package manager do you want to use? ```npm```
  - Do you intend to use a test library? ```True```

```bash 
npx @khesse-project/express-maker-cli init -t api-ts
```

- **api-ts** is equal to :
  - Do you want to use Typescript ? ```True```
  - Do you need a view engine ? ```False```
  - Do you use the application as an APIRest ? ```True```
  - Which default port do you want to use ? ```3000```
  - Which package manager do you want to use? ```npm```
  - Do you intend to use a test library? ```True```

