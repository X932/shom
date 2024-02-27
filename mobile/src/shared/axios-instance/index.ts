import { IResponseWrapper } from '@interfaces';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { getToken, removeToken, showErrorToast } from '@utils';
import { BACKEND_API } from '@env';

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
        return;
      case HTTP_STATUS.Forbidden:
        showErrorToast('У вас нет доступа');
        return;
      default:
        showErrorToast(error.response?.data.message || '');
        return;
    }
  },
);
