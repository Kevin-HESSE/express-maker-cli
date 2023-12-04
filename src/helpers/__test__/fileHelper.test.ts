import fs from 'fs';

import { UserConfiguration } from '../../interface/UserConfiguration';
import { filesEnum } from '../../enum/FileEnum';
import { fileHelper } from '../fileHelper';
import { displayHelper } from '../displayHelper';
import { formatContent } from '../beautifyHelper';

jest.mock('fs');
jest.mock('console');

const writingMock = jest.spyOn(fs, 'writeFileSync');
const successMock = jest.spyOn(displayHelper, 'fileCreated');

describe('Test all methods from fileHelper', () => {
  const userConfiguration: UserConfiguration = {
    hasViewEngine: false,
    isApiRest: false,
    useTypescript: false,
    defaultPort: 3000,
  };

  beforeEach(() => {
    jest.mocked(fs.readFileSync).mockReturnValue(`
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
    `);
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('return a warning when the file exist', () => {
    const warningMock = jest.spyOn(displayHelper, 'warning');
    jest.mocked(fs.existsSync).mockReturnValue(true);

    fileHelper.createIndex('index', userConfiguration);

    expect(warningMock).toHaveBeenCalledTimes(1);
    expect(warningMock).toHaveBeenCalledWith(filesEnum.index, 'server.js');
    expect(writingMock).toHaveBeenCalledTimes(0);
  });

  it('create an index file in javascript', async () => {
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

  it('create an index file with all options in Typescript environment', () => {
    userConfiguration.isApiRest = true;
    userConfiguration.hasViewEngine = true;
    userConfiguration.useTypescript = true;

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