import styled from 'styled-components';
import commentDelIcon from '../../assets/commentDel.png';
import commentDelX from '../../assets/commentDelX.png';
import commentDelText from '../../assets/commentDelText.png';

const CommentDelModal = ({ onAccess, user }) => {
  const handleYesBtn = event => {
    event.stopPropagation();
    onAccess(true);
  };
  const DelModalClose = event => {
    event.stopPropagation();
    onAccess(false);
  };

  return (
    <DelModalWrapDiv>
      <CommentDelModalDiv>
        <CommentDelIcon />
        <CommentDelX onClick={DelModalClose} />
        {user ? (
          <CommnetDelTextP>회원 탈퇴 하시겠습니까?</CommnetDelTextP>
        ) : (
          <CommnetDelTextP>댓글을 삭제하시겠습니까?</CommnetDelTextP>
        )}

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
const CommnetDelTextP = styled.div`
  position: absolute;
  top: 54px;
  right: 135px;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;

  color: #ffffff;
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
