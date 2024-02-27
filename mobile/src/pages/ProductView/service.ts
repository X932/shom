import { axiosInstance } from '@axios-instance';
import { IResponseWrapper, IProduct } from '@interfaces';
import { httpExceptionHandler, showSuccessToast } from '@utils';

interface IDeleteProductAPIParams {
  successResponseHandler: () => void;
  errorResponseHandler: () => void;
  setIsLoading: (state: boolean) => void;
  id: number;
}

interface IUpdateProductAPIParams
  extends Omit<
    IDeleteProductAPIParams,
    'successResponseHandler' | 'errorResponseHandler'
  > {
  successResponseHandler: (product: IProduct) => void;
}

enum Endpoints {
  PRODUCTS = '/products',
}

export const deleteProductAPI = async ({
  successResponseHandler,
  errorResponseHandler,
  setIsLoading,
  id,
}: IDeleteProductAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'DELETE',
      url: Endpoints.PRODUCTS,
      params: {
        id: id,
      },
    });
    showSuccessToast(data.message);
    successResponseHandler();
  } catch (error: any) {
    errorResponseHandler();
    httpExceptionHandler(error);
  } finally {
    setIsLoading(false);
  }
};

export const getProductAPI = async ({
  successResponseHandler,
  setIsLoading,
  id,
}: IUpdateProductAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<IProduct>>({
      method: 'GET',
      url: Endpoints.PRODUCTS + '/' + id,
    });
    successResponseHandler(data.payload);
  } catch (error: any) {
    httpExceptionHandler(error);
  } finally {
    setIsLoading(false);
  }
};
