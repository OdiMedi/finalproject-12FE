import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginSnack from '../../assets/loginSnack.png';
import LoginSnackTitle from '../../assets/loginSnackTitle.png';

const LoginSnackBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <LoginSnackWrapDiv>
          <LoginSnackDiv>
            <p>로그인 만료시간이 다 되었습니다</p>
            <p>재로그인 해주세요</p>
          </LoginSnackDiv>
        </LoginSnackWrapDiv>
      )}
    </>
  );
};

export default LoginSnackBar;

const LoginSnackWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoginSnackDiv = styled.div`
  width: 450px;
  height: 80px;
  background-image: url(${LoginSnack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;

  p {
    color: white;
  }
`;

const LoginSnackTitleDiv = styled.div`
  width: 189px;
  height: 34px;
  background-image: url(${LoginSnackTitle});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 20;
`;
