import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import MypageIcon from '../../assets/mypageIcon.png';
import holiydayTrue from '../../assets/holidayTrue.png';
import holiydayFalse from '../../assets/holidayFalse.png';
import nightTimeTrue from '../../assets/nightTimeTrue.png';
import nightTimeFalse from '../../assets/nightTimeFalse.png';
import BookmarkCheck from '../../assets/bookmarkCheck.png';
import api from '../../api/axios';

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
  } = props;

  const queryClient = useQueryClient();

  const mypageBookmarkMutation = useMutation(
    () => api.post(`/api/bookmark/${storeId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getBookmark');
      },
    }
  );

  const bookmarkCancle = () => {
    mypageBookmarkMutation.mutate();
  };

  return (
    <BookmarkWrapDiv>
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
        {holidayBusiness ? (
          <BookMarkHolidayTrueDiv />
        ) : (
          <BookMarkHolidayFalseDiv />
        )}
        {nightBusiness ? <BookMarkNightTrueDiv /> : <BookMarkNightFalseDiv />}
      </BookMarkBtnDiv>
    </BookmarkWrapDiv>
  );
};

export default MypageBookmark;

const BookmarkWrapDiv = styled.div`
  position: relative;
  min-width: 43%;
  background: rgba(245, 245, 245, 0.3);
  border-radius: 15px;
  margin-bottom: 25px;
  padding: 32px 20px 31px 36px;
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
const BookMarkHolidayTrueDiv = styled.div`
  width: 100px;
  height: 40px;
  background-image: url(${holiydayTrue});
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkHolidayFalseDiv = styled.div`
  width: 100px;
  height: 40px;
  background-image: url(${holiydayFalse});
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkNightTrueDiv = styled.div`
  width: 100px;
  height: 40px;
  background-image: url(${nightTimeTrue});
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkNightFalseDiv = styled.div`
  width: 100px;
  height: 40px;
  background-image: url(${nightTimeFalse});
  background-size: contain;
  background-repeat: no-repeat;
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
