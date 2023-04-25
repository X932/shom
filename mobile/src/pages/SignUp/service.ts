import { axiosInstance } from '@axios-instance';

interface ISignUpAPIArgs {
  phoneNumber: string;
  password: string;
  dispatchSignUp: () => void;
  showErrorToast: (message: string) => void;
}

export const signUpAPI = async ({
  phoneNumber,
  password,
  dispatchSignUp,
  showErrorToast,
}: ISignUpAPIArgs) => {
  try {
    await axiosInstance({
      method: 'POST',
      url: '/auth/sign-up',
      data: {
        phone: phoneNumber,
        password: password,
      },
    });
    dispatchSignUp();
  } catch (error: any) {
    if (error.response) {
      showErrorToast(error.response.data.message);
    } else {
      showErrorToast(error.message);
    }
  }
};
