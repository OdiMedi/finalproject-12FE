import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import locationIcon from '../../assets/locationIcon.png';
import bubble from '../../assets/speechBubble.png';
import storeMap from '../../assets/storeMapIcon.png';

const { kakao } = window;

const MAPapi = () => {
  const dummyList = [
    {
      id: 1,
      name: '흥부약국',
      lon: 126.85581079958143,
      lat: 37.55496841887348,
    },
    {
      id: 2,
      name: '희망찬약국',
      lon: 126.84676212183612,
      lat: 37.531164294971674,
    },
    {
      id: 3,
      name: '화곡서울약국',
      lon: 126.83671729194344,
      lat: 37.54843456317784,
    },
    {
      id: 4,
      name: '화곡태평양약국',
      lon: 126.8376196876418,
      lat: 37.54414899562802,
    },
    {
      id: 5,
      name: '화창한약국',
      lon: 126.84611739011669,
      lat: 37.56081981514185,
    },
    {
      id: 6,
      name: '화평약국',
      lon: 126.86100108709572,
      lat: 37.53193095203476,
    },
    {
      id: 7,
      name: '휴베이스비타민약국',
      lon: 126.837978157379,
      lat: 37.5348879429263,
    },
  ];

  useEffect(() => {
    const container = document.getElementById('myMap');
    // 서울의 위도와 경도
    // const seoulLat = 37.5665;
    // const seoulLng = 126.978;
    const seoulLat = 37.5348879429263;
    const seoulLng = 126.837978157379;
    const options = {
      center: new kakao.maps.LatLng(seoulLat, seoulLng),
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

      // 커스텀 오버레이
      const content = (
        <CustomOverlayWrapperDiv
          size={lo.name.length < 7 ? '13px' : '11px'}
          key={lo.id}
        >
          <CustomOverlayIconImage src={storeMap} alt="" />
          {lo.name}
        </CustomOverlayWrapperDiv>
      );

      const customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: ReactDOMServer.renderToString(content),
        xAnchor: 0.55,
        yAnchor: 1.8,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        if (customOverlay.getMap()) {
          // 이미 열려있는 상태인 경우 닫기
          customOverlay.setMap(null);
        } else {
          // 닫혀있는 상태인 경우 열기
          customOverlay.setMap(map);
        }
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
const CustomOverlayWrapperDiv = styled.div`
  background-image: url(${bubble});
  background-size: 130px 47px;
  width: 100px;
  height: 42px;
  position: relative;
  padding-left: 30px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => `${props.size}`};
`;
const CustomOverlayIconImage = styled.image`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
`;
