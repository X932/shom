import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';

interface IDeleteProductAPIParams {
  successResponseHandler: () => void;
  errorResponseHandler: () => void;
  setIsLoading: (state: boolean) => void;
  id: number;
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
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};
