import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

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
    </div>
  );
};

export default LoginModal;
