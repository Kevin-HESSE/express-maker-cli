import { templates } from './template';
import { InitOptions } from './interface';

import { UserAnswers, UserConfiguration } from '@/interfaces/UserConfiguration';
import { SelectChoices } from '@/interfaces/SelectChoices';

import { NumberQuestion, ToggleQuestion, SelectQuestion } from '@/models';

import { configPrompt } from '@/helpers/promptsHelper';

interface PackageManager {
  name: string,
  baseInstruction: string,
  devOption: string
}

interface Dependencies {
  mandatory: string[],
  dev: string[]
}

interface Instructions {
  mandatory: string,
  dev: string
}

function dependenciesBuilder( userConfig: UserConfiguration ): Dependencies {
  const dependencies: string[] = [ 'express', 'dotenv' ];
  const devDependencies: string[] = [ 'nodemon' ];

  if ( userConfig.hasViewEngine ) {
    dependencies.push('ejs');
  }

  if ( userConfig.isApiRest ) {
    dependencies.push('cors');
  }

  if ( userConfig.useTypescript ) {
    devDependencies.push('@types/node', '@types/express', 'ts-node', 'typescript');
  }

  if ( userConfig.useTypescript && userConfig.isApiRest ) {
    devDependencies.push('@types/cors');
  }

  return {
    mandatory: dependencies,
    dev: devDependencies,
  };
}

const managers: PackageManager[] = [
  {
    name: 'yarn',
    baseInstruction: 'yarn add',
    devOption: '--dev',
  },
  {
    name: 'npm',
    baseInstruction: 'npm install',
    devOption: '--save-dev',
  },
];

export const builder = {
  getInstructions: function ( userConfig: UserConfiguration ): Instructions {
    const managerEntity = managers.find(manager => manager.name === userConfig.packageManager);

    if ( !managerEntity ) {
      throw new Error(`This ${userConfig.packageManager} is not configured or exist.`);
    }

    const dependencies = dependenciesBuilder(userConfig);

    const instruction = [ managerEntity.baseInstruction, ...dependencies.mandatory ];
    const devInstruction = [ managerEntity.baseInstruction, managerEntity?.devOption, ...dependencies.dev ];

    return {
      mandatory: instruction.join(' '),
      dev: devInstruction.join(' '),
    };
  },
  getTemplate: function(options: InitOptions): UserAnswers {
    const template = templates.find(template => options.template === template.name);

    if(!template) {
      throw new Error('This template does not exist. Check the documentation for all available template.');
    }

    return template.userConfiguration;
  },
  getQuestion: async function (): Promise<UserAnswers> {
    const choices: SelectChoices[] = [
      {
        title: 'npm',
        value: 'npm',
      },
      {
        title: 'yarn',
        value: 'yarn',
      },
    ];

    const askCustomConfig = [
      new ToggleQuestion('useTypescript', 'Do you intend to use Typescript ?', false),
      new ToggleQuestion('hasViewEngine', 'Do you intend to use a view engine ?', false),
      new ToggleQuestion('isApiRest', 'Do you intend to use your server as an ApiREST ?', false),
      new NumberQuestion('defaultPort', 'What port do you want to use ? (default value 3000)', 3000),
      new SelectQuestion('packageManager', 'Which package manager do you want to use?', choices),
    ];

    return await configPrompt(askCustomConfig);
  },
};
