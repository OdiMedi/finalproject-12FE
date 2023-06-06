import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MapApi from '../MapApi';
import { ForeignStoreDetail } from '../../api/foreignList';
import infoIcon from '../../assets/infoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import * as CSS from '../globalStyle';
import Comment from '../comment/Comment';
import BookMark from '../BookMark';

const ForeignPharmacyDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const moveStoreListClickHandler = () => {
    navigate('/foreignPage');
  };

  const { data } = useQuery('ForeignStoreDetail', () =>
    ForeignStoreDetail(params.id)
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
              <BookMarkPositionDiv>
                <BookMark storeId={data.storeId} isCheck={data.bookmark} />
                <span>{data.totalBookmark}</span>
              </BookMarkPositionDiv>
              <StoreDetailInfoBoxDiv>
                <div>{data.name}</div>
                <div>{data.callNumber}</div>
                <div>{data.address}</div>
                <div>Mon - Fri {formattedTime}</div>
                <OpenCheckBoxDiv>
                  {data.holidayTime !== null && (
                    <BusinessTypeSpan>
                      <SharpStyleSpan># </SharpStyleSpan>
                      <span>HOLIDAYS OPEN</span>
                    </BusinessTypeSpan>
                  )}
                  {data.nightBusiness !== null && (
                    <BusinessTypeSpan>
                      <SharpStyleSpan># </SharpStyleSpan>
                      <span>NIGHT OPEN</span>
                    </BusinessTypeSpan>
                  )}
                </OpenCheckBoxDiv>
              </StoreDetailInfoBoxDiv>
            </StoreDetailBoxDiv>
            <Comment storeId={data.storeId} />
          </DetailBoxArticle>
        </>
      )}
    </CSS.MainContainer>
  );
};

export default ForeignPharmacyDetail;

const BookMarkPositionDiv = styled.div`
  position: absolute;
  left: 320px;
  gap: 8px;
  display: flex;
  font-size: 23px;
`;
const BusinessTypeSpan = styled.span`
  font-style: normal;
  font-weight: 600;
`;
const SharpStyleSpan = styled.span`
  color: #fa5938;
`;
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
  position: relative;
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
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  position: absolute;
  right: 40px;
  bottom: 9px;
  gap: 20px;
`;
