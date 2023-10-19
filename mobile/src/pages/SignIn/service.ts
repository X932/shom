import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { removeToken, saveToken, showErrorToast } from '@utils';
import { ISignInForm } from './interface';

interface ISignInAPIParams {
  signInCredentials: ISignInForm;
  dispatchSignIn: (phoneNumber: string) => void;
}

export const signInAPI = async ({
  signInCredentials,
  dispatchSignIn,
}: ISignInAPIParams) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<string>>({
      method: 'POST',
      url: '/auth/sign-in',
      data: signInCredentials,
    });
    await removeToken();
    saveToken(data.payload);
    dispatchSignIn(signInCredentials.phone);
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  }
};
