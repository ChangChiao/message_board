import api from './http';
import { API_URL, IMGUR_URL } from '../../global/constant';
const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  return {
    authorization: `Bearer ${token}`
  };
};

const getAuthorizationImgHeader = () => {
  // eslint-disable-next-line camelcase
  const access_token = localStorage.getItem('access_token');
  // const access_token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'multipart/form-data',
    // eslint-disable-next-line camelcase
    authorization: `Bearer ${access_token}`
  };
};

export const getAPIData = (path) => {
  // const config = {
  //   headers: getAuthorizationHeader(),
  //   params: sendData
  // };
  const headers = getAuthorizationHeader();
  return api.get(API_URL + path, { headers });
};

export const postAPIData = (path, sendData = {}) => {
  const headers = getAuthorizationHeader();
  return api.post(API_URL + path, sendData, { headers });
};

export const patchAPIData = (path, sendData = {}) => {
  const headers = getAuthorizationHeader();
  return api.patch(API_URL + path, sendData, { headers });
};

export const postFormData = (sendData = {}) => {
  const headers = getAuthorizationImgHeader();
  console.log('#####IMGUR', sendData, headers);
  return api.post(IMGUR_URL, sendData, { headers });
};
