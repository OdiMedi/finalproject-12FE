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

        Cookies.set('accesstoken', accessToken);
        Cookies.set('refreshtoken', refreshToken);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    kakaoHandle();
  }, []);

  return <div>KakaoAuthRedirect</div>;
};

export default KakaoAuthRedirect;
