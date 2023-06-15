import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBookmark, getReview } from '../api/myPage';
import profile from '../assets/profile.png';
import MypageBookmark from '../components/mypage/MypageBookmark';
import MypageReview from '../components/mypage/MypageReview';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState(1);

  const MypageNickname = localStorage.getItem('nickname');
  const MypageEmail = localStorage.getItem('email');
  const MyProfileImg = localStorage.getItem('ProfileImg');
  console.log('MyProfileImg', MyProfileImg);
  const navigate = useNavigate();

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

  const userInformationButtonHandler = () => {
    navigate('/userInformation');
  };
  return (
    <MypageContainer>
      <MypageTitleH1>마이페이지</MypageTitleH1>
      <MyprofileDiv>
        {MyProfileImg === 'null' ? (
          <EditImg src={profile} art="defaultProfileImage" />
        ) : (
          <EditImg src={MyProfileImg} art="profileImage" />
        )}

        <ProfileDescDiv>
          <div>
            <span>{MypageNickname}</span>
            <WithdrawalBtn onClick={userInformationButtonHandler}>
              회원정보 수정
            </WithdrawalBtn>
          </div>
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
                  imageUrl={item.imageUrl}
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
  margin-left: 30px;
`;
const ProfileImg = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${profile});
  background-size: 180px 180px;
`;
const ProfileDescDiv = styled.div`
  margin-left: 58px;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
  }
  span {
    font-family: 'Pretendard';
    font-weight: 800;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.05em;
    margin-right: 21px;
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
  width: 80px;
  height: 32px;
  background-color: #fafafa;
  border: 0.3px solid #d9d9d9;
  border-radius: 3px;
  margin-left: 32px;
  color: #686868;
  font-weight: 700;
  font-size: 11px;
  line-height: 6px;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
const EditImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;
