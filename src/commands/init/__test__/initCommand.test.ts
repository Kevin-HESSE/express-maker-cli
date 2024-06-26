import prompts from 'prompts';

import { initCommand } from '../index';
import { builder } from '../builder';
import { InitOptions } from '../interface';

import { directoryHelper } from '@/helpers/directoryHelper';
import { fileHelper } from '@/helpers/fileHelper';
import { displayHelper } from '@/helpers/displayHelper';
import { UserAnswers } from '@/interfaces/UserConfiguration';

jest.mock('@/helpers/directoryHelper');
jest.mock('@/helpers/fileHelper');
jest.mock('@/helpers/displayHelper');

const createSpy = jest.spyOn(directoryHelper, 'create');
const copyFileSpy = jest.spyOn(fileHelper, 'copyFile');
const createIndexSpy = jest.spyOn(fileHelper, 'createIndex');
const createRouterSpy = jest.spyOn(fileHelper, 'createRouter');
const createControllerSpy = jest.spyOn(fileHelper, 'createController');
const createTestSpy = jest.spyOn(fileHelper, 'createTest');
const adviceSpy = jest.spyOn(displayHelper, 'advice');

const userConfig: UserAnswers = {
  isApiRest: false,
  hasViewEngine: false,
  useTypescript: false,
  defaultPort: 3000,
  packageManager: 'npm',
  useTest: false
}

describe('Test the initCommand function with no option', () => {
  const options: InitOptions = {};

  afterEach(() => {
    userConfig.isApiRest = false;
    userConfig.hasViewEngine = false;
    userConfig.useTypescript = false;
    userConfig.defaultPort = 3000;
    userConfig.packageManager = 'npm';
    userConfig.useTest = false;

    jest.resetAllMocks();
  });

  it('create an express application with no option', async () => {
    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(createSpy).toHaveBeenCalledTimes(5);
    expect(copyFileSpy).toHaveBeenCalledTimes(3);
    expect(createIndexSpy).toHaveBeenCalledTimes(1);
    expect(createRouterSpy).toHaveBeenCalledTimes(1);
    expect(createControllerSpy).toHaveBeenCalledTimes(1);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon',
    );
  });

  it('create an express application with the option isApiRest checked in javascript environment', async () => {
    userConfig.isApiRest = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon',
    );
  });

  it('create an express application with the option isApiRest checked in typescript environment', async () => {
    userConfig.isApiRest = true;
    userConfig.useTypescript = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(3);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      'You can initialize the typescript config file with this command',
      'npx tsc --init'
    );
  });

  it('create an express application with the option hasViewEngine checked in javascript environment', async () => {
    userConfig.hasViewEngine = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv ejs',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon',
    );
  });

  it('create an express application with the option hasViewEngine checked in typescript environment', async () => {
    userConfig.hasViewEngine = true;
    userConfig.useTypescript = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(3);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv ejs',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript',
    );
  });

  it('create an express application with all options checked in javascript environment', async () => {
    userConfig.isApiRest = true;
    userConfig.hasViewEngine = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv ejs cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon',
    );
  });

  it('create an express application with all options checked in typescript environment', async () => {
    userConfig.isApiRest = true;
    userConfig.hasViewEngine = true;
    userConfig.useTypescript = true;
    userConfig.useTest = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(createSpy).toHaveBeenCalledTimes(9);

    expect(createTestSpy).toHaveBeenCalledTimes(1);

    expect(adviceSpy).toHaveBeenCalledTimes(4);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv ejs cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors jest supertest @types/jest @types/supertest ts-jest',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      'You can initialize the typescript config file with this command',
      'npx tsc --init'
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to configure ts-jest for testing your app with jest and typescript. You can find more information here`,
      'https://jestjs.io/docs/getting-started#using-typescript'
    )
  });

  it('propose the yarn package manager', async () => {
    userConfig.packageManager = 'yarn';

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

        expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'yarn add express dotenv',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'yarn add --dev nodemon',
    );
  });

  it('create an express application with test option available in javascript environment', async () => {
    userConfig.useTest = true;

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(createSpy).toHaveBeenCalledTimes(6);

    expect(createTestSpy).toHaveBeenCalledTimes(1);
    expect(createTestSpy).toHaveBeenCalledWith('mainController.test', userConfig);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon jest supertest',
    );
  })

  it('create an express application with test option available in typescript environment', async () => {
    userConfig.useTest = true;
    userConfig.useTypescript = true

    jest.spyOn(builder, 'getQuestion').mockResolvedValue(userConfig);

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(4);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript jest supertest @types/jest @types/supertest ts-jest',
    );
  })
});

describe('Test the init command with the template option', () => {

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('create an express application with api-js template', async () => {
    const options: InitOptions = {
      template: 'api-js'
    };

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon jest supertest',
    );
  });

  it('create an express application with api-ts template', async () => {
    const options: InitOptions = {
      template: 'api-ts'
    };

    await initCommand(options);

    expect(adviceSpy).toHaveBeenCalledTimes(4);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors jest supertest @types/jest @types/supertest ts-jest',
    );
  });
})