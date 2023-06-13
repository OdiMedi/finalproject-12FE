import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
                role="button"
                onClick={moveStoreListClickHandler}
              >
                <CSS.MenuIconImg src={menuIcon} alt="" />
                <span>list</span>
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
                  <div>saturdayTime {data.saturdayTime}</div>
                )}
                {data.sundayTime !== null && isMore && (
                  <div>sundayTime {data.sundayTime}</div>
                )}
                {data.holidayTime !== null && isMore && (
                  <div>holidayTime {data.holidayTime}</div>
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
            <Comment storeId={data.storeId} />
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
