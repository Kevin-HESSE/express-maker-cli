import { Question } from './Question';

/**
 * Class related to the confirm type for `prompts`
 */
export class ConfirmQuestion extends Question {
  constructor(name: string, message: string){
    super('confirm', name, message);
  }
};