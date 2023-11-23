import { configPrompt } from '../helpers/promptsHelper';

import { ToggleQuestion, NumberQuestion } from '../models';
import { UserAnswers } from '../interface/UserConfiguration';

export async function configGenerate(): Promise<UserAnswers> {
  const askCustomConfig = [
    new ToggleQuestion('useTypescript', 'Do you intend to use Typescript ?', false),
    new ToggleQuestion('hasViewEngine', 'Do you intend to use a view engine ?', false),
    new ToggleQuestion('isApiRest', 'Do you intend to use your server as an ApiREST ?', false),
    new NumberQuestion('defaultPort', 'What port do you want to use ? (default value 3000)', 3000)
  ];

  return await configPrompt(askCustomConfig);
}