import { configPrompt } from '../helpers/promptsHelper';

import { ToggleQuestion, NumberQuestion } from '../models';
import { UserAnswers } from '../interface/UserConfiguration';
import { SelectQuestion } from '../models/SelectQuestion';
import { SelectChoices } from '../interface/SelectChoices';

export const questionGenerator = {
  initConfig: async function(): Promise<UserAnswers> {
    const choices: SelectChoices[]= [
      {
        title: 'npm',
        value: 'npm',
      },
      {
        title: 'yarn',
        value: 'yarn',
      },
    ]

    const askCustomConfig = [
      new ToggleQuestion('useTypescript', 'Do you intend to use Typescript ?', false),
      new ToggleQuestion('hasViewEngine', 'Do you intend to use a view engine ?', false),
      new ToggleQuestion('isApiRest', 'Do you intend to use your server as an ApiREST ?', false),
      new NumberQuestion('defaultPort', 'What port do you want to use ? (default value 3000)', 3000),
      new SelectQuestion('packageManager', 'Which package manager do you want to use?', choices),
    ];

    return await configPrompt(askCustomConfig);
  }
}