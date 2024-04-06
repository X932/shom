import { Dispatch, SetStateAction } from 'react';
import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { httpExceptionHandler, showSuccessToast } from '@utils';
import { ITransactionCreateForm } from './interface';

export interface ICreateTransactionAPIParams {
  payload: ITransactionCreateForm;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  successResponseHandler: () => void;
}

enum Endpoints {
  TRANSACTION = '/accounts-history',
}

export const createTransactionAPI = async ({
  payload,
  setIsLoading,
  successResponseHandler,
}: ICreateTransactionAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: Endpoints.TRANSACTION,
      data: { ...payload, amount: +payload.amount },
    });
    showSuccessToast(data.message);
    successResponseHandler();
  } catch (error: any) {
    httpExceptionHandler(error);
  } finally {
    setIsLoading(false);
  }
};
