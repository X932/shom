export interface IInputValidationOptions<T = null> {
  value: T;
  regexp?: RegExp;
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
}

export interface IInput<T = string> extends IInputValidationOptions<T> {
  isValid: boolean;
  isTouched: boolean;
}
