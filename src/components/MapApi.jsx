import { useEffect, useState } from 'react';

import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import locationIcon from '../assets/locationIcon.png';
import bubble from '../assets/speechBubble.png';
import storeMap from '../assets/storeMapIcon.png';
import currentMarkIcon from '../assets/currentMarkIcon.png';

const { kakao } = window;

const MapApi = ({ storeLocation, isCurrent, navigate }) => {
  const [currentLocation, setCurrentLocation] = useState({
    center: {
      latitude: storeLocation.length > 0 ? storeLocation[0].latitude : 37.541,
      longitude:
        storeLocation.length > 0 ? storeLocation[0].longitude : 126.986,
    },
    errMsg: null,
    isLoading: true,
  });

  // Marker image
  const currentImageSrc = currentMarkIcon;

  const imageSrc = locationIcon;
  const imageSize = new kakao.maps.Size(25, 25);
  const imageOption = { offset: new kakao.maps.Point(20, 30) };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const currentMarkerImage = new kakao.maps.MarkerImage(
    currentImageSrc,
    imageSize,
    imageOption
  );
  const loadMap = center => {
    // 'myMap'ID를 가진 요소 참조
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(center.latitude, center.longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const overlayClickDetailPageHandler = id => {
      navigate(`/mainPage/${id}`);
    };

    // 마커를 지도에 보여주기
    storeLocation.forEach(location => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
        image: markerImage,
      });
      // Custom overlay
      const content = (
        <CustomOverlayWrapperDiv
          role="button"
          onClick={() => overlayClickDetailPageHandler(location.storeId)}
          size={location.name.length < 7 ? '13px' : '11px'}
          key={location.storeId}
        >
          <CustomOverlayIconImage src={storeMap} alt="" />
          {location.name}
        </CustomOverlayWrapperDiv>
      );
      const customOverlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        content: ReactDOMServer.renderToString(content),
        xAnchor: 0.55,
        yAnchor: 1.6,
      });

      // 마커에 마우스 오버 이벤트 추가
      kakao.maps.event.addListener(marker, 'mouseover', () => {
        customOverlay.setMap(map);
        marker.setImage(
          new kakao.maps.MarkerImage(
            imageSrc,
            new kakao.maps.Size(30, 30),
            imageOption
          )
        );
      });

      // 마커에 마우스 아웃 이벤트 추가
      kakao.maps.event.addListener(marker, 'mouseout', () => {
        customOverlay.setMap(null);

        marker.setImage(
          new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
        );
      });

      // 마커 클릭 시 오버레이 토글
      kakao.maps.event.addListener(marker, 'click', () => {
        customOverlay.setMap(map);
        overlayClickDetailPageHandler(location.storeId);
      });

      marker.setMap(map);
    });

    return map; // map 객체 반환
  };

  // useEffect(() => {
  //   loadMap(currentLocation.center);
  // }, [currentLocation]);
  useEffect(() => {
    if (storeLocation.length === 0) {
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
    }
    loadMap(currentLocation.center);
  }, [currentLocation]);

  useEffect(() => {
    if (storeLocation.length > 0) {
      setCurrentLocation(prev => ({
        ...prev,
        center: {
          latitude: storeLocation[0].latitude,
          longitude: storeLocation[0].longitude,
        },
      }));
    }
  }, [storeLocation]);
  const getCurrentLocation = () => {
    if (!isCurrent) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(prev => ({
            ...prev,
            center,
            isLoading: false,
          }));
          const map = loadMap(center);

          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(center.latitude, center.longitude),
            image: currentMarkerImage,
          });
          marker.setMap(map);
        },
        err => {
          setCurrentLocation(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setCurrentLocation(prev => ({
        ...prev,
        errMsg: 'geolocation을 사용할 수 없어요..',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [isCurrent]);

  return <MapDiv id="myMap">지도를 불러오고 있습니다.</MapDiv>;
};

export default MapApi;

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
const CustomOverlayIconImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
`;
