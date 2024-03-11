import { AxiosError } from 'axios';
import { showErrorToast } from './errorToast';
import { IResponseWrapper } from '../interfaces/responseWrapper';

export const httpExceptionHandler = (error: AxiosError<IResponseWrapper>) => {
  if (error.response) {
    showErrorToast(error.response.data.message);
  } else {
    showErrorToast(error.message);
  }
};
