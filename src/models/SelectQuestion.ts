import { Question } from './Question';

import { SelectChoices } from '@/interfaces/SelectChoices';

export class SelectQuestion extends Question {
  public choices: SelectChoices[];
  public initial: number;

  constructor( name: string, message: string, choices: SelectChoices[], initialValue: number = 1) {
    super('select', name, message);
    this.choices = choices;
    this.initial = initialValue;
  }
}