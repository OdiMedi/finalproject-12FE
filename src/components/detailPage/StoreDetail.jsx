import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import MapApi from '../MapApi';
import { inquiryStoreDetail } from '../../api/storeList';
import infoIcon from '../../assets/infoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import * as CSS from '../../style/globalStyle';
import Comment from '../comment/Comment';
import BookMark from '../BookMark';

const StoreDetail = () => {
  const [isMore, setIsMore] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const moveStoreListClickHandler = () => {
    navigate('/mainPage');
  };

  const { data } = useQuery('inquiryStoreDetail', () =>
    inquiryStoreDetail(params.id)
  );

  const formattedTimeMoreButtonHandler = () => {
    setIsMore(!isMore);
  };
  const detailData = [data];
  console.log(data);

  return (
    <CSS.MainContainer>
      {data && (
        <>
          <MapApi storeLocation={detailData} navigate={navigate} />
          <CSS.DetailBoxArticle>
            <CSS.TitleBox>
              <CSS.LocationIcon src={locationIcon} alt="" />
              <CSS.MainTitle>
                <CSS.NameStyleSpan>{data.name}</CSS.NameStyleSpan> 오디약 ?
              </CSS.MainTitle>
            </CSS.TitleBox>
            <CSS.InfoMenuBoxDiv>
              <CSS.InfoTextDiv>
                <CSS.InfoIconImg src={infoIcon} alt="" />
                약국정보
              </CSS.InfoTextDiv>
              <CSS.InfoTextDiv
                role="button"
                onClick={moveStoreListClickHandler}
              >
                <CSS.MenuIconImg src={menuIcon} alt="" />
                <span>목록</span>
              </CSS.InfoTextDiv>
            </CSS.InfoMenuBoxDiv>
            <CSS.StoreDetailBoxDiv>
              <CSS.BookMarkPositionDiv>
                <BookmarkDiv>
                  <BookMark storeId={data.storeId} isCheck={data.bookmark} />
                </BookmarkDiv>
                <span>{data.totalBookmark}</span>
              </CSS.BookMarkPositionDiv>
              <CSS.StoreDetailInfoBoxDiv>
                <div>{data.name}</div>
                <div>{data.callNumber}</div>
                <div>{data.address}</div>
                <CSS.BusinessTimeDiv>
                  <div>{data.weekdaysTime}</div>
                  <CSS.MoreIconButton
                    onClick={formattedTimeMoreButtonHandler}
                  />
                </CSS.BusinessTimeDiv>
                {data.saturdayTime !== null && isMore && (
                  <div>토요일 {data.saturdayTime}</div>
                )}
                {data.sundayTime !== null && isMore && (
                  <div>일요일 {data.sundayTime}</div>
                )}
                {data.holidayTime !== null && isMore && (
                  <div>공휴일 {data.holidayTime}</div>
                )}
                <CSS.OpenCheckBoxDiv>
                  {data.holidayTime !== null && (
                    <CSS.BusinessTypeSpan>
                      <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
                      <span>공휴일 영업</span>
                    </CSS.BusinessTypeSpan>
                  )}
                  {data.nightBusiness !== null && (
                    <CSS.BusinessTypeSpan>
                      <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
                      <span>야간 영업</span>
                    </CSS.BusinessTypeSpan>
                  )}
                </CSS.OpenCheckBoxDiv>
              </CSS.StoreDetailInfoBoxDiv>
            </CSS.StoreDetailBoxDiv>
            <Comment storeId={data.storeId} />
          </CSS.DetailBoxArticle>
        </>
      )}
    </CSS.MainContainer>
  );
};

export default StoreDetail;

const BookmarkDiv = styled.div`
  z-index: 1;
`;
