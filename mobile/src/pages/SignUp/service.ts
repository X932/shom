import { axiosInstance } from '@axios-instance';
import { ISignUpForm } from './interface';

interface ISignUpAPIParams {
  credentials: ISignUpForm;
  dispatchSignUp: (phone: string) => void;
  showErrorToast: (message: string) => void;
}

export const signUpAPI = async ({
  credentials,
  dispatchSignUp,
  showErrorToast,
}: ISignUpAPIParams) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/auth/sign-up',
      data: credentials,
    });
    dispatchSignUp(credentials.phone);
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  }
};
