import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MypageNicknameModal from '../components/mypage/MypageNicknameModal';
import ModalPortal from '../shared/ModalPortal';
import * as CSS from '../style/mypage';

const UserInformation = () => {
  const [nicknameModal, setNicknameModal] = useState(false);

  const MyPageNickname = localStorage.getItem('nickname');
  const MyPageEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const myPageMoveButtonHandler = () => {
    navigate('/mypage');
  };
  const nicknameHandle = () => {
    setNicknameModal(true);
  };
  const handleNickCheck = newValue => {
    if (newValue === true) {
      setNicknameModal(false);
    } else if (newValue === false) {
      setNicknameModal(false);
    }
  };
  return (
    <CSS.MypageContainer>
      <TitleBoxDiv>
        <CSS.MypageTitleH1 onClick={myPageMoveButtonHandler}>
          마이페이지
        </CSS.MypageTitleH1>
        <p>{'>'}</p>
        <CSS.MypageTitleH1>회원정보 수정</CSS.MypageTitleH1>
      </TitleBoxDiv>
      <UserInfoSection>
        <CSS.ProfileImg />
        <UserNickNameP>{MyPageNickname}</UserNickNameP>
        <UserEmailP>{MyPageEmail}</UserEmailP>
        <EditButton>프로필 사진 변경</EditButton>
        <EditButton onClick={nicknameHandle}>닉네임 변경</EditButton>
        {nicknameModal && (
          <ModalPortal>
            <MypageNicknameModal
              onAccess={handleNickCheck}
              nickName={MyPageNickname}
            />
          </ModalPortal>
        )}
        <EditButton>비밀번호 변경</EditButton>
        <WithdrawButton>회원탈퇴</WithdrawButton>
      </UserInfoSection>
    </CSS.MypageContainer>
  );
};

export default UserInformation;

const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 36px;
  gap: 24px;
  color: #a7a3a3;
`;
const UserInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const EditButton = styled.button`
  width: 352px;
  height: 58px;
  margin-bottom: 40px;

  background-color: #fafafa;
  border: 0.5px solid #afaeb7;
  border-radius: 30px;
  font-weight: 900;
  font-size: 20px;
  line-height: 34px;
  color: #686868;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
const WithdrawButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  color: #686868;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
const UserNickNameP = styled.p`
  font-size: 32px;
  line-height: 38px;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.05em;
  color: #0d0d0d;

  margin-top: 40px;
  margin-bottom: 17px;
`;
const UserEmailP = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #0d0d0d;
  margin-bottom: 50px;
`;
