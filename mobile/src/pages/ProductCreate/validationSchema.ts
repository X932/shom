import { ICreateProductForm } from './interface';

export const validationSchema: ICreateProductForm = {
  title: {
    value: '',
    maxLength: 40,
    minLength: 1,
    isValid: false,
    isTouched: false,
    isActive: false,
  },
  description: {
    value: '',
    maxLength: 100,
    isValid: true,
    isTouched: false,
    isActive: false,
  },
  size: {
    value: '',
    maxLength: 20,
    minLength: 1,
    isValid: false,
    isTouched: false,
    isActive: false,
    regexp: /^\d*$/,
  },
  price: {
    value: '',
    maxLength: 10,
    minLength: 1,
    isValid: false,
    isTouched: false,
    isActive: false,
    regexp: /^\d*$/,
  },
  imgPath: {
    value: '/test',
    isValid: true,
    isTouched: false,
    isActive: false,
  },
};
