import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast } from '@utils';
import { IProduct } from './interface';

interface IGetProductsAPIParams {
  successResponseHandler: (data: IProduct[]) => void;
  setIsLoading: (state: boolean) => void;
}

export const getProductsAPI = async ({
  successResponseHandler,
  setIsLoading,
}: IGetProductsAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<IProduct[]>>({
      method: 'GET',
      url: '/products',
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
