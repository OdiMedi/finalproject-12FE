import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import storeIcon from '../../assets/storeTitleIcon.png';
import BookMark from '../BookMark';
import * as CSS from '../../style/globalStyle';

const PharmacyList = ({ data }) => {
  const navigate = useNavigate();
  const storeItemInfoMoveOnClickHandler = id => {
    navigate(`/mainPage/${id}`);
  };

  return (
    <Article>
      {data?.content.map(item => {
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
              <span>{item.weekdaysTime}</span>
            </CSS.DetailInformationDiv>
            <BookMark storeId={item.storeId} isCheck={item.bookmark} />
          </CSS.ItemBoxSection>
        );
      })}
    </Article>
  );
};

export default PharmacyList;

const Article = styled.article`
  width: 594px;
  height: 440px;
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  overflow-y: scroll;
  overflow-x: hidden;
`;
