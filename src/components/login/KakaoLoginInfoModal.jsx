import React from 'react';
import styled from 'styled-components';
import infoIcon from '../../assets/infoIcon.png';

const KakaoLoginInfoModal = ({ onAccess, onCallback }) => {
  return (
    <ModalWrapDiv>
      <ModalMain>
        <InfoTitleBoxDiv>
          <InfoIconImg src={infoIcon} alt="kakao login info icon" />
          <ContentP type="title" thickness="bold">
            카카오 간편가입 주의
          </ContentP>
        </InfoTitleBoxDiv>
        <div>
          <ContentP>원활한 서비스 이용을 위해 카카오톡 선택 항목인 </ContentP>
          <ContentP>
            <ContentP thickness="bold">이메일 동의</ContentP>
            &nbsp;를 해주셔야 합니다.
          </ContentP>
        </div>
        <ButtonBoxDiv>
          <Button onClick={onCallback}>확인</Button>
          <Button type="close" onClick={() => onAccess(true)}>
            닫기
          </Button>
        </ButtonBoxDiv>
      </ModalMain>
    </ModalWrapDiv>
  );
};

export default KakaoLoginInfoModal;
const ModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalMain = styled.div`
  width: 540px;
  height: 245px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 35px;
`;
const InfoIconImg = styled.img`
  width: 30px;
  height: 30px;
`;
const InfoTitleBoxDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ContentP = styled.p`
  font-size: ${props => (props.type === 'title' ? '25px;' : '18px;')};
  font-weight: ${props => (props.thickness === 'bold' ? '800' : '500')};
  color: ${props => (props.thickness === 'bold' ? '#fa5938' : 'gray')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 25px;
`;
const ButtonBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
const Button = styled.button`
  width: 160px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.type === 'close' ? '#fafafa;' : '#fa5938;'};
  color: ${props => (props.type === 'close' ? '#686868;' : '#ffffff;')};
  border: 0.5px solid #afaeb7;
  border-radius: 30px;
  font-weight: 900;
  font-size: 20px;
  line-height: 34px;

  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
