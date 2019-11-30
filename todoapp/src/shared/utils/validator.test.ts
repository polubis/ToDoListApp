import { Validator as V } from './validator';

describe('Validator', () => {
  it('should create Validator object properly', () => {
    expect(new V('example-value')).toBeTruthy();
  });
});
