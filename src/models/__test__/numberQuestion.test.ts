import { NumberQuestion } from '../NumberQuestion';
import { displayHelper } from '../../helpers/displayHelper';

describe('test the implementation of the NumberQuestion class', () => {
  it('create an instance with the correct property', () => {
    const confirm = new NumberQuestion('defaultPort', 'Which default port do you want to use ?', 3000);

    expect(confirm).toHaveProperty('type', 'number')
    expect(confirm).toHaveProperty('name', 'defaultPort')
    expect(confirm).toHaveProperty('message', displayHelper.prompt('Which default port do you want to use ?'))
    expect(confirm).toHaveProperty('initial', 3000)
  })
})