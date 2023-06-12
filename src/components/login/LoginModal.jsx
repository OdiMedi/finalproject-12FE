import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axios';
import KAKAO_AUTH_URL from './kakaoAuth';
import LoginIconMain from '../../assets/loginIcon.png';
import LoginTitleMain from '../../assets/loginTitle.png';
import KakaoIcon from '../../assets/kakaoIcon.png';
import WarnIcon from '../../assets/warnIcon.png';
import ModalPortal from '../../shared/ModalPortal';
import FindPasswordModal from './FindPasswordModal';

const LoginModal = () => {
  const [findPwdModal, setFindPwdModal] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputValue;
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
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('nickname', response.data.nickname);

      const accessHeader = response?.headers.get('ACCESS_KEY');
      const refreshHeader = response?.headers.get('REFRESH_KEY');

      const accessToken = accessHeader?.split(' ')[1];
      const refreshToken = refreshHeader?.split(' ')[1];

      Cookies.set('accesstoken', accessToken);
      Cookies.set('refreshtoken', refreshToken);
      setInputValue({
        email: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      setErrorCode(error.response.data.errorCode);
      console.log(error.response.data.errorCode);
    }
  };

  const findPwdModalVisible = () => {
    setFindPwdModal(true);
  };
  const handleFindPwd = newValue => {
    if (newValue === true) {
      setFindPwdModal(false);
    } else if (newValue === false) {
      setFindPwdModal(false);
    }
  };

  return (
    <LoginContainer>
      {findPwdModal && (
        <ModalPortal>
          <FindPasswordModal onAccess={handleFindPwd} />
        </ModalPortal>
      )}
      <LoginIconDiv />
      <LoginTitleDiv />
      <form autoComplete="off">
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
        <LoginBtn onClick={submitLogin} type="button">
          로그인
        </LoginBtn>
      </form>

      <TextBtnWrap>
        <TextBnt onClick={findPwdModalVisible}>비밀번호 찾기</TextBnt>
        <LineDiv />
        <TextBnt onClick={() => navigate('/signup')}>회원가입</TextBnt>
      </TextBtnWrap>

      <KakakoLink href={KAKAO_AUTH_URL} />

      {errorCode === 'MEMBER_NOT_FOUND' && (
        <WarningDiv>
          <div />
          <p>이메일을 다시 확인해주세요.</p>
        </WarningDiv>
      )}
      {errorCode === 'INVALID_PASSWORD' && (
        <WarningDiv>
          <div />
          <p>비밀번호를 다시 확인해주세요.</p>
        </WarningDiv>
      )}
    </LoginContainer>
  );
};

export default LoginModal;

const LoginContainer = styled.div`
  width: 500px;
  /* height: 90vh; */
  margin: 0 auto;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 100px;
`;
export const LoginIconDiv = styled.div`
  width: 64px;
  height: 72px;
  background-image: url(${LoginIconMain});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
export const LoginTitleDiv = styled.div`
  width: 175px;
  height: 75px;
  background-image: url(${LoginTitleMain});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 39px;
`;
export const LoginInput = styled.input`
  width: 500px;
  height: 60px;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  /* margin-bottom: 26px; */
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
export const LoginBtn = styled.button`
  width: 500px;
  height: 64px;
  background-color: #fa5938;
  border: none;
  border-radius: 32px;
  font-weight: 900;
  font-size: 20px;
  line-height: 34px;
  letter-spacing: -0.5px;
  color: #ffffff;
  margin-bottom: 34px;
  margin-top: 26px;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
const TextBtnWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const TextBnt = styled.button`
  height: 34px;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: -0.5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #686868;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
const LineDiv = styled.div`
  width: 17px;
  height: 0px;
  border: 0.8px solid #686868;
  transform: rotate(-90deg);
  margin: 0 27px 0 28px;
`;
export const KakakoLink = styled.a`
  width: 72px;
  height: 72px;
  background-image: url(${KakaoIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 28px;
`;
const WarningDiv = styled.div`
  width: 450px;
  height: 80px;
  background: #fd8b2b;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 39px;

  div {
    width: 16px;
    height: 16px;
    background-image: url(${WarnIcon});
    background-size: 16px 16px;
    margin-right: 9px;
  }

  p {
    font-size: 18px;
    letter-spacing: -0.5px;
    color: #ffffff;
    font-stretch: 87.5;
  }
`;

/* <카카오 소셜 로그인 flow>
프론트엔드로 부터 인가 코드를 전달 받는다.
전달 받은 인가 코드를 가지고, 카카오 인증 서버에 토큰 발급 요청을 보낸다.
전달 받는 카카오 토큰을 가지고 카카오 리소스 서버에 유저 정보 요청을 보낸다.
전달 받은 유저 정보를 가지고 회원가입 중복 여부를 거친다.
중복이라면(카카오로 로그인한적있는 유저), jwt 토큰을 발급하여 프론트엔드에 전달하고, 
중복이 아니라면 새로운 유저로 가입을 시킨 후, jwt 토큰을 발급하여 프론트 엔드에 전달한다. */
