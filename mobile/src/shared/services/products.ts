import { axiosInstance } from '@axios-instance';
import { IResponseWrapper, IProduct, TProductParams } from '@interfaces';
import { showErrorToast } from '@utils';

interface IGetProductsAPIParams {
  successResponseHandler: (data: IProduct[]) => void;
  setIsLoading: (state: boolean) => void;
  params?: Partial<TProductParams>;
}

enum Endpoints {
  PRODUCTS = '/products',
}

export const getProductsAPI = async ({
  successResponseHandler,
  setIsLoading,
  params,
}: IGetProductsAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<IProduct[]>>({
      method: 'GET',
      url: Endpoints.PRODUCTS,
      params: params,
    });
    successResponseHandler(data.payload);
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};
