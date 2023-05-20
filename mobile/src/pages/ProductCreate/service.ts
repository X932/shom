import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';

interface ICreateProductAPIParams {
  title: string;
  imgPath: string;
  size: number;
  description: string;
  price: number;
  setIsLoading: (state: boolean) => void;
  successResponseHandler: () => void;
}

export const createProductAPI = async (params: ICreateProductAPIParams) => {
  const { setIsLoading, successResponseHandler, ...payload } = params;
  try {
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: '/products',
      data: payload,
    });
    showSuccessToast(data.message);
    successResponseHandler();
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
