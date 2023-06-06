import styled from 'styled-components';
import onCurrentLocationIcon from '../assets/onCurrentLocationIcon.png';
import offCurrentLocationIcon from '../assets/offCurrentLocationIcon.png';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 27px;
  margin-top: 70px;
  margin-bottom: 50px;
`;
export const FilterButton = styled.button`
  background-color: ${props => (props.active ? '#fa5938' : '#F5F5F5')};
  color: ${props => (props.active ? '#ffffff' : '#AFAEB7')};
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 800;
`;
export const CurrentIconDiv = styled.div`
  width: 15px;
  height: 15px;
  background-image: ${props =>
    props.active
      ? `url(${onCurrentLocationIcon})`
      : `url(${offCurrentLocationIcon})`};
  background-size: cover;
`;
export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 9px;
`;
export const LocationIcon = styled.img`
  height: 46px;
  margin-left: 10px;
`;
export const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;
`;
export const CommentInfoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
`;
export const CommentIconImg = styled.img`
  width: 20px;
  height: 18px;
  margin-left: 15px;
  margin-right: 9px;
`;
export const CommentAddButton = styled.button`
  width: ${props => `${props.size}`};
  height: 40px;
  align-items: center;
  margin-top: 24px;
  background-color: #fa5938;
  border: none;
  border-radius: 32px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
export const ComposeImg = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 15px;
`;
export const InfoDiv = styled.div`
  width: 176px;
  height: 40px;
  background-color: #fd8b2b;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border-radius: 15px;
  padding: 14px 10px;
  font-weight: 800;
  font-size: 15px;
  line-height: 20px;
  margin-right: 47px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
`;
