import { useState } from 'react';
import styled from 'styled-components';
import { createRoot } from 'react-dom/client';
import commentDelModal from '../../assets/commentDelModal.png';
import commentDelIcon from '../../assets/commentDel.png';
import commentDelX from '../../assets/commentDelX.png';
import commentDelText from '../../assets/commentDelText.png';

const CommentDelModal = ({ onAccess }) => {
  // const [isDelModal, setIsDelModal] = useState(true);
  console.log('모달컴포내부', onAccess);
  const handleYesBtn = () => {
    onAccess(true);
    console.log('포탈내부 실행');
  };
  const DelModalClose = () => {
    onAccess(false);
  };
  const checkClick = () => {
    console.log('모달내부클릭~~~~~');
  };

  return (
    <DelModalWrapDiv>
      <CommentDelModalDiv>
        <CommentDelIcon />
        <CommentDelX onClick={DelModalClose} />
        <CommentDelTextDiv />
        <CommentDelBtn onClick={handleYesBtn}>
          <p>예</p>
        </CommentDelBtn>
      </CommentDelModalDiv>
    </DelModalWrapDiv>
  );
};

export default CommentDelModal;

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
  /* position: absolute;
  top: 0; */
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
