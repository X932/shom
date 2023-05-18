import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { removeToken, saveToken, showErrorToast } from '@utils';

interface ISignInAPIParams {
  phoneNumber: string;
  password: string;
  dispatchSignIn: () => void;
}

export const signInAPI = async ({
  phoneNumber,
  password,
  dispatchSignIn,
}: ISignInAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<string>>({
      method: 'POST',
      url: '/auth/sign-in',
      data: {
        phone: phoneNumber,
        password: password,
      },
    });
    await removeToken();
    saveToken(data.payload);
    dispatchSignIn();
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  }
};
