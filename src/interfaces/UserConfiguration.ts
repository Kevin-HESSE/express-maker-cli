import { Answers } from 'prompts';

/**
 * Define all properties and types associated to the User Configuration needed to generate the express server
 */
export type UserConfiguration = {
  hasViewEngine: boolean,
  isApiRest: boolean,
  useTypescript: boolean,
  defaultPort: number,
  packageManager: string,
  useTest: boolean
}

/**
 * Associate the previous type to Answers type from prompts and keep all information
 */
export type UserAnswers = Answers<keyof UserConfiguration>;
