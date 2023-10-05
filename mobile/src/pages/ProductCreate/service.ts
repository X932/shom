import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';

interface ICreateProductAPIParams {
  title: string;
  size?: number;
  description: string;
  price?: number;
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
  const { setIsLoading, successResponseHandler, file, ...payload } = params;
  try {
    const filePath = await uploadImage(file);

    if (!filePath) {
      return;
    }
    // refactoring
    const details = [
      {
        size: payload.size,
        price: { amount: payload.price },
      },
    ];
    // /refactoring
    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'POST',
      url: '/products',
      data: { ...payload, imgPath: filePath, details: details },
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
