import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { unregister } from '../../api/myPage';
import closeIcon from '../../assets/closeIcon.png';
import commentDelIcon from '../../assets/commentDel.png';
import NicknameX from '../../assets/nicknameX.png';
import profile from '../../assets/profile.png';
import ModalPortal from '../../shared/ModalPortal';
import CommentDelModal from '../comment/CommentDelModal';

const UserInformationModal = ({ onAccess }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const mutation = useMutation(unregister, {
    onSuccess: () => {
      window.location.replace('/');
    },
    onError: error => {
      alert('회원탈퇴에 실패했습니다.');
    },
  });

  const handleDelCheck = event => {
    // event.stopPropagation();
    setModalVisible(true);
    if (modalVisible) {
      onAccess(true);
    }
  };

  const handleWithdrawal = () => {
    mutation.mutate(); // 회원탈퇴 요청 실행
  };

  const DelModalClose = event => {
    event.stopPropagation();
    onAccess(true);
  };
  console.log(modalVisible);
  return (
    <OverlayDiv>
      <InformationSection>
        <UserInformationP>회원정보</UserInformationP>
        <ProfileImg />
        <NicknameXDiv onClick={() => onAccess(true)} />
        <WithdrawalBtn onClick={handleDelCheck}>회원탈퇴</WithdrawalBtn>
        {modalVisible && (
          <ModalPortal>
            <CommentDelModal
              onAccess={handleWithdrawal} // 회원탈퇴 실행 함수 전달
              user="user"
            />
          </ModalPortal>
        )}
      </InformationSection>
    </OverlayDiv>
  );
};

export default UserInformationModal;

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

const WithdrawalBtn = styled.button`
  background-color: transparent;
  font-weight: 600;
  font-size: 13px;
  line-height: 34px;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  color: #686868;
  cursor: pointer;
`;
