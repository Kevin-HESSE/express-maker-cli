import { PromptObject, PromptType } from 'prompts';

import { displayHelper } from '@/helpers/displayHelper';

/**
 * Class related to a question for prompts, only used to be extended.
 */
export abstract class Question implements PromptObject<string>{
  public type: PromptType;
  public name: string;
  public message: string;

  protected constructor( type: PromptType, name: string, message: string){
    this.type = type;
    this.name = name;
    this.message = displayHelper.prompt(message);
  }
}