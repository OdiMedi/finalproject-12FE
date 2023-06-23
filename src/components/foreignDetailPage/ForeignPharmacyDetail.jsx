import styled, { keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import MapApi from '../MapApi';
import { ForeignStoreDetail } from '../../api/foreignList';
import infoIcon from '../../assets/infoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import * as CSS from '../../style/globalStyle';
import Comment from '../comment/Comment';
import BookMark from '../BookMark';

const ForeignPharmacyDetail = () => {
  const [isMore, setIsMore] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const moveStoreListClickHandler = () => {
    navigate('/foreignPage');
  };

  const { data } = useQuery('ForeignStoreDetail', () =>
    ForeignStoreDetail(params.id)
  );

  const formattedTimeMoreButtonHandler = () => {
    setIsMore(!isMore);
  };

  const formattedTime = data ? data.weekdaysTime.slice(3, 17) : '';
  const detailData = [data];
  return (
    <CSS.MainContainer>
      {data && (
        <>
          <MapApi storeLocation={detailData} navigate={navigate} />
          <CSS.DetailBoxArticle>
            <CSS.TitleBox>
              <CSS.LocationIcon src={locationIcon} alt="" />
              <CSS.MainTitle>
                WHERE IS THE <CSS.NameStyleSpan>{data.name}</CSS.NameStyleSpan>{' '}
                ?
              </CSS.MainTitle>
            </CSS.TitleBox>
            <CSS.InfoMenuBoxDiv>
              <CSS.InfoTextDiv>
                <CSS.InfoIconImg src={infoIcon} alt="" />
                information
              </CSS.InfoTextDiv>
              <CSS.InfoTextDiv
                hover="hover"
                role="button"
                onClick={moveStoreListClickHandler}
              >
                <CSS.MenuIconImg src={menuIcon} alt="" />
                <span>Go back</span>
              </CSS.InfoTextDiv>
            </CSS.InfoMenuBoxDiv>
            <CSS.StoreDetailBoxDiv>
              <CSS.BookMarkPositionDiv>
                <BookmarkDiv>
                  <BookMark
                    storeId={data.storeId}
                    isCheck={data.bookmark}
                    miniSize="detail"
                  />
                </BookmarkDiv>
                <span>{data.totalBookmark}</span>
              </CSS.BookMarkPositionDiv>
              <CSS.StoreDetailInfoBoxDiv>
                <div>{data.name}</div>
                <div>{data.callNumber}</div>
                <div>{data.address}</div>
                <CSS.BusinessTimeDiv>
                  <div>Mon - Fri {formattedTime}</div>
                  <CSS.MoreIconButton
                    onClick={formattedTimeMoreButtonHandler}
                  />
                </CSS.BusinessTimeDiv>
                {data.saturdayTime !== null && isMore && (
                  <DateDiv>SaturdayTime {data.saturdayTime}</DateDiv>
                )}
                {data.sundayTime !== null && isMore && (
                  <DateDiv>SundayTime {data.sundayTime}</DateDiv>
                )}
                {data.holidayTime !== null && isMore && (
                  <DateDiv>HolidayTime {data.holidayTime}</DateDiv>
                )}

                <CSS.OpenCheckBoxDiv>
                  {data.holidayTime !== null && (
                    <CSS.BusinessTypeSpan>
                      <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
                      <span>HOLIDAYS OPEN</span>
                    </CSS.BusinessTypeSpan>
                  )}
                  {data.nightBusiness !== null && (
                    <CSS.BusinessTypeSpan>
                      <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
                      <span>NIGHT OPEN</span>
                    </CSS.BusinessTypeSpan>
                  )}
                </CSS.OpenCheckBoxDiv>
              </CSS.StoreDetailInfoBoxDiv>
            </CSS.StoreDetailBoxDiv>
            <Comment
              totalCommentsNum={data.totalCommentsNum}
              storeId={data.storeId}
              location="foreignPage"
            />
          </CSS.DetailBoxArticle>
        </>
      )}
    </CSS.MainContainer>
  );
};

export default ForeignPharmacyDetail;
const BookmarkDiv = styled.div`
  z-index: 1;
`;
// 키프레임 정의
const slideDown = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
`;

// 애니메이션을 적용할 컴포넌트 스타일 정의
const DateDiv = styled.div`
  animation: ${slideDown} 0.5s ease-out;
`;
