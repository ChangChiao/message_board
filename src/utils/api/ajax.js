import api from '../utils/http';
import { API_URL } from '../../global/constant';
const getAuthorizationHeader = () => {};

export const getData = () => {
  const config = {
    headers: getAuthorizationHeader(),
    params: {}
  };
  return api.get(API_URL + '/test', config);
};
