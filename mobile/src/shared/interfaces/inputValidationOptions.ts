export interface IInputValidationOptions {
  value: string | string[];
  regexp?: RegExp;
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
}

export interface IInput extends IInputValidationOptions {
  isValid: boolean;
  isTouched: boolean;
}
