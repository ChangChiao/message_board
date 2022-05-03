import api from './http';
import { API_URL, IMGUR_URL } from '../../global/constant';
const getAuthorizationHeader = () => {};

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

export const getAPIData = (path, sendData = {}) => {
  // const config = {
  //   headers: getAuthorizationHeader(),
  //   params: sendData
  // };
  return api.get(API_URL + path);
};

export const postAPIData = (path, sendData = {}) => {
  const headers = getAuthorizationHeader();
  return api.post(API_URL + path, sendData, { headers });
};

export const postFormData = (sendData = {}) => {
  const headers = getAuthorizationImgHeader();
  console.log('#####IMGUR', sendData, headers);
  return api.post(IMGUR_URL, sendData, { headers });
};

// export const postFormData2 = (sendData = {}) => {
//   // const config = {
//   //   headers: getAuthorizationImgHeader(),
//   //   params: sendData
//   // };
//   console.log('#####RERTTR', IMGUR_URL, sendData);
//   return fetch(IMGUR_URL, { method: 'post', body: sendData });
// };
