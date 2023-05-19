import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast } from '@utils';
import { IProduct } from './interface';

interface IGetProductsAPIParams {
  responseHandler: (data?: IProduct[]) => void;
}

export const getProductsAPI = async ({
  responseHandler,
}: IGetProductsAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<IProduct[]>>({
      method: 'GET',
      url: '/products',
    });
    responseHandler(data.payload);
  } catch (error: any) {
    responseHandler();
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  }
};
