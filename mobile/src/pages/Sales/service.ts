import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { httpExceptionHandler, showSuccessToast } from '@utils';
import { ISaleRequestBody } from './interface';

interface ISaleProductsAPIParams {
  order: ISaleRequestBody;
  setIsLoading: (state: boolean) => void;
  successResponseHandler: () => void;
}

enum Endpoints {
  INVOICE = '/invoices',
}

export const saleProducts = async ({
  order,
  setIsLoading,
  successResponseHandler,
}: ISaleProductsAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: Endpoints.INVOICE,
      data: {
        ...order,
        accountId: Number(order.accountId),
        discount: Number(order.discount),
      },
    });

    showSuccessToast(data.message);
    successResponseHandler();
  } catch (error: any) {
    httpExceptionHandler(error);
  } finally {
    setIsLoading(false);
  }
};
