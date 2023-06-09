import styled from 'styled-components';
import Xbutton from '../../assets/nicknameX.png';
import profileDefault from '../../assets/profile.png';

const UserInfoModal = () => {
  return (
    <UserInfoContainerDiv>
      <UserInfoWrapDiv>
        <UserInfoTitleP>회원정보</UserInfoTitleP>
        <CommentDelX />
        <UserInfoImgDiv />
        <UserInfoNameP>청량한 바지</UserInfoNameP>
        <UserInfoBtnWrapDiv>
          <UserInfoButton>프로필 사진 변경</UserInfoButton>
          <UserInfoButton>닉네임 변경</UserInfoButton>
          <UserInfoButton>비밀번호 변경</UserInfoButton>
        </UserInfoBtnWrapDiv>
        <UnregisterButton>회원 탈퇴</UnregisterButton>
      </UserInfoWrapDiv>
    </UserInfoContainerDiv>
  );
};

export default UserInfoModal;

const UserInfoContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const UserInfoWrapDiv = styled.div`
  width: 510px;
  height: 641px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
`;

const CommentDelX = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${Xbutton});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 23px;
  right: 27px;
  cursor: pointer;
`;

const UserInfoTitleP = styled.p`
  font-weight: 800;
  font-size: 24px;
  line-height: 34px;
  position: absolute;
  top: 35px;
  left: 209px;
`;
const UserInfoImgDiv = styled.div`
  width: 155px;
  height: 155px;
  background-image: url(${profileDefault});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 119px;
  left: 177px;
`;
const UserInfoNameP = styled.p`
  font-weight: 800;
  font-size: 20px;
  line-height: 34px;
  position: absolute;
  top: 286px;
  left: 209px;
`;
const UserInfoBtnWrapDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 346px;
  gap: 16px;
`;
const UserInfoButton = styled.button`
  width: 236px;
  height: 40px;
  background: #fafafa;
  border: 0.5px solid #afaeb7;
  border-radius: 20px;
  cursor: pointer;
`;
const UnregisterButton = styled.button`
  font-weight: 500;
  font-size: 13px;
  line-height: 34px;
  letter-spacing: -0.5px;
  color: #686868;
  position: absolute;
  top: 583px;
  left: 223px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
