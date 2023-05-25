import React from 'react';
import styled from 'styled-components';
import storeIcon from '../../assets/storeTitleIcon.png';

const PharmacyList = () => {
  const dummyList = [
    {
      storeId: 1,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
    {
      storeId: 2,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
    {
      storeId: 3,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
    {
      storeId: 4,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
    {
      storeId: 5,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
    {
      storeId: 6,
      address: '서울특별시 강북구 번동 어쩌고 저쩌고',
      name: '삼성약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
    },
  ];
  return (
    <Article>
      {dummyList.map(item => {
        return (
          <ItemBoxSection key={item.storeId}>
            <TitleBoxDiv>
              <StoreIconImage src={storeIcon} alt="" />
              <TitleH1>{item.name}</TitleH1>
            </TitleBoxDiv>
            <DetailInformationDiv>
              <div>{item.callNumber}</div>
              <div>{item.address}</div>
              <div>{item.businessHours}</div>
            </DetailInformationDiv>
          </ItemBoxSection>
        );
      })}
    </Article>
  );
};

export default PharmacyList;

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
  display: flex;
  flex-direction: row;
  gap: 66px;
`;

// 리스트 타이틀
const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 113px;
  margin-left: 44px;
`;
const StoreIconImage = styled.img`
  width: 30px;
  height: 30px;
`;
const TitleH1 = styled.h1`
  font-size: 20px;
`;

// 상세정보
const DetailInformationDiv = styled.div`
  font-size: 12px;
  padding-top: 11px;
  padding-bottom: 11px;
  gap: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
