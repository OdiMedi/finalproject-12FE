import React, { useEffect } from 'react';
import styled from 'styled-components';
import locationIcon from '../../assets/locationIcon.png';

const { kakao } = window;

const MAPapi = () => {
  const dummyList = [
    {
      name: '흥부약국',
      lon: 126.85581079958143,
      lat: 37.55496841887348,
    },
    {
      name: '희망찬약국',
      lon: 126.84676212183612,
      lat: 37.531164294971674,
    },
    {
      name: '화곡서울약국',
      lon: 126.83671729194344,
      lat: 37.54843456317784,
    },
    {
      name: '화곡태평양약국',
      lon: 126.8376196876418,
      lat: 37.54414899562802,
    },
    {
      name: '화창한약국',
      lon: 126.84611739011669,
      lat: 37.56081981514185,
    },
    {
      name: '화평약국',
      lon: 126.86100108709572,
      lat: 37.53193095203476,
    },
    {
      name: '휴베이스비타민약국',
      lon: 126.837978157379,
      lat: 37.5348879429263,
    },
  ];

  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.541, 126.986),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 이미지 변경
    const imageSrc = locationIcon;
    const imageSize = new kakao.maps.Size(40, 40);
    const imageOption = { offset: new kakao.maps.Point(27, 40) };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 마커 생성 및 지도에 추가
    dummyList.forEach(lo => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lo.lat, lo.lon),
        image: markerImage,
      });
      marker.setMap(map);
    });
  }, []);

  return <MapDiv id="myMap">MAPapi</MapDiv>;
};

export default MAPapi;

const MapDiv = styled.div`
  width: 580px;
  height: 710px;
`;
