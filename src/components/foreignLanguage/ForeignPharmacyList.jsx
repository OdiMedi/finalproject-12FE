import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import storeIcon from '../../assets/storeTitleIcon.png';
import BookMark from '../BookMark';
import * as CSS from '../../style/globalStyle';

const ForeignPharmacyList = ({ data }) => {
  const navigate = useNavigate();

  const storeItemInfoMoveOnClickHandler = id => {
    navigate(`/foreignPage/${id}`);
  };

  return (
    <Article>
      {data?.content.map(item => {
        const formattedTime = `${item.weekdaysTime.slice(3, 17)}`;
        return (
          <CSS.ItemBoxSection
            key={item.storeId}
            onClick={() => storeItemInfoMoveOnClickHandler(item.storeId)}
          >
            <CSS.TitleBoxDiv>
              <CSS.StoreIconImage src={storeIcon} alt="" />
              <CSS.TitleH1 size={item.name.length < 7 ? '20px' : '18px'}>
                {item.name}
              </CSS.TitleH1>
            </CSS.TitleBoxDiv>
            <CSS.DetailInformationDiv>
              <span>{item.callNumber}</span>
              <span>{item.address}</span>
              <span>Mon - Fri {formattedTime}</span>
            </CSS.DetailInformationDiv>
            <CSS.BookMarkBoxDiv>
              <BookMark storeId={item.storeId} isCheck={item.bookmark} />
              <p>{item.bookmarkCount}</p>
            </CSS.BookMarkBoxDiv>
          </CSS.ItemBoxSection>
        );
      })}
    </Article>
  );
};

export default ForeignPharmacyList;

const Article = styled.article`
  width: 593px;
  height: 340px;
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    /* width: 10px; */
    height: 10%;
    background-color: #dadada;
    border-radius: 10px;
    height: 30px;
  }
  &::-webkit-scrollbar-track {
    background-color: #dadada;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    background-clip: padding-box;
  }
`;
