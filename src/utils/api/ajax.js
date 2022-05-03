import api from './http';
import { API_URL, IMGUR_URL } from '../../global/constant';
const getAuthorizationHeader = () => {};

const getAuthorizationImgHeader = () => {
  console.log(
    'process.env.IMGUR_ACCESS_TOKEN',
    process.env.VUE_APP_IMGUR_ACCESS_TOKEN
  );
  // eslint-disable-next-line camelcase
  // const access_token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'multipart/form-data',
    // eslint-disable-next-line camelcase
    authorization: `Bearer ${process.env.VUE_APP_IMGUR_ACCESS_TOKEN}`
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
  const headers = getAuthorizationImgHeader();
  console.log('#####RERTTR', sendData, headers);
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
