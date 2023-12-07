import { directoryHelper } from '@/helpers/directoryHelper';
import { fileHelper } from '@/helpers/fileHelper';
import { displayHelper } from '@/helpers/displayHelper';
import { UserAnswers } from '@/interfaces/UserConfiguration';

import { initCommand } from '../index';
import { builder } from '../builder';

jest.mock('@/helpers/directoryHelper');
jest.mock('@/helpers/fileHelper');
jest.mock('@/helpers/displayHelper');

const createSpy = jest.spyOn(directoryHelper, 'create');
const copyFileSpy = jest.spyOn(fileHelper, 'copyFile');
const createIndexSpy = jest.spyOn(fileHelper, 'createIndex');
const createRouterSpy = jest.spyOn(fileHelper, 'createRouter');
const createControllerSpy = jest.spyOn(fileHelper, 'createController');
const adviceSpy = jest.spyOn(displayHelper, 'advice');

const userConfig: UserAnswers = {
  isApiRest: false,
  hasViewEngine: false,
  useTypescript: false,
  defaultPort: 3000,
  packageManager: 'npm',
}

describe('Test the initCommand function', () => {
  afterEach(() => {
    userConfig.isApiRest = false;
    userConfig.hasViewEngine = false;
    userConfig.useTypescript = false;
    userConfig.defaultPort = 3000;
    userConfig.packageManager = 'npm';

    jest.resetAllMocks();
  });

  it('create an express application with no option', async () => {
    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

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

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

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

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors',
    );
  });

  it('create an express application with the option hasViewEngine checked in javascript environment', async () => {
    userConfig.hasViewEngine = true;

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

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

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
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

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

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

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'npm install express dotenv ejs cors',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors',
    );
  });

  it('propose the yarn package manager', async () => {
    userConfig.packageManager = 'yarn';

    jest.spyOn(builder, 'getUserConfiguration').mockResolvedValue(userConfig);

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`,
      'yarn add express dotenv',
    );
    expect(adviceSpy).toHaveBeenCalledWith(
      `Don't forget to install your dev dependencies with this command`,
      'yarn add --dev nodemon',
    );
  })
});