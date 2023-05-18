import axios from 'axios';
import { getToken } from '@utils';
import { BACKEND_API } from '@env';

async function getTokenFromStorage() {
  return 'Bearer ' + (await getToken());
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    config.headers.authorization = await getTokenFromStorage();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
