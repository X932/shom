import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { showErrorToast, showSuccessToast } from '@utils';
import { IUpdateProductForm } from './interface';

interface IUpdateProductAPIParams {
  product: IUpdateProductForm;
  image: any;
  oldImagePath: string;
  setIsLoading: (state: boolean) => void;
  successResponseHandler: () => void;
}

const deleteImage = async (path: string) => {
  await axiosInstance<IResponseWrapper>('/media', {
    method: 'delete',
    data: {
      path: path,
    },
  });
};

const uploadImage = async (image: any) => {
  if (image != null) {
    const formData = new FormData();
    formData.append('file', image);
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

export const updateProductAPI = async (params: IUpdateProductAPIParams) => {
  const { setIsLoading, successResponseHandler, image, oldImagePath, product } =
    params;
  try {
    let filePath: string | undefined = image.uri;

    if (!image.uri?.includes('files/')) {
      await deleteImage(oldImagePath);
      filePath = await uploadImage(image);
    }

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
