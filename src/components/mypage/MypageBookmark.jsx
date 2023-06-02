import styled from 'styled-components';
import MypageIcon from '../../assets/mypageIcon.png';
import holyday from '../../assets/holiday.png';
import nightTime from '../../assets/nighttime.png';
import BookmarkCheck from '../../assets/bookmarkCheck.png';

const MypageBookmark = () => {
  return (
    <BookmarkWrapDiv>
      <BookMarkMainDiv />
      <BookmarkTitleDiv>
        <TitleImgDiv />
        <p>행복약국</p>
      </BookmarkTitleDiv>
      <BookMarkInfoDiv>
        <p>02 - XXX - XXXX</p>
        <p>서울특별시 노원구 공릉동</p>
        <p>평일 09:00 ~ 18:00</p>
      </BookMarkInfoDiv>
      <BookMarkTotalDiv>
        <BookMarkImgDiv />
        <span>132</span>
      </BookMarkTotalDiv>
      <BookMarkBtnDiv>
        <BookMarkHolidayDiv />
        <BookMarkNightDiv />
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
  /* background-image: url(${MypageIcon}); */
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
  /* background-image: url(${BookmarkCheck}); */
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkBtnDiv = styled.div`
  display: flex;
  gap: 15px;
`;
const BookMarkHolidayDiv = styled.div`
  width: 100px;
  height: 40px;
  /* background-image: url(${holyday}); */
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkNightDiv = styled.div`
  width: 100px;
  height: 40px;
  /* background-image: url(${nightTime}); */
  background-size: contain;
  background-repeat: no-repeat;
`;
const BookMarkMainDiv = styled.div`
  width: 30px;
  height: 26px;
  /* background-image: url(${BookmarkCheck}); */
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 22px;
  right: 20px;
`;
