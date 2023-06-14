import styled from 'styled-components';
import profile from '../assets/profile.png';

export const MypageContainer = styled.div`
  margin: 0 auto;
  margin-top: 57px;
  width: 70vw;
  margin-bottom: 100px;
`;
export const MypageTitleH1 = styled.h1`
  height: 43px;
  font-family: 'Pretendard';
  font-size: 36px;
  font-weight: 800;
  line-height: 43px;
  letter-spacing: 0.05em;
  margin-bottom: 40px;
  color: #0d0d0d;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
export const ProfileImg = styled.div`
  width: 180px;
  height: 180px;
  background-image: url(${profile});
  background-size: 180px 180px;
  border-radius: 50%;
`;
