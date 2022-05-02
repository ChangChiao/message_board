import api from './http';
import { API_URL, IMGUR_URL } from '../../global/constant';
const getAuthorizationHeader = () => {};

const getAuthorizationImgHeader = () => {
  // eslint-disable-next-line camelcase
  // const access_token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'multipart/form-data',
    // eslint-disable-next-line camelcase
    authorization: 'Bearer AUTHORIZATION'
  };
};

export const getAPIData = (path, sendData = {}) => {
  const config = {
    headers: getAuthorizationHeader(),
    params: sendData
  };
  return api.get(API_URL + path, config);
};

export const postAPIData = (path, sendData = {}) => {
  const config = {
    headers: getAuthorizationHeader(),
    params: sendData
  };
  return api.post(API_URL + path, config);
};

export const postFormData = (sendData = {}) => {
  const config = {
    headers: getAuthorizationImgHeader(),
    params: sendData
  };
  console.log('#####RERTTR', IMGUR_URL, config);
  return api.post(IMGUR_URL, config);
};

// export const postFormData2 = (sendData = {}) => {
//   // const config = {
//   //   headers: getAuthorizationImgHeader(),
//   //   params: sendData
//   // };
//   console.log('#####RERTTR', IMGUR_URL, sendData);
//   return fetch(IMGUR_URL, { method: 'post', body: sendData });
// };
