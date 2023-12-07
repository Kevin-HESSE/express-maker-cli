import { UserAnswers } from '@/interfaces/UserConfiguration';

export interface InitOptions {
  template?: string
}

export interface Template {
  name: string,
  userConfiguration: UserAnswers
}