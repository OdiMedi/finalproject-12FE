import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmark, getReview, unregister } from '../api/myPage';
import profile from '../assets/profile.png';
import CommentDelModal from '../components/comment/CommentDelModal';
import MypageBookmark from '../components/mypage/MypageBookmark';
import MypageNicknameModal from '../components/mypage/MypageNicknameModal';
import MypagePwdModal from '../components/mypage/MypagePwdModal';
import MypageReview from '../components/mypage/MypageReview';
import ModalPortal from '../shared/ModalPortal';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [pwdModal, setPwdModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const MypageNickname = localStorage.getItem('nickname');
  const MypageEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  const mutation = useMutation(unregister, {
    onSuccess: () => {
      window.location.replace('/');
    },
    onError: error => {
      alert('회원탈퇴에 실패했습니다.');
    },
  });
  const { data: reviewData, isLoading: isLoadingReview } = useQuery(
    'getReview',
    getReview
  );

  const { data: bookmarkData, isLoading: isLoadingBookmark } = useQuery(
    'getBookmark',
    getBookmark
  );

  const handleClick = buttonId => {
    setActiveButton(buttonId);
  };

  const handlePwdCheck = newValue => {
    if (newValue === true) {
      setPwdModal(false);
    } else if (newValue === false) {
      setPwdModal(false);
    }
  };
  const handleDelCheck = newValue => {
    if (newValue === true) {
      mutation.mutate();
      setModalVisible(false);
    } else if (newValue === false) {
      setModalVisible(false);
    }
  };
  const userInformationButtonHandler = () => {
    navigate('/userInformation');
  };
  return (
    <MypageContainer>
      <MypageTitleH1>마이페이지</MypageTitleH1>
      <MyprofileDiv>
        <ProfileImg />
        <ProfileDescDiv>
          <span>{MypageNickname}</span>
          <WithdrawalBtn onClick={userInformationButtonHandler}>
            회원정보
          </WithdrawalBtn>

          <WithdrawalBtn onClick={() => setPwdModal(true)}>
            비밀번호 변경
          </WithdrawalBtn>
          <WithdrawalBtn onClick={() => setModalVisible(true)}>
            회원탈퇴
          </WithdrawalBtn>
          {pwdModal && (
            <ModalPortal>
              <MypagePwdModal onAccess={handlePwdCheck} />
            </ModalPortal>
          )}

          <p>{MypageEmail}</p>
        </ProfileDescDiv>
      </MyprofileDiv>
      <MypageTabDiv>
        <TabButton
          type="button"
          isActive={activeButton === 1}
          onClick={() => handleClick(1)}
        >
          <p>작성 댓글 {reviewData?.data.length}</p>
        </TabButton>
        <TabButton
          type="button"
          isActive={activeButton === 2}
          onClick={() => handleClick(2)}
        >
          <p>찜한 약국 {bookmarkData?.data.length}</p>
        </TabButton>
      </MypageTabDiv>
      {activeButton === 1 && (
        <BookmarkContainerDiv>
          {!isLoadingReview &&
            reviewData?.data.map(item => {
              return (
                <MypageReview
                  key={item.commentId}
                  storeId={item.storeId}
                  nickname={item.nickname}
                  contents={item.contents}
                  createdAt={item.createdAt}
                  commentId={item.commentId}
                  storeName={item.name}
                  address={item.address}
                  callNumber={item.callNumber}
                  weekday={item.weekdaysTime}
                  foreign={item.foreign}
                />
              );
            })}
        </BookmarkContainerDiv>
      )}
      {activeButton === 2 && (
        <BookmarkContainerDiv>
          {!isLoadingBookmark &&
            bookmarkData?.data.map(item => {
              return (
                <MypageBookmark
                  key={item.storeId}
                  storeId={item.storeId}
                  address={item.address}
                  name={item.name}
                  callNumber={item.callNumber}
                  weekdaysTime={item.weekdaysTime}
                  totalBookmark={item.totalBookmark}
                  holidayBusiness={item.holidayBusiness}
                  nightBusiness={item.nightBusiness}
                  foreign={item.foreign}
                />
              );
            })}
        </BookmarkContainerDiv>
      )}
      {modalVisible && (
        <ModalPortal>
          <CommentDelModal onAccess={handleDelCheck} user="user" />
        </ModalPortal>
      )}
    </MypageContainer>
  );
};

export default MyPage;

const MypageContainer = styled.div`
  margin: 0 auto;
  margin-top: 57px;
  width: 70vw;
  margin-bottom: 100px;
`;
const MypageTitleH1 = styled.h1`
  height: 43px;
  font-family: 'Pretendard';
  font-size: 36px;
  font-weight: 800;
  line-height: 43px;
  letter-spacing: 0.05em;
  margin-bottom: 40px;
`;
const MyprofileDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 54px;
`;
const ProfileImg = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${profile});
  background-size: 180px 180px;
`;
const ProfileDescDiv = styled.div`
  margin-left: 58px;

  span {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.05em;
    margin-right: 21px;
  }
  button {
    font-family: 'Pretendard';
    background: #fafafa;
    border: 0.3px solid #d9d9d9;
    border-radius: 3px;
  }
  p {
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.05em;
    margin-top: 16px;
  }
`;
const MypageTabDiv = styled.div`
  width: 100%;
  display: flex;
  margin-top: 68px;
`;
const TabButton = styled.button`
  display: flex;
  justify-content: center;
  width: 50%;
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid #e7e7e7;
  cursor: pointer;

  ${({ isActive }) => isActive && `border-bottom: 3px solid #FA5938;`}

  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    font-family: 'Pretendard';
    letter-spacing: -0.5px;
  }
`;
const BookmarkContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
`;
const WithdrawalBtn = styled.button`
  border: none;
  margin-left: 15px;
`;
