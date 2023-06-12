import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axios';
import { LoginBtn, TextBnt, KakakoLink } from './LoginModal';
import KAKAO_AUTH_URL from './kakaoAuth';
import LoginIconMain from '../../assets/loginIcon.png';
import LoginTitleMain from '../../assets/loginTitle.png';
import CertifiNumber from '../../assets/certificationSubmit.png';
import CertifiEmail from '../../assets/emailCertification.png';
import AlertIcon from '../../assets/alertIcon.png';
import ExpireTimer from './ExpireTimer';

const SignupModal = () => {
  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(true);
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [isTimer, setIsTimer] = useState(false);
  const [validNumber, setValidNumber] = useState('');
  const [emailAuth, setEmailAuth] = useState(false);
  const [validSubmitNum, setValidSubmitNum] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const { email, nickname, password } = inputValue;

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
  const vaildNumHandler = e => {
    const { value } = e.target;
    setValidNumber(value);
  };

  const submitCertifiNumber = async () => {
    try {
      setIsTimer(false);
      await api.post('/user/signup/email', { email });
      setTimeout(() => {
        setIsTimer(true);
      }, 100);
      setValidSubmitNum(true);
    } catch (error) {
      setValidSubmitNum(false);
      console.log(error);
    }
  };

  const mailauthHandeler = async () => {
    try {
      await api
        .post('/user/signup/email/valid', {
          validNumber: Number(validNumber),
          email,
        })
        .then(res => setEmailAuth(res.data.checkNumber));

      setIsTimer(false);
    } catch (error) {
      console.log(error);
    }
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
        <NormalInputDiv bottom>
          <SignUpInput
            name="nickname"
            value={nickname}
            onChange={nicknameChange}
            type="text"
            placeholder="닉네임을 입력하세요."
          />
        </NormalInputDiv>

        {!nicknameCheck && (
          <HelperTextP>
            닉네임은 한글, 영어(대소문자 구분), 숫자로 2~10자로 입력해주세요
          </HelperTextP>
        )}
        <div>
          <InputDiv>
            <SignUpInput
              name="email"
              value={email}
              onChange={changeEmail}
              type="text"
              placeholder="이메일을 입력하세요."
              email
            />
            <CertificationSendDiv onClick={submitCertifiNumber} />
          </InputDiv>
          {validSubmitNum && (
            <AlertHelperDiv>
              <AlertEmailDiv />
              <AlertTextP>메일이 전송되었습니다.</AlertTextP>
            </AlertHelperDiv>
          )}
        </div>
        {!emailCheck && (
          <HelperTextP>이메일 형식에 맞춰주세요(@ . 포함)</HelperTextP>
        )}
        {validSubmitNum && (
          <div>
            <InputDiv>
              <SignUpInput
                name="email"
                value={validNumber}
                onChange={vaildNumHandler}
                type="text"
                placeholder="인증번호를 입력하세요."
                email
              />
              <CertificationEmailDiv onClick={mailauthHandeler} />
            </InputDiv>
            <AlertHelperDiv>
              <AlertEmailDiv />
              <AlertTextP>
                입력하신 메일로 전송된 인증번호를 입력해주세요.
              </AlertTextP>
              {isTimer && <ExpireTimer />}
            </AlertHelperDiv>
          </div>
        )}
        <NormalInputDiv top>
          <SignUpInput
            name="password"
            value={password}
            onChange={passwordChange}
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </NormalInputDiv>

        {!passwordCheck && (
          <HelperTextP>
            영어(대소문자 구분), 숫자로 8~15자로 입력해주세요
          </HelperTextP>
        )}
        <SubmitBtnWrapDiv>
          <LoginBtn type="button" onClick={submitSignup}>
            회원가입
          </LoginBtn>
        </SubmitBtnWrapDiv>
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
  margin-top: 60px;
  margin-bottom: 100px;
`;
const NormalInputDiv = styled.div`
  ${props => (props.top ? 'margin-top: 15px;' : 'margin-bottom: 27px;')}
`;

const InputDiv = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 15px;
`;

const SignUpInput = styled.input`
  width: ${props => (props.email ? '448px' : '630px')};
  height: 60px;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
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
  margin-bottom: 39px;
`;
const CertificationSendDiv = styled.div`
  width: 162px;
  height: 60px;
  background-image: url(${CertifiNumber});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;
const CertificationEmailDiv = styled.div`
  width: 162px;
  height: 60px;
  background-image: url(${CertifiEmail});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const AlertHelperDiv = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  padding-left: 25px;
  margin-top: 5px;
`;
const AlertEmailDiv = styled.div`
  width: 14px;
  height: 14px;
  background-image: url(${AlertIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const AlertTextP = styled.p`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.5px;
  color: #afaeb7;
`;
const SubmitBtnWrapDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
