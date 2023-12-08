import prompts from 'prompts';

import { builder } from '../builder';
import { InitOptions } from '../interface';

describe('Test the getTemplate method', () => {

  it('return an userConfiguration when the template is found', () => {
    const options: InitOptions = {
      template: 'api-js'
    }

    const template = builder.getTemplate(options)

    expect(template).toHaveProperty('hasViewEngine', false)
    expect(template).toHaveProperty('isApiRest', true)
    expect(template).toHaveProperty('defaultPort', 3000)
    expect(template).toHaveProperty('useTypescript', false)
    expect(template).toHaveProperty('packageManager', 'npm')
  })
  it('throw an error when the template is not found', () => {
    const options: InitOptions = {
      template: 'api'
    }

    expect(() => builder.getTemplate(options)).toThrow(Error)
  })
});

describe('Test the getQuestion method', () => {
  it('return the response', async () => {
    prompts.inject([false, false, false, 3000, 'npm'])

    const answers = await builder.getQuestion();

    expect(answers).toStrictEqual({
      isApiRest: false,
      hasViewEngine: false,
      useTypescript: false,
      defaultPort: 3000,
      packageManager: 'npm',
    })
  })
})