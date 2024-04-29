import { ConfirmQuestion } from '../ConfirmQuestion';

import { displayHelper } from '@/helpers/displayHelper';

describe('test the implementation of the ConfirmQuestion class', () => {
  it('create an instance with the correct property', () => {
    const confirm = new ConfirmQuestion('isTypescript', 'Do you want to use Typescript ?');

    expect(confirm).toHaveProperty('type', 'confirm')
    expect(confirm).toHaveProperty('name', 'isTypescript')
    expect(confirm).toHaveProperty('message', displayHelper.prompt('Do you want to use Typescript ?'))
  })
})