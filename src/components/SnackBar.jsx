import { useEffect, useState } from 'react';
import styled from 'styled-components';
import snack from '../assets/loginSnack.png';

import * as CSS from '../style/globalStyle';
import warnIcon from '../assets/warnIcon.png';

const SnackBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <SnackWrapDiv>
          <SnackDiv>
            <CSS.InfoIconImg src={warnIcon} alt="" />
            <p>로그인 후 이용해주세요.</p>
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(49, 49, 49, 0.4);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
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

  p {
    color: white;
  }
`;
