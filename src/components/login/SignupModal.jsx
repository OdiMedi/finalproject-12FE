import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axios';
import {
  LoginIconDiv,
  LoginTitleDiv,
  LoginInput,
  LoginBtn,
  TextBnt,
  KakakoLink,
} from './LoginModal';

const SignupModal = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const { email, nickname, password } = inputValue;
  const inputChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const submitSignup = async () => {
    await api.post('/user/signup', inputValue);
  };
  const redirectLogin = () => {
    navigate('/login');
  };
  return (
    <SignupContainer>
      <LoginIconDiv />
      <LoginTitleDiv />
      <LoginInput
        name="nickname"
        value={nickname}
        onChange={inputChange}
        type="text"
        placeholder="닉네임을 입력하세요."
      />
      <LoginInput
        name="email"
        value={email}
        onChange={inputChange}
        type="text"
        placeholder="이메일을 입력하세요."
      />
      <LoginInput
        name="password"
        value={password}
        onChange={inputChange}
        type="password"
        placeholder="비밀번호를 입력하세요."
      />
      <LoginBtn type="button" onClick={submitSignup}>
        회원가입
      </LoginBtn>
      <TextBnt onClick={redirectLogin}>로그인 창으로 돌아가기</TextBnt>
      <KakakoLink />
    </SignupContainer>
  );
};

export default SignupModal;

const SignupContainer = styled.div`
  width: 500px;
  height: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
`;
