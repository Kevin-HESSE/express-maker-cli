import prompts from 'prompts';

import { UserAnswers } from '@/interfaces/UserConfiguration';
import { exitCommand as onCancel } from '@/commands/exitCommand';

export function configPrompt<T extends string>(questions: prompts.PromptObject<T> | Array<prompts.PromptObject<T>>, options?: prompts.Options): Promise<UserAnswers> {
  return prompts<T>(questions, { onCancel }) as Promise<UserAnswers>;
}
