import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { BACKEND_API } from '@env';
import { getToken, removeToken, showErrorToast } from '@utils';
import { IResponseWrapper } from '@interfaces';

enum HTTP_STATUS {
  Unauthorized = 401,
  Forbidden = 403,
}

async function getTokenFromStorage() {
  return 'Bearer ' + (await getToken());
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    config.headers.authorization = await getTokenFromStorage();
    return config;
  },
  function (error: AxiosError<IResponseWrapper>) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<IResponseWrapper>) => {
    switch (error.response?.status) {
      case HTTP_STATUS.Unauthorized:
        showErrorToast('Вы не авторизованы');
        await removeToken();
        break;
      case HTTP_STATUS.Forbidden:
        showErrorToast('У вас нет доступа');
        break;
      default:
        break;
    }
    throw new Error(error.response?.data.message || 'Произошла ошибка');
  },
);
