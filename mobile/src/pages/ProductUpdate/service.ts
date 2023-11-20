import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';
import { IUpdateProductForm } from './interface';

interface IUpdateProductAPIParams {
  product: IUpdateProductForm;
  file: any;
  setIsLoading: (state: boolean) => void;
  successResponseHandler: () => void;
}

const uploadImage = async (file: any) => {
  if (file != null) {
    const formData = new FormData();
    formData.append('name', 'Image New');
    formData.append('file', file);
    const { data } = await axiosInstance<IResponseWrapper<string>>('/medias', {
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

export const updateProductAPI = async (params: IUpdateProductAPIParams) => {
  const { setIsLoading, successResponseHandler, file, product } = params;
  try {
    // todo - delete old photo (files/) before upload if set new photo
    // const filePath = await uploadImage(file);
    const filePath = file.uri;

    if (!filePath) {
      return;
    }

    const { data } = await axiosInstance<IResponseWrapper>({
      method: 'PUT',
      url: '/products',
      data: { ...product, imgPath: filePath },
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
