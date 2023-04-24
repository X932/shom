import { axiosInstance } from '@axios-instance';
import { IResponseWrapper } from '@interfaces';
import { saveToken } from '@utils';

interface ISignInAPIArgs {
  phoneNumber: string;
  password: string;
  dispatchLogIn: () => void;
  showErrorToast: (message: string) => void;
}

export const signInAPI = async ({
  phoneNumber,
  password,
  dispatchLogIn,
  showErrorToast,
}: ISignInAPIArgs) => {
  try {
    const { data } = await axiosInstance<IResponseWrapper<string>>({
      method: 'POST',
      url: '/auth/sign-in',
      data: {
        phone: phoneNumber,
        password: password,
      },
    });
    saveToken(data.payload);
    dispatchLogIn();
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    }
  }
};
