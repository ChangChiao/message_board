import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
const toast = useToast();
const router = useRouter();
const service = axios.create({});
service.interceptors.request.use(
  (config) => {
    console.log('config', config);
    const params = config.data?.params;
    if (!params) {
      return config;
    }
    Object.keys(params).forEach((vo) => {
      if (!params[vo]) delete params[vo];
    });
    return config;
  },
  (error) => {
    return error;
  }
);

service.interceptors.response.use(
  (response) => {
    console.log('response', response.status);
    return response.data;
  },
  (error) => {
    const { status } = error.response;
    console.log(`error--${status}`, 'error');
    console.warn(' error.response', error.response);

    // eslint-disable-next-line prefer-promise-reject-errors
    const errorMsg = error.response?.data.message?.message;
    errorMsg && toast.error(errorMsg);
    if (status === 401) {
      localStorage.setItem('token', '');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default service;
