import { ISignUpForm } from './interface';

export const validationSchema: ISignUpForm = {
  password: {
    value: '',
    maxLength: 20,
    minLength: 4,
    isValid: false,
    isTouched: false,
    isActive: false,
  },
};
