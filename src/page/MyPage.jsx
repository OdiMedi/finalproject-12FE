import { useState } from 'react';
import styled from 'styled-components';
import profile from '../assets/profile.png';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = buttonId => {
    setActiveButton(buttonId);
  };

  return (
    <MypageContainer>
      <MypageTitle>마이페이지</MypageTitle>
      <MyprofileDiv>
        <ProfileImg />
        <ProfileDescDiv>
          <span>청량한 바지</span>
          <button type="button">닉네임 변경</button>
          <p>mail1234@naver.com</p>
        </ProfileDescDiv>
      </MyprofileDiv>
      <MypageTabDiv>
        <TabButton
          type="button"
          isActive={activeButton === 1}
          onClick={() => handleClick(1)}
        >
          <p>작성 댓글 0</p>
        </TabButton>
        <TabButton
          type="button"
          isActive={activeButton === 2}
          onClick={() => handleClick(2)}
        >
          <p>찜한 약국 0</p>
        </TabButton>
      </MypageTabDiv>
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
