import { directoryHelper } from '../directoryHelper';
import fs from 'fs';

jest.mock('fs');

describe('Test the method present inside the directoryHelper', () => {

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('should create a directory', () => {
    jest.mocked(fs.existsSync).mockReturnValue(false)

    const spy = jest.spyOn(fs, 'mkdirSync')

    directoryHelper.create('test')

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('test', {mode: 0o755 });
  });

  it('should not create a directory if it exist', () => {
    jest.mocked(fs.existsSync).mockReturnValue(true)

    const spy = jest.spyOn(fs, 'mkdirSync')

    directoryHelper.create('test')

    expect(spy).toHaveBeenCalledTimes(0);
  })
})