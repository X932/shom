import axios from 'axios';
import { getToken } from '@utils';
import { BACKEND_API } from '@env';

async function getTokenFromStorage() {
  return await getToken();
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_API,
  headers: {
    Authorization: 'Bearer ' + getTokenFromStorage(),
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
