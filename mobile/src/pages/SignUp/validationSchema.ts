import { ISignUpForm } from './interface';

export const validationSchema: ISignUpForm = {
  phone: {
    value: '',
    exactLength: 9,
    regexp: /^\d*$/,
    isValid: false,
    isTouched: false,
    isActive: false,
  },
  password: {
    value: '',
    maxLength: 20,
    minLength: 4,
    isValid: false,
    isTouched: false,
    isActive: false,
  },
};
