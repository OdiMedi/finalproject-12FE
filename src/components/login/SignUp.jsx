import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api/axios';
import {
  confirmationNumber,
  sendVerificationCodeByEmail,
} from '../../api/singUp';
import emailInfo from '../../assets/emailInfo.png';
import infoIcon from '../../assets/infoIcon.png';
import LoginIconMain from '../../assets/loginIcon.png';
import LoginTitleMain from '../../assets/loginTitle.png';
import SnackBar from '../SnackBar';
import { LoginBtn, TextBnt } from './Login';
import Timer from './Timer';

const SignUp = () => {
  const navigate = useNavigate();
  const [emailCheck, setEmailCheck] = useState(true);
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [confirmWarningMessage, setConfirmWarningMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [validNumber, setValidNumber] = useState('');
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [limit, setLimit] = useState(179);
  const [timerCount, setTimerCount] = useState(0);
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
    adminToken: '',
    admin: false,
  });
  const { email, nickname, password, adminToken, admin } = inputValue;

  const adminCheckHandle = () => {
    setInputValue({
      ...inputValue,
      admin: !admin,
    });
  };

  const sendEmailMutation = useMutation(sendVerificationCodeByEmail, {
    onSuccess: () => {
      setIsSendEmail(true);
      setIsValid(true);
      setWarningMessage('');
      setConfirmWarningMessage(
        '입력하신 메일로 전송된 인증번호를 입력해주세요.'
      );
      setValidNumber('');
      setLimit(180);
      setTimerCount(prevCount => prevCount + 1);
    },
    onError: error => {
      setWarningMessage(error.message.replace(/\[|\]/g, ''));
    },
  });
  const confirmationMutation = useMutation(confirmationNumber, {
    onSuccess: () => {
      setIsConfirm(!isConfirm);
      setConfirmWarningMessage('이메일 인증에 성공했습니다.');
    },
    onError: error => {
      setConfirmWarningMessage(error.message.replace(/\[|\]/g, ''));
    },
  });
  useEffect(() => {
    <SnackBar type="warningMessage" message={warningMessage} />;
  }, [warningMessage]);

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
    if (value.length <= 10) {
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    }
    if (!nicknameRegExp.test(value)) {
      setNicknameCheck(false);
    } else {
      setNicknameCheck(true);
    }
  };
  const passwordChange = e => {
    const { name, value } = e.target;
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    if (!passwordRegExp.test(value)) {
      setPasswordCheck(false);
      setWarningMessage('비밀번호는 영어(대소문자),숫자로만 입력해주세요. ');
    } else {
      setPasswordCheck(true);
    }
  };
  const adminTokenChange = e => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const validNumberChange = e => {
    setValidNumber(e.target.value);
  };
  const validNumberPortButtonHandler = () => {
    const nicknameRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (nicknameRegExp.test(email)) {
      sendEmailMutation.mutate(inputValue.email);
    }
  };
  const confirmationNumberButtonHandler = () => {
    confirmationMutation.mutate({
      email: inputValue.email,
      validNumber,
    });
  };
  const submitSignup = async () => {
    try {
      if (!(emailCheck && nicknameCheck && passwordCheck)) {
        return;
      }
      await api.post('/user/signup', inputValue);
      navigate('/login');
    } catch (error) {
      setWarningMessage(error.response.data.message);
    }
  };
  const redirectLogin = () => {
    navigate('/login');
  };

  return (
    <SignupContainer>
      <SignUpIconDiv />
      <SignUpTitleDiv />
      <form autoComplete="off" onSubmit={e => e.preventDefault()}>
        <AdminCheckDiv>
          <AdminCheckBoxInput
            type="checkbox"
            value={admin}
            onChange={adminCheckHandle}
          />
          <p>관리자 계정</p>
        </AdminCheckDiv>

        <MarginDiv />
        {admin && (
          <SignUpInput
            size="500px"
            name="adminToken"
            value={adminToken}
            onChange={adminTokenChange}
            type="text"
            placeholder="관리자 암호를 입력해주세요."
          />
        )}
        <MarginDiv />
        <SignUpInput
          size="500px"
          name="nickname"
          value={nickname}
          onChange={nicknameChange}
          type="text"
          placeholder="닉네임을 입력하세요."
        />
        {!nicknameCheck ? (
          <ValidInfoDiv>
            <EmailInfoImg src={infoIcon} alt="" />
            <WarningMessageP>
              닉네임은 한글, 영어(대소문자 구분), 숫자로 2~10자로 입력해주세요.
            </WarningMessageP>
          </ValidInfoDiv>
        ) : (
          <MarginDiv />
        )}

        <EmailBoxDiv>
          <SignUpInput
            position="email"
            size="320px"
            name="email"
            value={email}
            onChange={changeEmail}
            type="text"
            placeholder="이메일을 입력하세요."
          />
          <Button onClick={validNumberPortButtonHandler}>인증번호 전송</Button>
        </EmailBoxDiv>
        {!emailCheck && (
          <HelperTextP>이메일 형식에 맞춰주세요(@ . 포함)</HelperTextP>
        )}
        {isValid ? (
          <ValidInfoDiv>
            <EmailInfoImg src={emailInfo} art="" />
            <p>메일이 전송 되었습니다.</p>
            <LimitTimerP>
              만료 시간
              <Timer timeLimit={limit} key={timerCount} />
            </LimitTimerP>
          </ValidInfoDiv>
        ) : (
          <MarginDiv />
        )}
        {isSendEmail && (
          <EmailBoxDiv>
            <SignUpInput
              size="320px"
              name="validNumber"
              value={validNumber}
              onChange={validNumberChange}
              type="text"
              placeholder="인증번호를 입력하세요."
            />
            <Button onClick={confirmationNumberButtonHandler}>메일 인증</Button>
          </EmailBoxDiv>
        )}

        {confirmWarningMessage && (
          <ValidInfoDiv>
            <EmailInfoImg src={infoIcon} alt="" />
            <WarningMessageP>{confirmWarningMessage}</WarningMessageP>
          </ValidInfoDiv>
        )}

        {!isValid && !isConfirm && <MarginDiv />}
        <SignUpInput
          size="500px"
          name="password"
          value={password}
          onChange={passwordChange}
          type="password"
          placeholder="비밀번호를 입력하세요."
        />
        <ValidInfoDiv>
          {warningMessage && (
            <>
              <EmailInfoImg src={infoIcon} alt="" />
              <WarningMessageP>{warningMessage}</WarningMessageP>
            </>
          )}
        </ValidInfoDiv>
        <MarginDiv />
        <LoginBtn type="button" onClick={submitSignup}>
          회원가입
        </LoginBtn>
      </form>
      <TextBnt onClick={redirectLogin}>로그인 창으로 돌아가기</TextBnt>
      {/* <KakakoLink href={KAKAO_AUTH_URL} /> */}
      {/* {warningMessage && (
        <SnackBar type="warningMessage" message={warningMessage} />
      )} */}
    </SignupContainer>
  );
};

export default SignUp;

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
  width: ${props => `${props.size}`};
  height: 50px;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  font-size: 20px;
  text-indent: 15px;

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
const MarginDiv = styled.div`
  margin-top: 30px;
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
  margin-bottom: 30px;
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
const WarningMessageP = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 34px;
  color: #fa5938;
`;
const EmailBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  width: 160px;
  height: 50px;
  margin-left: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.5px;
  color: #ffffff;
  background-color: #fa5938;

  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
const ValidInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #afaeb7;
  margin-left: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 34px;
  gap: 11px;
`;
const EmailInfoImg = styled.img`
  width: 14px;
  height: 14px;
`;
const LimitTimerP = styled.p`
  display: flex;
  gap: 7px;
  margin-left: 150px;
`;
