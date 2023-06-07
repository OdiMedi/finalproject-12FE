import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import api from '../api/axios';
import profile from '../assets/profile.png';
import MypageBookmark from '../components/mypage/MypageBookmark';
import MypageNicknameModal from '../components/mypage/MypageNicknameModal';
import MypageReview from '../components/mypage/MypageReview';
import ModalPortal from '../shared/ModalPortal';
import MypagePwdModal from '../components/mypage/MypagePwdModal';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const MypageNickname = localStorage.getItem('nickname');
  const MypageEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  const getBookmark = async () => {
    const response = await api.get('/api/bookmark');
    return response;
  };
  const getReview = async () => {
    const response = await api.get(`/api/comment/myComment`);
    return response;
  };

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
  const handlePwdCheck = newValue => {
    if (newValue === true) {
      setPwdModal(false);
    } else if (newValue === false) {
      setPwdModal(false);
    }
  };

  const withdrawalHandle = async () => {
    try {
      const authorizationCookie = Cookies.get('authorization');
      await api.delete('user/signout', {
        headers: {
          authorization: authorizationCookie,
        },
      });
      alert('회원탈퇴가 정상적으로 되었습니다.');
      Cookies.remove('accesstoken');
      Cookies.remove('refreshtoken');
      Cookies.remove('authorization');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      // navigate('/');
      window.location.replace('/');
    } catch (error) {
      console.log('withdrawal::::::', error);
    }
  };

  return (
    <MypageContainer>
      <MypageTitle>마이페이지</MypageTitle>
      <MyprofileDiv>
        <ProfileImg />
        <ProfileDescDiv>
          <span>{MypageNickname}</span>
          <button type="button" onClick={nicknameHandle}>
            닉네임 변경
          </button>
          <WithdrawalBtn onClick={() => setPwdModal(true)}>
            비밀번호 변경
          </WithdrawalBtn>
          <WithdrawalBtn onClick={withdrawalHandle}>회원탈퇴</WithdrawalBtn>
          {pwdModal && (
            <ModalPortal>
              <MypagePwdModal onAccess={handlePwdCheck} />
            </ModalPortal>
          )}
          {nicknameModal && (
            <ModalPortal>
              <MypageNicknameModal onAccess={handleNickCheck} />
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
    </MypageContainer>
  );
};

export default MyPage;

const MypageContainer = styled.div`
  margin: 0 auto;
  margin-top: 57px;
  width: 70vw;
`;
const MypageTitle = styled.p`
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
  gap: 2%;
  padding-top: 20px;
`;
const WithdrawalBtn = styled.button`
  border: none;
  margin-left: 15px;
`;
