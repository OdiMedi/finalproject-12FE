import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import KAKAO_AUTH_URL from './kakaoAuth';

const LoginModal = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    nickname: '',
    password: '',
  });

  const { nickname, password } = inputValue;
  const inputChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const submitLogin = async () => {
    try {
      const response = await api.post('/user/login', inputValue);

      const accessHeader = response?.headers.get('ACCESS_KEY');
      const refreshHeader = response?.headers.get('REFRESH_KEY');

      const accessToken = accessHeader?.split(' ')[1];
      const refreshToken = refreshHeader?.split(' ')[1];

      Cookies.set('accesstoken', accessToken);
      Cookies.set('refreshtoken', refreshToken);
      setInputValue({
        nickname: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const goSignin = () => {
    navigate('/signup');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '560px',
        height: '620px',
        margin: '0 auto',
        border: '1px solid black',
      }}
    >
      <input
        name="nickname"
        value={nickname}
        onChange={inputChange}
        type="text"
        placeholder="nickname"
      />
      <input
        name="password"
        value={password}
        onChange={inputChange}
        type="password"
        placeholder="password"
      />
      <button onClick={submitLogin} type="button">
        Login
      </button>

      <button onClick={goSignin} type="button">
        sign in
      </button>

      <a href={KAKAO_AUTH_URL}>카카오 소셜</a>
    </div>
  );
};

export default LoginModal;

/* <카카오 소셜 로그인 flow>
프론트엔드로 부터 인가 코드를 전달 받는다.
전달 받은 인가 코드를 가지고, 카카오 인증 서버에 토큰 발급 요청을 보낸다.
전달 받는 카카오 토큰을 가지고 카카오 리소스 서버에 유저 정보 요청을 보낸다.
전달 받은 유저 정보를 가지고 회원가입 중복 여부를 거친다.
중복이라면(카카오로 로그인한적있는 유저), jwt 토큰을 발급하여 프론트엔드에 전달하고, 중복이 아니라면 새로운 유저로 가입을 시킨 후, jwt 토큰을 발급하여 프론트 엔드에 전달한다. */
