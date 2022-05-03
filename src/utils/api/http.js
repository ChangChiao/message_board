import axios from 'axios';

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
    return Promise.reject(error);
  }
);

export default service;
