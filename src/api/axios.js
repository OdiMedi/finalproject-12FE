import axios from 'axios';
import Cookies from 'js-cookie';
import axiosRetry from 'axios-retry';

const API_URL = process.env.REACT_APP_SERVER_URL;
const api = axios.create({
  baseURL: API_URL,
});

axiosRetry(api, {
  retries: 1, // 최대 재시도 횟수
  retryDelay: retryCount => retryCount * 1000, // 재시도 간격 (밀리초)
  shouldResetTimeout: true, // 요청 시마다 타임아웃 초기화
  retryCondition: error => {
    const errorCode = error?.response?.data?.errorCode;
    return errorCode === 'EXPIRED_ACCESS_TOKEN'; // 재시도 조건 설정
  },
});

api.interceptors.request.use(
  config => {
    const accesstoken = Cookies.get('accesstoken');
    if (accesstoken) {
      config.headers.ACCESS_KEY = `Bearer ${accesstoken}`;
    }
    console.log('서버요청한다:::::::::', config);
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
    console.log(error);
    // ACCESS TOKEN 만료 로직(추후 수정 예정 결정된것이 없음)
    const {
      config,
      config: { url, method },
      response: {
        data: { errorCode, message },
      },
    } = error;
    const contentType = error.config.headers['Content-Type'];

    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      // 에러코드 확인
      console.log('ContentType:::::::::', contentType);
      const refresh = Cookies.get('refreshtoken');
      const originReq = config;
      const { headers } = await api({
        url,
        method,
        headers: { REFRESH_KEY: refresh, 'Content-Type': contentType },
        data: { ...originReq.data },
      });

      const { ACCESS_KEY: newAccessToken, REFRESH_KEY: newRefreshToken } =
        headers;
      Cookies.set('accesstoken', newAccessToken);
      Cookies.set('refreshtoken', newRefreshToken);

      originReq.headers.ACCESS_KEY = `Bearer ${newAccessToken}`;

      return api(originReq);
    }

    return Promise.reject(error);
  }
);

export default api;
