import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import MapApi from '../mainPage/MapApi';
import { inquiryStoreDetail } from '../../api/storeList';
import infoIcon from '../../assets/infoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import menuIcon from '../../assets/menuIcon.png';
import * as CSS from '../globalStyle';
import Comment from '../comment/Comment';

const dummyList = {
  storeId: 1,
  address: '서울특별시 강북구 번동 어쩌고 저쩌고 저쩌고 어쩌고 ',
  name: '희망찬약국',
  businessHours: '수요일 09:00~18:00',
  callNumber: '02-122-3921',
  lon: 126.84676212183612,
  lat: 37.531164294971674,
};
const StoreDetail = () => {
  const params = useParams();
  const storeId = params.id;

  const { data } = useQuery('inquiryStoreDetail', () =>
    inquiryStoreDetail(params.id)
  );

  // console.log('상세페이지', data);

  const detailData = [data];
  return (
    <CSS.MainContainer>
      {/* {detailData && <MapApi storeLocation={detailData} />} */}
      {data && (
        <DetailBoxArticle>
          <CSS.TitleBox>
            <CSS.LocationIcon src={locationIcon} alt="" />
            <CSS.MainTitle>
              <NameStyleSpan>{data.name}</NameStyleSpan> 오디약 ?
            </CSS.MainTitle>
          </CSS.TitleBox>
          <InfoMenuBoxDiv>
            <InfoTextDiv>
              <InfoIconImg src={infoIcon} alt="" />
              약국정보
            </InfoTextDiv>
            <InfoTextDiv>
              <MenuIconImg src={menuIcon} alt="" />
              목록
            </InfoTextDiv>
          </InfoMenuBoxDiv>
          <StoreDetailBoxDiv>
            <StoreDetailInfoBoxDiv>
              <div>{data.name}</div>
              <div>{data.callNumber}</div>
              <div>{data.address}</div>
              <div>{data.weekdaysTime}</div>
              <OpenCheckBoxDiv>
                <CSS.FilterButton active="holiday">
                  공휴일 영업
                </CSS.FilterButton>
                <CSS.FilterButton>야간 영업</CSS.FilterButton>
              </OpenCheckBoxDiv>
            </StoreDetailInfoBoxDiv>
          </StoreDetailBoxDiv>
          <Comment storeId={storeId} />
        </DetailBoxArticle>
      )}
    </CSS.MainContainer>
  );
};

export default StoreDetail;

const DetailBoxArticle = styled.article`
  width: 610px;
  height: 710px;
  display: flex;
  flex-direction: column;
`;
const NameStyleSpan = styled.span`
  color: #fa5938;
`;
// 약국정보, 목록 버튼 줄
const InfoMenuBoxDiv = styled.div`
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
  margin-top: 15px;
  margin-bottom: 15px;
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
  margin-left: 30px;
`;
const StoreDetailInfoBoxDiv = styled.div`
  width: 610px;
  height: 110px;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const OpenCheckBoxDiv = styled.div`
  width: 215px;
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  position: absolute;
  right: 40px;
  bottom: 9px;
`;
