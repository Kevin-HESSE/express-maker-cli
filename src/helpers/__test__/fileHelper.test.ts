import fs from 'fs';

import { UserConfiguration } from '../../interface/UserConfiguration';
import { filesEnum } from '../../enum/FileEnum';
import { fileHelper } from '../fileHelper';
import { displayHelper } from '../displayHelper';
import { formatContent } from '../beautifyHelper';
import { pathHelpers } from '../pathHelper';
import { directoryHelper } from '../directoryHelper';

jest.mock('fs');
jest.mock('console');

const indexContent = `
<% if(useTypescript) { %>
  import 'dotenv/config';
  import express from 'express';
  <% if(isApiRest) { %> import cors from 'cors' <% } %>

  import { mainRouter } from './src/routers/main.router';
<% } else { %>
  require('dotenv').config();
  const express = require('express');
  <% if(isApiRest) { %> const cors = require('cors') <% } %>

  const mainRouter = require('./src/routers/main.router');
<% } %>

const app = express();

const PORT = process.env.PORT || <%= defaultPort %>;

<% if(hasViewEngine){ %> app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

app.use(express.static('public')); <% } %>

<% if(isApiRest) { %>app.use(cors()); app.use(express.json()); <% } %>

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});
`;

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

const writingMock = jest.spyOn(fs, 'writeFileSync');
const successMock = jest.spyOn(displayHelper, 'fileCreated');
const warningMock = jest.spyOn(displayHelper, 'warning');
const errorMock = jest.spyOn(displayHelper, 'errorMessage');

describe('Test the creation of the index file from fileHelper for javascript environment', () => {
  const userConfiguration: UserConfiguration = {
    hasViewEngine: false,
    isApiRest: false,
    useTypescript: false,
    defaultPort: 3000,
  };

  beforeEach(() => {
    userConfiguration.hasViewEngine = false;
    userConfiguration.isApiRest = false;
    userConfiguration.useTypescript = false;

    jest.mocked(fs.readFileSync).mockReturnValue(indexContent);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('return a warning when the index file exist', () => {
    jest.mocked(fs.existsSync).mockReturnValue(true);

    fileHelper.createIndex('index', userConfiguration);

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.index, 'server.js');
    expect(writingMock).toHaveBeenCalledTimes(0);
  });

  it('create an index file with no option for javascript environment', () => {
    const successMock = jest.spyOn(displayHelper, 'fileCreated');
    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex('index', userConfiguration)

    const contentExpected = formatContent(`require('dotenv').config();
const express = require('express');

const mainRouter = require('./src/routers/main.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./server.js', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.js', 'the root of the project');
  })

  it('create an index file with all options for javascript environment', () => {
    userConfiguration.isApiRest = true;
    userConfiguration.hasViewEngine = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex('index', userConfiguration)

    const contentExpected = formatContent(`require('dotenv').config();
const express = require('express');
const cors = require('cors')

const mainRouter = require('./src/routers/main.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use(cors()); app.use(express.json());

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./server.js', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.js', 'the root of the project');
  })

  it('create an index file with no option for typescript environment', () => {
    userConfiguration.useTypescript = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex('index', userConfiguration)

    const contentExpected = formatContent(`import 'dotenv/config';
import express from 'express';

import { 
  mainRouter
} from './src/routers/main.router';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./server.ts', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.ts', 'the root of the project');
  })

  it('create an index file with all options for typescript environment', () => {
    userConfiguration.useTypescript = true;
    userConfiguration.isApiRest = true;
    userConfiguration.hasViewEngine = true;

    jest.mocked(fs.existsSync).mockReturnValue(false);

    fileHelper.createIndex('index', userConfiguration)

    const contentExpected = formatContent(`import 'dotenv/config';
import express from 'express';
import cors from 'cors'

import { 
  mainRouter
} from './src/routers/main.router';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.set('views', 'views');

app.use(express.static('public'));

app.use(cors()); 
app.use(express.json());

app.use(mainRouter);

app.listen(PORT, () => {
  console.log('The server is running on : http://localhost:'+ PORT);
});\n`);

    expect(writingMock).toHaveBeenCalledTimes(1)
    expect(writingMock).toHaveBeenCalledWith('./server.ts', contentExpected);
    expect(successMock).toHaveBeenCalledTimes(1)
    expect(successMock).toHaveBeenCalledWith(filesEnum.index, 'server.ts', 'the root of the project');
  })

});

describe('Test the creation of the router file from fileHelper', () => {
  const userConfiguration: UserConfiguration = {
    hasViewEngine: false,
    isApiRest: false,
    useTypescript: false,
    defaultPort: 3000,
  };

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