import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import snack from '../assets/loginSnack.png';

import * as CSS from '../style/globalStyle';
import warnIcon from '../assets/warnIcon.png';

const SnackBar = ({ type, error }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <SnackWrapDiv>
          <SnackDiv>
            <CSS.InfoIconImg src={warnIcon} alt="snackbar info icon" />
            {type === 'login' && <p>로그인 후 이용해주세요.</p>}
            {type === 'passWord' && (
              <p>비밀번호가 성공적으로 변경되었습니다.</p>
            )}
            {type === 'error' && <p>{error}</p>}
          </SnackDiv>
        </SnackWrapDiv>
      )}
    </>
  );
};

export default SnackBar;

const SnackWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding-top: 20px;
  /* background-color: rgba(0, 0, 0, 0.2); */
`;

// 키프레임 정의
const slideDown = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`;
const SnackDiv = styled.div`
  animation: ${slideDown} 0.5s ease-out;
  width: 350px;
  height: 50px;
  background-image: url(${snack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;

  border-radius: 10px;
  font-weight: 500;
  font-size: 18px;
  line-height: 34px;
  p {
    color: white;
  }
`;
