import axios from 'axios';

const service = axios.create({});

service.interceptors.request.use(
  (config) => {
    if (config.data.headers['Content-Type'] === 'multipart/form-data') {
      return config;
    }
    const params = config.data.params;
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
