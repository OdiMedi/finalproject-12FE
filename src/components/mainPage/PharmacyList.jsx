import React from 'react';
import styled from 'styled-components';
import storeIcon from '../../assets/storeTitleIcon.png';
import BookMark from '../BookMark';

const PharmacyList = () => {
  const dummyList = [
    {
      storeId: 1,
      address: '서울특별시 강서구 공항대로 437',
      name: '흥부약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.85581079958143,
      lat: 37.55496841887348,
    },
    {
      storeId: 2,
      address: '서울특별시 강서구 강서로 43-17, B104호(화곡동,오거닉스타워)',
      name: '희망찬약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.84676212183612,
      lat: 37.531164294971674,
    },
    {
      storeId: 3,
      address:
        '서울특별시 강서구 강서로 254  (화곡동, 우장산아이파크이편한세상)',
      name: '화곡서울약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.83671729194344,
      lat: 37.54843456317784,
    },
    {
      storeId: 4,
      address: '서울특별시 강서구 강서로 205, (화곡동)',
      name: '화곡태평양약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.8376196876418,
      lat: 37.54414899562802,
    },
    {
      storeId: 5,
      address: '서울특별시 강서구 공항대로41길 65, 132호 (등촌동, 그랜드상가',
      name: '화창한약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.84611739011669,
      lat: 37.56081981514185,
    },
    {
      storeId: 6,
      address: '서울특별시 강서구 곰달래로 252 (화곡동, 웰피아)',
      name: '휴베이스비타민약국',
      businessHours: '수요일 09:00~18:00',
      callNumber: '02-122-3921',
      lon: 126.837978157379,
      lat: 37.5348879429263,
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
            <BookMark />
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
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 66px;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
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
  width: 230px;
  font-size: 12px;
  padding-top: 11px;
  padding-bottom: 11px;
  gap: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
