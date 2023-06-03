import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_SERVER_URL;
const api = axios.create({
  baseURL: API_URL,
});
api.interceptors.request.use(
  config => {
    const accesstoken = Cookies.get('accesstoken');
    if (accesstoken) {
      config.headers.ACCESS_KEY = `Bearer ${accesstoken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // ACCESS TOKEN 만료 로직(추후 수정 예정 결정된것이 없음)
    const {
      config,
      config: { url, method },
      response: {
        data: { errorCode, message },
      },
    } = error;

    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      // 에러코드 확인
      const refresh = Cookies.get('refreshtoken');
      const originReq = config;
      const { headers } = await api({
        url,
        method,
        headers: { REFRESH_KEY: refresh },
      });

      const { ACCESS_KEY: newAccessToken, REFRESH_KEY: newRefreshToken } =
        headers;
      Cookies.set('accesstoken', newAccessToken);
      Cookies.set('refreshtoken', newRefreshToken);

      originReq.headers.ACCESS_KEY = `Bearer ${newAccessToken}`;

      return axios(originReq);
    }

    return Promise.reject(error);
  }
);

export default api;
