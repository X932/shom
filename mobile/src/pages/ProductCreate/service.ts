import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';

interface ICreateProductAPIParams {
  title: string;
  imgPath: string;
  size: number;
  description: string;
  price: number;
  setIsLoadind: (state: boolean) => void;
}

export const createProductAPI = async (params: ICreateProductAPIParams) => {
  const { setIsLoadind, ...payload } = params;
  try {
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: '/products',
      data: payload,
    });
    showSuccessToast(data.message);
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  } finally {
    setIsLoadind(false);
  }
};
