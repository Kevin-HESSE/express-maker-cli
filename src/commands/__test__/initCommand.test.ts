import { questionGenerator } from '../../modules/configGenerate';
import { initCommand } from '../initCommand';
import { directoryHelper } from '../../helpers/directoryHelper';
import { fileHelper } from '../../helpers/fileHelper';
import { displayHelper } from '../../helpers/displayHelper';

jest.mock('../../helpers/directoryHelper');
jest.mock('../../helpers/fileHelper');
jest.mock('../../helpers/displayHelper');

const createSpy = jest.spyOn(directoryHelper, 'create');
const copyFileSpy = jest.spyOn(fileHelper, 'copyFile');
const createIndexSpy = jest.spyOn(fileHelper, 'createIndex');
const createRouterSpy = jest.spyOn(fileHelper, 'createRouter');
const createControllerSpy = jest.spyOn(fileHelper, 'createController');
const adviceSpy = jest.spyOn(displayHelper, 'advice');

describe('Test the initCommand function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  })

  it('create an express application with no option', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
        isApiRest: false,
        hasViewEngine: false,
        useTypescript: false,
        defaultPort: 3000,
    });

    await initCommand();

    expect(createSpy).toHaveBeenCalledTimes(5);
    expect(copyFileSpy).toHaveBeenCalledTimes(3);
    expect(createIndexSpy).toHaveBeenCalledTimes(1);
    expect(createRouterSpy).toHaveBeenCalledTimes(1);
    expect(createControllerSpy).toHaveBeenCalledTimes(1);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon');
  })

  it('create an express application with the option isApiRest checked in javascript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: true,
      hasViewEngine: false,
      useTypescript: false,
      defaultPort: 3000,
    });

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv cors');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon');
  })

  it('create an express application with the option isApiRest checked in typescript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: true,
      hasViewEngine: false,
      useTypescript: true,
      defaultPort: 3000,
    });

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv cors');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors');
  })

  it('create an express application with the option hasViewEngine checked in javascript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: false,
      hasViewEngine: true,
      useTypescript: false,
      defaultPort: 3000,
    });

    await initCommand();

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv ejs');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon');
  })

  it('create an express application with the option hasViewEngine checked in typescript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: false,
      hasViewEngine: true,
      useTypescript: true,
      defaultPort: 3000,
    });

    await initCommand();

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv ejs');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon @types/node @types/express ts-node typescript');
  })

  it('create an express application with all options checked in javascript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: true,
      hasViewEngine: true,
      useTypescript: false,
      defaultPort: 3000,
    });

    await initCommand();

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv ejs cors');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon');
  })

  it('create an express application with all options checked in typescript environment', async () => {
    jest.spyOn(questionGenerator, 'initConfig').mockResolvedValue({
      isApiRest: true,
      hasViewEngine: true,
      useTypescript: true,
      defaultPort: 3000,
    });

    await initCommand();

    expect(createSpy).toHaveBeenCalledTimes(8);

    expect(adviceSpy).toHaveBeenCalledTimes(2);
    expect(adviceSpy).toHaveBeenCalledWith(`\nDon't forget to install your main dependencies with this command`, 'npm install express dotenv ejs cors');
    expect(adviceSpy).toHaveBeenCalledWith(`Don't forget to install your dev dependencies with this command`, 'npm install --save-dev nodemon @types/node @types/express ts-node typescript @types/cors');
  })
})