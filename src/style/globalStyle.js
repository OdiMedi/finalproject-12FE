import styled from 'styled-components';
import onCurrentLocationIcon from '../assets/onCurrentLocationIcon.png';
import offCurrentLocationIcon from '../assets/offCurrentLocationIcon.png';
import searchIcon from '../assets/icon _search_.png';
import locationInfoIcon from '../assets/locationInfoIcon.png';
import moreIcon from '../assets/moreIcon.png';

// 전체리스트 페이지 (MainPage)
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
  width: 110px;
  height: 40px;
  border: none;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 16px;
  position: relative;
  cursor: pointer;
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
  width: 46px;
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
export const LocationInfoIconDiv = styled.div`
  background-image: url(${locationInfoIcon});
  background-size: cover;
  width: 213px;
  height: 48px;
  position: absolute;
  top: 42px;
  background-color: transparent;
`;
export const InfoP = styled.div`
  margin-top: 23px;
  display: flex;
  justify-content: center;
  letter-spacing: -0.5px;
  font-weight: 600;
  font-size: 10px;
  line-height: 10px;
  color: #ffffff;
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
// 검색 박스
export const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 26px;
`;
export const SearchInput = styled.input`
  width: 530px;
  height: 54px;
  font-size: 20px;
  background-color: #f5f5f5;
  border: none;
  padding-left: 30px;
  border-radius: 10px;
  margin-left: 13px;
  &:focus {
    outline: none;
  }
`;
export const SearchButton = styled.button`
  width: 54px;
  height: 54px;
  background-color: #fa5938;
  border-radius: 10px;
  border: none;
  background-image: url(${searchIcon});
  background-size: 26px 26px;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
// 검색버튼 전체 박스
export const AllSearchButtonBoxDiv = styled.div`
  display: flex;
  flex: row;
  gap: 68px;
  margin-top: 19px;
  margin-left: 13px;
  margin-bottom: 20px;
  align-items: center;
`;
// 검색버튼 박스
export const SearchButtonBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 220px;
`;
// 필터 버튼
export const FilterBoxDiv = styled.div`
  width: 340px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 약국 리스트 컴포넌트
export const ItemBoxSection = styled.section`
  width: 594px;
  height: 78px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 30px;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
// 리스트 타이틀
export const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  margin-left: 25px;
`;
export const StoreIconImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
export const TitleH1 = styled.h1`
  font-size: ${props => `${props.size}`};
  line-height: 1.2;
`;
// 상세정보
export const DetailInformationDiv = styled.div`
  width: 280px;
  font-size: 12px;
  padding-top: 11px;
  padding-bottom: 11px;
  gap: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.3;
`;

// 상세페이지
export const DetailBoxArticle = styled.article`
  width: 610px;
  height: 710px;
  display: flex;
  flex-direction: column;
`;
export const NameStyleSpan = styled.span`
  color: #fa5938;
`;
// 약국정보, 목록 버튼 줄
export const InfoMenuBoxDiv = styled.div`
  width: 610px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 15px;
`;
export const InfoTextDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    transform: scale(1.08);
  }
`;
// 상세 내용
export const StoreDetailBoxDiv = styled.div`
  display: flex;
  margin-left: 30px;
  position: relative;
`;

export const BookMarkPositionDiv = styled.div`
  position: absolute;
  left: 320px;
  gap: 8px;
  display: flex;
  font-size: 23px;
`;
export const BusinessTypeSpan = styled.span`
  font-style: normal;
  font-weight: 600;
`;
export const SharpStyleSpan = styled.span`
  color: #fa5938;
`;
export const StoreDetailInfoBoxDiv = styled.div`
  width: 610px;
  height: 197px;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;
export const OpenCheckBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  position: absolute;
  right: 40px;
  bottom: 100px;
  gap: 20px;
`;
export const InfoIconImg = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 10px;
  margin-left: 19px;
`;
export const MenuIconImg = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 12px;
`;

export const MoreIconButton = styled.button`
  background-image: url(${moreIcon});
  background-size: cover;
  width: 18px;
  height: 10px;
  margin-left: 6px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const BusinessTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ListNumberBoxDiv = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 10px;
  color: #afaeb7;
`;
export const ListNumberButton = styled.button`
  font-weight: ${({ isActive }) => (isActive ? '800' : '400')};
  font-size: ${({ isActive }) => (isActive ? '16px' : '14px')};
  color: #686868;
  background-color: transparent;
  height: 30px;
  border: none;
  cursor: pointer;
`;
