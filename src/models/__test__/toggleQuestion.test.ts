import { ToggleQuestion } from '../ToggleQuestion';
import { displayHelper } from '../../helpers/displayHelper';

describe('test the implementation of the ToggleQuestion class', () => {
  it('create an instance with the correct property', () => {
    const confirm = new ToggleQuestion('isTypescript', 'Do you want to use Typescript ?', true);

    expect(confirm).toHaveProperty('type', 'toggle')
    expect(confirm).toHaveProperty('name', 'isTypescript')
    expect(confirm).toHaveProperty('message', displayHelper.prompt('Do you want to use Typescript ?'))
    expect(confirm).toHaveProperty('initial', true)
    expect(confirm).toHaveProperty('active', 'yes')
    expect(confirm).toHaveProperty('inactive', 'no')
  })
})