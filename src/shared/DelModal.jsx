import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import commentDelIcon from '../assets/commentDel.png';
import commentDelX from '../assets/commentDelX.png';
import commentDelText from '../assets/commentDelText.png';
import unregisterText from '../assets/unregisterText.png';
import api from '../api/axios';

const DelModal = ({ onAccess, type }) => {
  const [typeText, setTypeText] = useState('');
  useEffect(() => {
    setTypeText(type);
  }, [type]);

  const withdrawalHandle = async () => {
    try {
      const authorizationCookie = Cookies.get('authorization');
      await api.delete('user/signout', {
        headers: {
          authorization: authorizationCookie,
        },
      });
      Cookies.remove('accesstoken');
      Cookies.remove('refreshtoken');
      Cookies.remove('authorization');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      window.location.replace('/');
    } catch (error) {
      console.log('withdrawal::::::', error);
    }
    onAccess(true);
  };

  const handleYesBtn = event => {
    event.stopPropagation();
    if (typeText === 'unregister') {
      withdrawalHandle();
    }
    onAccess(true);
  };
  const DelModalClose = event => {
    event.stopPropagation();
    onAccess(true);
  };

  return (
    <DelModalWrapDiv>
      <CommentDelModalDiv>
        <CommentDelIcon />
        <CommentDelX onClick={DelModalClose} />
        {typeText === 'commentDelete' && <CommentDelTextDiv />}
        {typeText === 'unregister' && <UnregisterTextDiv />}
        <CommentDelBtn onClick={handleYesBtn}>
          <p>예</p>
        </CommentDelBtn>
      </CommentDelModalDiv>
    </DelModalWrapDiv>
  );
};

export default DelModal;

const DelModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: relative;
`;

const CommentDelModalDiv = styled.div`
  width: 450px;
  height: 163px;
  background: #fd8b2b;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  position: relative;
`;
const CommentDelIcon = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${commentDelIcon});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 17px;
  left: 215px;
`;
const CommentDelX = styled.div`
  width: 11px;
  height: 11px;
  background-image: url(${commentDelX});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 14px;
  right: 17px;
  cursor: pointer;
`;
const CommentDelTextDiv = styled.div`
  width: 179px;
  height: 34px;
  background-image: url(${commentDelText});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 54px;
  right: 135px;
`;
const CommentDelBtn = styled.button`
  position: absolute;
  width: 79px;
  height: 32px;
  left: 186px;
  top: 110px;
  background: #ffffff;
  border-radius: 32px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    font-weight: 900;
    font-size: 14px;
    line-height: 34px;
    color: #fd8b2b;
  }
`;

const UnregisterTextDiv = styled.div`
  width: 228px;
  height: 34px;
  background-image: url(${unregisterText});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 54px;
  left: 111px;
`;
