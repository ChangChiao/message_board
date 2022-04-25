import axios from 'axios';

const service = axios.create({});

service.interceptors.request.use(
  (config) => {
    const params = config.params;
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
    return response.data;
  },
  (error) => {
    const { status } = error.response;
    console.log(`error--${status}`, 'error');
    return Promise.reject(error);
  }
);

export default service;
