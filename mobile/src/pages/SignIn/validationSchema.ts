import { ISignInForm } from './interface';

export const validationSchema: ISignInForm = {
  password: {
    value: '',
    maxLength: 20,
    minLength: 4,
    isValid: false,
    isTouched: false,
    isActive: false,
  },
};
