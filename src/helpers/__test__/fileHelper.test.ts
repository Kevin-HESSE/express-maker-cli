import fs from 'fs';
import path from 'path';

import { UserConfiguration } from '@/interfaces/UserConfiguration';
import { filesEnum } from '@/enum/FileEnum';

import { fileHelper } from '../fileHelper';
import { displayHelper } from '../displayHelper';
import { formatContent } from '../beautifyHelper';

jest.mock('fs');
jest.mock('console');

const userConfiguration: UserConfiguration = {
  hasViewEngine: false,
  isApiRest: false,
  useTypescript: false,
  defaultPort: 3000,
  packageManager: 'npm',
};

const serverContent = `
<% if(useTypescript) { %>
import express from 'express';
  <% if(isApiRest) { %> import cors from 'cors' <% } %>

import { mainRouter } from './routers/main.router';
  <% } else { %>
  const express = require('express');
  <% if(isApiRest) { %> const cors = require('cors') <% } %>

  const mainRouter = require('./routers/main.router');
  <% } %>

const app = express();

<% if(hasViewEngine){ %> app.set('view engine', 'ejs');
  app.set('views', 'views');

  app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

<% if (useTypescript) { %>
export { app };
  <% } else { %>
  module.exports = app;
  <% } %>

`;

const indexContent = `
<% if (useTypescript) { %>
import 'dotenv/config';
import { app } from './src/server';
  <% } else { %>
  require('dotenv').config();
  const app = require('./src/server');
  <% } %>

function start() {
  const PORT = process.env.PORT || <%= defaultPort %>;
    
  app.listen(PORT, () => {
    console.log('The server is running on : http://localhost:'+ PORT);
  });
}

start();
`;

const indexContentExpectedInJavascript = formatContent(`require('dotenv').config();
const app = require('./src/server');

function start() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log('The server is running on : http://localhost:'+ PORT);
  });
}

start();\n`);

const indexContentExpectedInTypescript = formatContent(`import 'dotenv/config';
import { app } from './src/server';

function start() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log('The server is running on : http://localhost:'+ PORT);
  });
}

start();\n`);

const routerContent = `
<% if (useTypescript) { %>
  import { Router } from 'express';
  import { mainController } from '../controllers/mainController';
<% } else { %>
  const { Router } = require('express');
  const mainController = require('../controllers/mainController');
<% } %>
const mainRouter = Router();

mainRouter.get('/', mainController.home);

<% if (useTypescript) { %>
  export { mainRouter };
<% } else { %>
  module.exports = mainRouter;
<% } %>
`;

const controllerContent = `
<% if (useTypescript) { %>import { Request, Response } from 'express';  <% } %>

const mainController = {
  home: function(request<% if (useTypescript) { %>: Request <% } %>, response<% if (useTypescript) { %>: Response <% } %>){
    <% if(isApiRest) { %> response.json(\`It's alive !\`); <% } else { %>response.send(\`It's alive !\`); <% } %>
  }
}

<% if (useTypescript) { %>
  export { mainController };
<% } else { %>
  module.exports = mainController;
<% } %>
`;

const writingMock = jest.spyOn(fs, 'writeFileSync');
const successMock = jest.spyOn(displayHelper, 'fileCreated');
const warningMock = jest.spyOn(displayHelper, 'warning');
const errorMock = jest.spyOn(displayHelper, 'errorMessage');

describe('Test the creation of the index file from fileHelper', () => {
  beforeEach(() => {
    userConfiguration.hasViewEngine = false;
    userConfiguration.isApiRest = false;
    userConfiguration.useTypescript = false;

    jest.mocked(fs.readFileSync)
      .mockReturnValueOnce(serverContent)
      .mockReturnValueOnce(indexContent)
    ;
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('return a warning when the index file exist', () => {
    jest.mocked(fs.existsSync).mockReturnValue(true);

    fileHelper.createIndex(userConfiguration);

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.index, 'server.js');
    expect(writingMock).toHaveBeenCalledTimes(0);
  });

  it('create an index file with no option for javascript environment', () => {
    const successMock = jest.spyOn(displayHelper, 'fileCreated');
    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex(userConfiguration)

    const serverContentExpected = formatContent(`const express = require('express');

const mainRouter = require('./routers/main.router');

const app = express();

app.use(mainRouter);

module.exports = app;\n`);


    expect(writingMock).toHaveBeenCalledTimes(2)
    expect(writingMock).toHaveBeenCalledWith('./src/server.js', serverContentExpected);
    expect(writingMock).toHaveBeenCalledWith('./index.js', indexContentExpectedInJavascript);

    expect(successMock).toHaveBeenCalledTimes(2)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.js', 'the src directory');
  })

  it('create an index file with all options for javascript environment', () => {
    userConfiguration.isApiRest = true;
    userConfiguration.hasViewEngine = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex(userConfiguration)

    const serverContentExpected = formatContent(`const express = require('express');
const cors = require('cors')

const mainRouter = require('./routers/main.router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(cors()); app.use(express.json());

app.use(mainRouter);

module.exports = app;\n`);

    expect(writingMock).toHaveBeenCalledTimes(2)
    expect(writingMock).toHaveBeenCalledWith('./src/server.js', serverContentExpected);
    expect(writingMock).toHaveBeenCalledWith('./index.js', indexContentExpectedInJavascript);

    expect(successMock).toHaveBeenCalledTimes(2)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.js', 'the src directory');
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'index.js', 'the root of the project');
  })

  it('create an index file with no option for typescript environment', () => {
    userConfiguration.useTypescript = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex(userConfiguration)

    const serverContentExpected = formatContent(`import express from 'express';

import { 
  mainRouter
} from './routers/main.router';

const app = express();

app.use(mainRouter);

export { app };\n`);

    expect(writingMock).toHaveBeenCalledTimes(2)
    expect(writingMock).toHaveBeenCalledWith('./src/server.ts', serverContentExpected);
    expect(writingMock).toHaveBeenCalledWith('./index.ts', indexContentExpectedInTypescript);

    expect(successMock).toHaveBeenCalledTimes(2)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.ts', 'the src directory');
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'index.ts', 'the root of the project');
  })

  it('create an index file with all options for typescript environment', () => {
    userConfiguration.useTypescript = true;
    userConfiguration.isApiRest = true;
    userConfiguration.hasViewEngine = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex(userConfiguration)

    const serverContentExpected = formatContent(`import express from 'express';
import cors from 'cors'

import { 
  mainRouter
} from './routers/main.router';

const app = express();

app.set('view engine', 'ejs'); 
app.set('views', 'views');

app.use(express.static('public'));

app.use(cors()); 
app.use(express.json());

app.use(mainRouter);

export { app };\n`);

    expect(writingMock).toHaveBeenCalledTimes(2)
    expect(writingMock).toHaveBeenCalledWith('./src/server.ts', serverContentExpected);
    expect(writingMock).toHaveBeenCalledWith('./index.ts', indexContentExpectedInTypescript);

    expect(successMock).toHaveBeenCalledTimes(2)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.ts', 'the src directory');
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'index.ts', 'the root of the project');
  })

});

