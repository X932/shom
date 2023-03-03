import { IInputValidationOptions } from '@interfaces';

type FieldValidationFnType = (options: IInputValidationOptions) => boolean;

export const isInputValid: FieldValidationFnType = ({
  regexp,
  maxLength,
  minLength,
  exactLength,
  value,
}) => {
  let isValid = true;

  if (value === undefined) {
    return false;
  }

  if (regexp && typeof value === 'string' && isValid) {
    isValid = regexp.test(value);
  }

  if (minLength !== undefined && isValid) {
    isValid = value.length >= minLength;
  }

  if (maxLength !== undefined && isValid) {
    isValid = value.length <= maxLength;
  }

  if (exactLength !== undefined && isValid) {
    isValid = value.length === exactLength;
  }
  return isValid;
};
