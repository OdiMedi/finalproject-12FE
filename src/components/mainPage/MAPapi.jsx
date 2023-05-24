import React, { useEffect } from 'react';
import styled from 'styled-components';
import locationIcon from '../../assets/locationIcon.png';

const { kakao } = window;

const MAPapi = () => {
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

    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(37.541, 126.986);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커를 지도에 표시
    marker.setMap(map);
  }, []);

  return <MapDiv id="myMap">MAPapi</MapDiv>;
};

export default MAPapi;

const MapDiv = styled.div`
  width: 580px;
  height: 710px;
`;