describe('Test the creation of the router file from fileHelper', () => {
  beforeEach(() => {
    userConfiguration.useTypescript = false;
    jest.mocked(fs.readFileSync).mockReturnValue(routerContent);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('display an error because the router directory does not exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => false) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createRouter('main.router', userConfiguration);

    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith('The routers directory does not exist !');
  })

  it('display a warning when the router file exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => true) // Check the file exist

    fileHelper.createRouter('main.router', userConfiguration);

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.router, 'main.router.js');
    expect(writingMock).toHaveBeenCalledTimes(0);
  })

  it('create a router file for javascript environment', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createRouter('main.router', userConfiguration);

    const contentExpected = formatContent(`const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = Router();

mainRouter.get('/', mainController.home);

module.exports = mainRouter;\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/routers/main.router.js', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.router, 'main.router.js', './src/routers');
  })

  it('create a router file for typescript environment', () => {
    userConfiguration.useTypescript = true;

    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createRouter('main.router', userConfiguration);

    const contentExpected = formatContent(`import { Router } from 'express';
import { mainController } from '../controllers/mainController';

const mainRouter = Router();

mainRouter.get('/', mainController.home);

export { mainRouter };\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/routers/main.router.ts', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.router, 'main.router.ts', './src/routers');
  })
})

describe('Test the creation of the controller file from fileHelper', () => {
  beforeEach(() => {
    userConfiguration.hasViewEngine = false;
    userConfiguration.isApiRest = false;
    userConfiguration.useTypescript = false;
    jest.mocked(fs.readFileSync).mockReturnValue(controllerContent);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('display an error because the controller directory does not exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => false) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith('The controllers directory does not exist !');
  })

  it('display a warning when the controller file exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => true) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.controller, 'mainController.js');
    expect(writingMock).toHaveBeenCalledTimes(0);
  })

  it('create a controller file with no option for javascript environment', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    const contentExpected = formatContent(`const mainController = {
  home: function(request, response){
    response.send(\`It's alive !\`);
  }
}

module.exports = mainController;\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/controllers/mainController.js', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.controller, 'mainController.js', './src/controllers');
  })

  it('create a controller file with all options for javascript environment', () => {
    userConfiguration.isApiRest = true;

    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    const contentExpected = formatContent(`const mainController = {
  home: function(request, response){
    response.json(\`It's alive !\`);
  }
}

module.exports = mainController;\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/controllers/mainController.js', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.controller, 'mainController.js', './src/controllers');
  })

  it('create a controller file with no option for typescript environment', () => {
    userConfiguration.useTypescript = true;

    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    const contentExpected = formatContent(`import { Request, Response } from 'express';

const mainController = {
  home: function(request: Request, response: Response){
    response.send(\`It's alive !\`);
  }
}

export { mainController };\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/controllers/mainController.ts', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.controller, 'mainController.ts', './src/controllers');
  })

  it('create a controller file with all options for typescript environment', () => {
    userConfiguration.isApiRest = true;
    userConfiguration.useTypescript = true;

    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check the src directory exist
      .mockImplementationOnce(() => true) // Check the router directory exist
      .mockImplementationOnce(() => false) // Check the file exist

    fileHelper.createController('mainController', userConfiguration);

    const contentExpected = formatContent(`import { Request, Response } from 'express';

const mainController = {
  home: function(request: Request, response: Response){
    response.json(\`It's alive !\`);
  }
}

export { mainController };\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./src/controllers/mainController.ts', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.controller, 'mainController.ts', './src/controllers');
  })
})

describe('Test the copy method from fileHelper', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('display a warning when the file to copy exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true) // Check if the file exists

    fileHelper.copyFile('env', 'env');

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.configuration, '.env');
    expect(writingMock).toHaveBeenCalledTimes(0);
  })

  it('copy the file', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => false) // Check if the file exists

    const copyMock = jest.spyOn(fs, 'copyFileSync');
    fileHelper.copyFile('env', 'env');

    expect(copyMock).toHaveBeenCalledTimes(1);
    expect(copyMock).toHaveBeenCalledWith(path.resolve(__dirname, `../../templates/env.template`), './.env');
    expect(successMock).toHaveBeenCalledTimes(1);
    expect(successMock).toHaveBeenCalledWith(filesEnum.configuration, '.env', 'the root of the project');
  })
})