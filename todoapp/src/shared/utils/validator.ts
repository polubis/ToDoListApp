export class Validator {
  private _error: string = '';

  private setErrors(newError: string): Validator {
    this._error = this._error || newError;
    return this;
  }

  constructor(public _value: string = '') {}

  static one = (validator: Validator): string => validator._error;

  required = () => this.setErrors(this._value === '' ? `Field is required` : '');

  min = (limit: number) =>
    this.setErrors(this._value.length < limit && this._value.length !== 0 ? `Field must have ${limit} or more characters` : '');

  max = (limit: number) => this.setErrors(this._value.length > limit ? `Field must have ${limit} or less characters` : '');

  onlyText = () => this.setErrors(/^[a-z 0-9]+$/i.test(this._value) ? '' : 'Invalid format');
}
