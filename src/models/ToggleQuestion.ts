import { Question } from './Question';

export class ToggleQuestion extends Question {
  public initial: boolean;
  public active: string;
  public inactive: string;
  /**
   * @param {String} name The key of the response
   * @param {String} message The message to display
   * @param {Boolean} initialValue The default value
   */
  constructor(name: string, message: string, initialValue: boolean){
    super('toggle', name, message);
    this.initial = initialValue;
    this.active = 'yes';
    this.inactive = 'no';
  }
};