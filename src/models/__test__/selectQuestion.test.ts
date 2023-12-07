import { SelectQuestion } from '../SelectQuestion';

import { displayHelper } from '@/helpers/displayHelper';
import { SelectChoices } from '@/interfaces/SelectChoices';

const choices: SelectChoices[] = [
  {
    title: 'npm',
    value: 'npm',
  },
  {
    title: 'yarn',
    value: 'yarn',
  },
];

describe('test the implementation of the selectQuestion class', () => {
  it('create an instance with the correct property', () => {
    const select = new SelectQuestion(
      'packageManager', 'Which package manager do you want to use ?', choices);

    expect(select).toHaveProperty('type', 'select');
    expect(select).toHaveProperty('name', 'packageManager');
    expect(select).toHaveProperty('message', displayHelper.prompt('Which package manager do you want to use ?'));
    expect(select).toHaveProperty('choices', choices);
    expect(select).toHaveProperty('initial', 1);
  });
});