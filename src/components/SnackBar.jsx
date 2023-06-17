import { useEffect, useState } from 'react';
import styled from 'styled-components';
import snack from '../assets/loginSnack.png';

import * as CSS from '../style/globalStyle';
import warnIcon from '../assets/warnIcon.png';

const SnackBar = ({ type }) => {
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
            <CSS.InfoIconImg src={warnIcon} alt="" />
            {type === 'login' && <p>로그인 후 이용해주세요.</p>}
            {type === 'passWord' && (
              <p>비밀번호가 성공적으로 변경되었습니다.</p>
            )}
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
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SnackDiv = styled.div`
  width: 450px;
  height: 80px;
  background-image: url(${snack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;

  font-weight: 500;
  font-size: 18px;
  line-height: 34px;
  p {
    color: white;
  }
`;
