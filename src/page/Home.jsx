import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MainLogo from '../assets/mainLogo.png';
import pharmacy from '../assets/pharmacy.png';
import conversation from '../assets/conversation.png';
import MainRight from '../assets/mainRight.png';

const Home = () => {
  const navigate = useNavigate();
  const pharmacySearchOnClickButtonHandler = () => {
    navigate('/mainPage');
  };

  return (
    <MainPageContainerDiv>
      <MainPageLeftDiv>
        <div>
          <p className="Hometitle">서울 내 약국 찾기 서비스</p>
          <MainPageLeftIconDiv />
        </div>

        <MainLeftBottomDiv>
          <BottomBtnDiv onClick={() => navigate('/mainPage')}>
            <BottomIconLeftDiv
              role="button"
              onClick={pharmacySearchOnClickButtonHandler}
            />
            <p>약국 검색</p>
            <p>구역별, 공휴일·야간영업 약국 검색</p>
          </BottomBtnDiv>
          <BottomBtnDiv>
            <BottomIconRightDiv />
            <p>FOR FOREIGNER</p>
            <p>Searching For ENG Speaking</p>
          </BottomBtnDiv>
        </MainLeftBottomDiv>
      </MainPageLeftDiv>
      <MainPageRightDiv />
    </MainPageContainerDiv>
  );
};

export default Home;

const MainPageContainerDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  margin: 0 auto;
  margin-top: 80px;
  gap: 50px;
`;

const MainPageLeftDiv = styled.div`
  .Hometitle {
    font-weight: 500;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: 0.05em;
    margin-bottom: 30px;
  }
`;
const MainPageLeftIconDiv = styled.div`
  width: 460px;
  height: 130px;
  background-image: url(${MainLogo});
  background-size: contain;
  background-repeat: no-repeat;
`;

const MainLeftBottomDiv = styled.div`
  display: flex;
  margin-top: 82px;
  gap: 35px;
`;
const BottomBtnDiv = styled.div`
  width: 230px;
  height: 230px;
  background: #fafafa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 33px 13px 13px 13px;
  cursor: pointer;
  p {
    &:nth-child(2) {
      font-weight: 800;
      font-size: 18px;
      line-height: 18px;
      letter-spacing: 0.05em;
      margin-top: 24px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 11px;
      line-height: 11px;
      letter-spacing: 0.05em;
      margin-top: 9px;
    }
  }
`;
const BottomIconLeftDiv = styled.div`
  width: 110px;
  height: 110px;
  background-image: url(${pharmacy});
  background-size: contain;
  background-repeat: no-repeat;
`;
const BottomIconRightDiv = styled.div`
  width: 110px;
  height: 110px;
  background-image: url(${conversation});
  background-size: contain;
  background-repeat: no-repeat;
`;
const MainPageRightDiv = styled.div`
  min-width: 500px;
  background-image: url(${MainRight});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
