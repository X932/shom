import { AxiosError } from 'axios';
import { IResponseWrapper } from '../interfaces/responseWrapper';
import { showErrorToast } from './errorToast';

export const httpExceptionHandler = (error: AxiosError<IResponseWrapper>) => {
  if (error.response) {
    showErrorToast(error.response.data.message);
  } else {
    showErrorToast(error.message);
  }
};
