import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axios';
import { LoginBtn, TextBnt, KakakoLink } from './LoginModal';
import KAKAO_AUTH_URL from './kakaoAuth';
import LoginIconMain from '../../assets/loginIcon.png';
import LoginTitleMain from '../../assets/loginTitle.png';

const SignupModal = () => {
  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(true);
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const { email, nickname, password } = inputValue;

  const adminCheckHandle = e => {
    setIsAdmin(!isAdmin);
  };

  const changeEmail = e => {
    const { name, value } = e.target;
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (!emailRegExp.test(value)) {
      setEmailCheck(false);
    } else {
      setEmailCheck(true);
    }
  };
  const nicknameChange = e => {
    const { name, value } = e.target;
    const nicknameRegExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (!nicknameRegExp.test(value)) {
      setNicknameCheck(false);
    } else {
      setNicknameCheck(true);
    }
  };
  const passwordChange = e => {
    const { name, value } = e.target;
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,15}$/;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (!passwordRegExp.test(value)) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  };
  const adminCodeChange = e => {
    setAdminCode(e.target.value);
  };
  const submitSignup = async () => {
    try {
      if (!(emailCheck && nicknameCheck && passwordCheck)) {
        return;
      }
      await api.post('/user/signup', inputValue);
      navigate('/login');
    } catch (error) {
      console.log('sigunupValidation::::::::', error);
    }
  };
  const redirectLogin = () => {
    navigate('/login');
  };
  return (
    <SignupContainer>
      <SignUpIconDiv />
      <SignUpTitleDiv />
      <form autoComplete="off">
        <AdminCheckDiv>
          <AdminCheckBoxInput
            type="checkbox"
            value={isAdmin}
            onChange={adminCheckHandle}
          />
          <p>관리자 계정</p>
        </AdminCheckDiv>
        {isAdmin && (
          <SignUpInput
            name="adminCode"
            value={adminCode}
            onChange={adminCodeChange}
            type="text"
            placeholder="관리자 암호를 입력해주세요."
          />
        )}
        <SignUpInput
          name="nickname"
          value={nickname}
          onChange={nicknameChange}
          type="text"
          placeholder="닉네임을 입력하세요."
        />
        {!nicknameCheck && (
          <HelperTextP>
            닉네임은 한글, 영어(대소문자 구분), 숫자로 2~10자로 입력해주세요
          </HelperTextP>
        )}
        <SignUpInput
          name="email"
          value={email}
          onChange={changeEmail}
          type="text"
          placeholder="이메일을 입력하세요."
        />
        {!emailCheck && (
          <HelperTextP>이메일 형식에 맞춰주세요(@ . 포함)</HelperTextP>
        )}
        <SignUpInput
          name="password"
          value={password}
          onChange={passwordChange}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        {!passwordCheck && (
          <HelperTextP>
            영어(대소문자 구분), 숫자로 8~15자로 입력해주세요
          </HelperTextP>
        )}
        <LoginBtn type="button" onClick={submitSignup}>
          회원가입
        </LoginBtn>
      </form>
      <TextBnt onClick={redirectLogin}>로그인 창으로 돌아가기</TextBnt>
      {/* <KakakoLink href={KAKAO_AUTH_URL} /> */}
    </SignupContainer>
  );
};

export default SignupModal;

const SignupContainer = styled.div`
  width: 500px;
  /* height: 760px; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 100px;
`;

const SignUpInput = styled.input`
  width: 500px;
  height: 60px;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  margin-top: 26px;
  font-size: 20px;
  text-indent: 27px;

  &:focus {
    border-color: #fa5938;
    outline: none;
  }

  &::placeholder {
    color: #afaeb7;
    font-weight: 800;
    font-size: 20px;
    line-height: 34px;
    height: 60px;
    letter-spacing: -0.5px;
    text-indent: 27px;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const HelperTextP = styled.p`
  color: #fa5938;
  margin-top: 5px;
`;
const SignUpIconDiv = styled.div`
  width: 64px;
  height: 72px;
  background-image: url(${LoginIconMain});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const SignUpTitleDiv = styled.div`
  width: 175px;
  height: 75px;
  background-image: url(${LoginTitleMain});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 20px;
`;
const AdminCheckDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
const AdminCheckBoxInput = styled.input`
  width: 20px;
  height: 20px;
`;
