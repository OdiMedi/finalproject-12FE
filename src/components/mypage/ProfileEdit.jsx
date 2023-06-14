import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.png';
import commentDelIcon from '../../assets/commentDel.png';
import NicknameX from '../../assets/nicknameX.png';
import profile from '../../assets/profile.png';

const ProfileEdit = ({ onAccess }) => {
  const DelModalClose = event => {
    event.stopPropagation();
    onAccess(true);
  };
  return (
    <OverlayDiv>
      <InformationSection>
        <UserInformationP>회원정보</UserInformationP>
        <ProfileImg />
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameButton onClick={DelModalClose}>변경하기</NicknameButton>
      </InformationSection>
    </OverlayDiv>
  );
};

export default ProfileEdit;

const OverlayDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const InformationSection = styled.section`
  width: 510px;
  height: 641px;
  background: #ffffff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;
const ProfileImg = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${profile});
  background-size: 180px 180px;
`;
const NicknameXDiv = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${NicknameX});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 17px;
  right: 21px;
`;
const UserInformationP = styled.p`
  font-weight: 800;
  font-size: 24px;
  line-height: 34px;
`;

const NicknameButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
`;
