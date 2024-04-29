import fs from 'fs';

import { pathHelpers } from '../pathHelper';

jest.mock('fs');

describe('Test the method of pathHelpers', () => {
  it('return the directory', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)

    const directory = pathHelpers.getDirectory('routers');

    expect(directory).toBe('./src/routers');
  })

  it('throws an error when the directory does not exist', () => {
    jest.mocked(fs.existsSync)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)

    expect(() => {
      pathHelpers.getDirectory('routers');
    }).toThrow('The routers directory does not exist !');
  })
})