import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import storeIcon from '../../assets/storeTitleIcon.png';
import BookMark from '../BookMark';

const PharmacyList = ({ data }) => {
  const navigate = useNavigate();
  const storeItemInfoMoveOnClickHandler = id => {
    navigate(`/mainPage/${id}`);
  };

  return (
    <Article>
      {data?.map(item => {
        return (
          <ItemBoxSection
            key={item.storeId}
            onClick={() => storeItemInfoMoveOnClickHandler(item.storeId)}
          >
            <TitleBoxDiv>
              <StoreIconImage src={storeIcon} alt="" />
              <TitleH1 size={item.name.length < 7 ? '20px' : '18px'}>
                {item.name}
              </TitleH1>
            </TitleBoxDiv>
            <DetailInformationDiv>
              <span>{item.callNumber}</span>
              <AddressSpan>{item.address}</AddressSpan>
              <span>{item.weekdaysTime}</span>
            </DetailInformationDiv>
            <BookMark storeId={item.storeId} isCheck={item.bookmark} />
          </ItemBoxSection>
        );
      })}
    </Article>
  );
};

export default PharmacyList;

const AddressSpan = styled.span`
  line-height: 1.3;
`;

const Article = styled.article`
  width: 594px;
  height: 480px;
  padding-left: 23px;
  padding-right: 23px;
  padding-top: 20px;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  overflow: scroll;
`;

const ItemBoxSection = styled.section`
  width: 594px;
  height: 78px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
  padding-top: 11px;
  padding-bottom: 11px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 30px;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;

// 리스트 타이틀
const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  margin-left: 25px;
`;
const StoreIconImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const TitleH1 = styled.h1`
  font-size: ${props => `${props.size}`};
  line-height: 1.2;
`;

// 상세정보
const DetailInformationDiv = styled.div`
  width: 280px;
  font-size: 12px;
  padding-top: 11px;
  padding-bottom: 11px;
  gap: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
