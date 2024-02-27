import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { httpExceptionHandler, showErrorToast, showSuccessToast } from '@utils';
import { ICreateProductForm } from './interface';

interface ICreateProductAPIParams {
  product: ICreateProductForm;
  file: any;
  setIsLoading: (state: boolean) => void;
  successResponseHandler: () => void;
}

const uploadImage = async (file: any) => {
  if (file != null) {
    const formData = new FormData();
    formData.append('name', 'Image New');
    formData.append('file', file);
    const { data } = await axiosInstance<IResponseWrapper<string>>('/media', {
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.payload;
  } else {
    showErrorToast('Выберите фото');
  }
};

export const createProductAPI = async (params: ICreateProductAPIParams) => {
  const { setIsLoading, successResponseHandler, file, product } = params;
  try {
    const filePath = await uploadImage(file);

    if (!filePath) {
      return;
    }

    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: '/products',
      data: { ...product, imgPath: filePath },
    });
    showSuccessToast(data.message);
    successResponseHandler();
  } catch (error: any) {
    httpExceptionHandler(error);
  } finally {
    setIsLoading(false);
  }
};
