import axios from 'axios';
import Cookies from 'js-cookie';
import axiosRetry from 'axios-retry';
import { createRoot } from 'react-dom/client';
import LoginSnackBar from '../components/login/LoginSnackBar';
import ModalPortal from '../shared/ModalPortal';

const API_URL = process.env.REACT_APP_SERVER_URL;
const api = axios.create({
  baseURL: API_URL,
});

axiosRetry(api, {
  retries: 2, // 최대 재시도 횟수
  retryDelay: retryCount => retryCount * 1000, // 재시도 간격 (밀리초)
  shouldResetTimeout: true, // 요청 시마다 타임아웃 초기화
  retryCondition: error => {
    const errorCode = error?.response?.data?.errorCode;
    return errorCode === 'EXPIRED_ACCESS_TOKEN'; // 재시도 조건 설정
  },
});
axiosRetry(api, {
  retries: 1, // 최대 재시도 횟수
  retryDelay: retryCount => retryCount * 1000, // 재시도 간격 (밀리초)
  shouldResetTimeout: true, // 요청 시마다 타임아웃 초기화
  retryCondition: error => {
    const errorCode = error?.response?.data?.errorCode;
    return errorCode === 'EXPIRED_REFRESH_TOKEN'; // 재시도 조건 설정
  },
});

api.interceptors.request.use(
  config => {
    const accesstoken = Cookies.get('accesstoken');
    const refreshtoken = Cookies.get('refreshtoken');

    if (accesstoken) {
      config.headers.ACCESS_KEY = `Bearer ${accesstoken}`;
      config.headers.REFRESH_KEY = `Bearer ${refreshtoken}`;
    }

    return config;
  },
  error => {
    // console.log('api요청전에러::::', error);
    return Promise.reject(error);
  }
);

const modalRoot = document.getElementById('modal-root');
const root = createRoot(modalRoot);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log(error);

    const {
      config,
      config: { url, method },
      response: {
        data: { errorCode, message },
      },
    } = error;
    // const contentType = error.config.headers['Content-Type'];
    // console.log('AxiosError', AxiosError);
    if (errorCode === 'EXPIRED_ACCESS_TOKEN') {
      const refresh = Cookies.get('refreshtoken');
      // const access = Cookies.get('accesstoken');

      const originReq = config;

      await api
        .get('/api/bookmark', {
          headers: { REFRESH_KEY: `Bearer ${refresh}` },
          // headers: { ACCESS_KEY: `Bearer ${access}` },
        })
        .then(response => {
          const { access_key: newAccessToken } = response.headers;
          Cookies.set('accesstoken', newAccessToken.split(' ')[1]);
        });

      const newAccessToken = Cookies.get('accesstoken');
      originReq.headers.ACCESS_KEY = `Bearer ${newAccessToken}`;

      return api(originReq);
    }

    if (errorCode === 'EXPIRED_REFRESH_TOKEN') {
      Cookies.remove('accesstoken');
      Cookies.remove('refreshtoken');
      if (!modalRoot.hasChildNodes()) {
        root.render(
          <ModalPortal>
            <LoginSnackBar type="expire" />
          </ModalPortal>
        );
      }
      setTimeout(() => {
        window.location.replace('/login');
      }, 1000);
    }

    if (errorCode === 'DUPLICATED_MEMBER') {
      console.log(error);
      // return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
