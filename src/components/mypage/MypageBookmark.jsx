import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import MypageIcon from '../../assets/mypageIcon.png';
import holiydayTrue from '../../assets/holidayTrue.png';
import holiydayFalse from '../../assets/holidayFalse.png';
import nightTimeTrue from '../../assets/nightTimeTrue.png';
import nightTimeFalse from '../../assets/nightTimeFalse.png';
import BookmarkCheck from '../../assets/bookmarkCheck.png';
import api from '../../api/axios';
import * as CSS from '../../style/globalStyle';

const MypageBookmark = props => {
  const {
    storeId,
    address,
    name,
    callNumber,
    totalBookmark,
    weekdaysTime,
    holidayBusiness,
    nightBusiness,
    foreign,
  } = props;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mypageBookmarkMutation = useMutation(
    () => api.post(`/api/bookmark/${storeId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getBookmark');
      },
    }
  );

  const bookmarkCancle = event => {
    event.stopPropagation();
    mypageBookmarkMutation.mutate();
  };

  const bookmarkDetailPage = () => {
    if (foreign === false) {
      navigate(`/mainPage/${storeId}`);
    } else if (foreign === true) {
      navigate(`/foreignPage/${storeId}`);
    }
  };
  return (
    <BookmarkWrapDiv onClick={bookmarkDetailPage}>
      <BookMarkMainDiv onClick={bookmarkCancle} />
      <BookmarkTitleDiv>
        <TitleImgDiv />
        <p>{name}</p>
      </BookmarkTitleDiv>
      <BookMarkInfoDiv>
        <p>{callNumber}</p>
        <p>{address}</p>
        <p>{weekdaysTime}</p>
      </BookMarkInfoDiv>
      <BookMarkTotalDiv>
        <BookMarkImgDiv />
        <span>{totalBookmark}</span>
      </BookMarkTotalDiv>
      <BookMarkBtnDiv>
        {holidayBusiness && (
          <CSS.BusinessTypeSpan>
            <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
            <span>공휴일 영업</span>
          </CSS.BusinessTypeSpan>
        )}
        {nightBusiness && (
          <CSS.BusinessTypeSpan>
            <CSS.SharpStyleSpan># </CSS.SharpStyleSpan>
            <span>야간 영업</span>
          </CSS.BusinessTypeSpan>
        )}
      </BookMarkBtnDiv>
    </BookmarkWrapDiv>
  );
};

export default MypageBookmark;

const BookmarkWrapDiv = styled.div`
  position: relative;
  width: calc(50% - 60px);
  background: rgba(245, 245, 245, 0.3);
  border-radius: 15px;
  margin-bottom: 25px;
  padding: 32px 20px 31px 36px;
  cursor: pointer;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;
const BookmarkTitleDiv = styled.div`
  display: flex;
  margin-bottom: 5px;
  p {
    font-weight: 800;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const TitleImgDiv = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${MypageIcon});
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 12px;
`;
const BookMarkInfoDiv = styled.div`
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const BookMarkTotalDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const BookMarkImgDiv = styled.div`
  width: 16px;
  height: 14px;
  background-image: url(${BookmarkCheck});
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkBtnDiv = styled.div`
  display: flex;
  gap: 15px;
`;

const BookMarkMainDiv = styled.div`
  width: 30px;
  height: 26px;
  background-image: url(${BookmarkCheck});
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 22px;
  right: 20px;
  cursor: pointer;
`;
