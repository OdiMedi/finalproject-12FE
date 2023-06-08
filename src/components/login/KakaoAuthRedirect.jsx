import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const KakaoAuthRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const kakaoHandle = async () => {
    await api
      .get(`/user/signin/kakao?code=${code}`)
      .then(res => {
        const accessToken = res.headers.get('ACCESS_KEY').split(' ')[1];
        const refreshToken = res.headers.get('REFRESH_KEY').split(' ')[1];
        console.log('kakaoRes.data::::', res);
        localStorage.setItem('nickname', res.data.nickname);
        Cookies.set('authorization', res.data.authorization);
        Cookies.set('accesstoken', accessToken);
        Cookies.set('refreshtoken', refreshToken);
        navigate('/');
        console.log('authorization::::', Cookies.get('authorization'));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    kakaoHandle();
  }, []);

  return <div></div>;
};

export default KakaoAuthRedirect;
