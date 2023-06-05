import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MapApi from '../mainPage/MapApi';
import { inquiryStoreDetail } from '../../api/storeList';
import infoIcon from '../../assets/infoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import * as CSS from '../globalStyle';
import Comment from '../comment/Comment';

const ForeignPharmacyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const moveStoreListClickHandler = () => {
    navigate('/foreignPage');
  };

  const { data } = useQuery('inquiryStoreDetail', () =>
    inquiryStoreDetail(params.id)
  );

  const formattedTime = data ? data.weekdaysTime.slice(3, 15) : '';
  const detailData = [data];
  return (
    <CSS.MainContainer>
      {data && (
        <>
          <MapApi storeLocation={detailData} navigate={navigate} />
          <DetailBoxArticle>
            <CSS.TitleBox>
              <CSS.LocationIcon src={locationIcon} alt="" />
              <CSS.MainTitle>
                WHERE IS THE <NameStyleSpan>{data.name}</NameStyleSpan> ?
              </CSS.MainTitle>
            </CSS.TitleBox>
            <InfoMenuBoxDiv>
              <InfoTextDiv>
                <InfoIconImg src={infoIcon} alt="" />
                information
              </InfoTextDiv>
              <InfoTextDiv role="button" onClick={moveStoreListClickHandler}>
                <MenuIconImg src={menuIcon} alt="" />
                <span>list</span>
              </InfoTextDiv>
            </InfoMenuBoxDiv>
            <StoreDetailBoxDiv>
              <StoreDetailInfoBoxDiv>
                <div>{data.name}</div>
                <div>{data.callNumber}</div>
                <div>{data.address}</div>
                <div>Mon - Fri {formattedTime}</div>
                <OpenCheckBoxDiv>
                  <CSS.FilterButton active="holiday">
                    공휴일 영업
                  </CSS.FilterButton>
                  <CSS.FilterButton>야간 영업</CSS.FilterButton>
                </OpenCheckBoxDiv>
              </StoreDetailInfoBoxDiv>
            </StoreDetailBoxDiv>
            <Comment />
          </DetailBoxArticle>
        </>
      )}
    </CSS.MainContainer>
  );
};

export default ForeignPharmacyDetail;

const DetailBoxArticle = styled.article`
  width: 610px;
  height: 710px;
  display: flex;
  flex-direction: column;
`;
const NameStyleSpan = styled.span`
  color: #fa5938;
`;
// 약국정보, 목록 버튼 줄
const InfoMenuBoxDiv = styled.div`
  width: 610px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 15px;
`;
const InfoTextDiv = styled.div`
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
const InfoIconImg = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 10px;
  margin-left: 19px;
`;
const MenuIconImg = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 12px;
`;
// 상세 내용
const StoreDetailBoxDiv = styled.div`
  display: flex;
  margin-left: 30px;
`;
const StoreDetailInfoBoxDiv = styled.div`
  width: 610px;
  height: 110px;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const OpenCheckBoxDiv = styled.div`
  width: 215px;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  position: absolute;
  right: 40px;
  bottom: 9px;
`;
