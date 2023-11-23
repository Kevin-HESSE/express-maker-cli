import { Question } from './Question';

/**
 * Class related to the number type for prompts
 */
export class NumberQuestion extends Question {
  public initial: number;

  /**
   * @param {String} name The key of the response
   * @param {String} message The message to display
   * @param {Number} initialValue The default value
   */
  constructor(name: string, message: string, initialValue: number){
    super('number', name, message);
    this.initial = initialValue;
  }
};