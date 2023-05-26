import React from 'react';
import styled from 'styled-components';
import MapApi from '../mainPage/MapApi';
import * as CSS from '../globalStyle';
import locationIcon from '../../assets/locationIcon.png';
import commentIcon from '../../assets/commentIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import infoIcon from '../../assets/infoIcon.png';
import Comment from './Comment';

const dummyList = {
  storeId: 1,
  address: '서울특별시 강북구 번동 어쩌고 저쩌고',
  name: '삼성약국',
  businessHours: '수요일 09:00~18:00',
  callNumber: '02-122-3921',
};

const StoreDetail = () => {
  return (
    <CSS.MainContainer>
      <MapApi />
      <DetailBoxArticle>
        <CSS.TitleBox>
          <CSS.LocationIcon src={locationIcon} alt="" />
          <CSS.MainTitle>
            <NameStyleSpan>{dummyList.name}</NameStyleSpan> 오디약 ?
          </CSS.MainTitle>
        </CSS.TitleBox>
        <InfoMenuBox>
          <InfoTextDiv>
            <InfoIconImg src={infoIcon} alt="" />
            약국정보
          </InfoTextDiv>
          <InfoTextDiv>
            <MenuIconImg src={menuIcon} alt="" />
            목록
          </InfoTextDiv>
        </InfoMenuBox>
        <StoreDetailBoxDiv>
          <DetailImg>여기에는 대표이미지가 들어갈 예정</DetailImg>
          <div>
            <StoreDetailInfoBoxDiv></StoreDetailInfoBoxDiv>
            <OpenCheckBoxDiv>
              <CSS.FilterButton active="holiday">공휴일 영업</CSS.FilterButton>
              <CSS.FilterButton>야간 영업</CSS.FilterButton>
            </OpenCheckBoxDiv>
          </div>
        </StoreDetailBoxDiv>
        <Comment />
      </DetailBoxArticle>
    </CSS.MainContainer>
  );
};

export default StoreDetail;

const DetailBoxArticle = styled.article`
  width: 610px;
  height: 710px;
  display: flex;
  flex-direction: column;
  background-color: green;
`;
const NameStyleSpan = styled.span`
  color: #fa5938;
`;
// 약국정보, 목록 버튼 줄
const InfoMenuBox = styled.div`
  width: 610px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 15px;
`;
const InfoTextDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
const InfoIconImg = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 10px;
  margin-left: 19px;
`;
const MenuIconImg = styled.img`
  width: 18px;
  height: 15px;
  margin-right: 12px;
`;
// 상세 내용
const StoreDetailBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const StoreDetailInfoBoxDiv = styled.div`
  width: 250px;
  height: 163px;
  background-color: pink;
`;
const DetailImg = styled.div`
  width: 250px;
  height: 200px;
  background-color: pink;
  margin-left: 15px;
  margin-right: 35px;
`;
const OpenCheckBoxDiv = styled.div`
  width: 215px;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
`;
