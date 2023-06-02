import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';
import locationIcon from '../../assets/locationIcon.png';
import bubble from '../../assets/speechBubble.png';
import storeMap from '../../assets/storeMapIcon.png';

const { kakao } = window;


const MapApi = ({ storeLocation, isCurrent }) => {

  const [currentLocation, setCurrentLocation] = useState({
    center: {
      latitude: 37.5348879429263,
      longitude: 126.837978157379,
    },
    errMsg: null,
    isLoading: true,
  });
  // // eslint-disable-next-line no-debugger
  // debugger;
  // Marker image
  const imageSrc = locationIcon;
  const imageSize = new kakao.maps.Size(40, 40);
  const imageOption = { offset: new kakao.maps.Point(27, 40) };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const loadMap = center => {
    // 'myMap'ID를 가진 요소 참조
    const container = document.getElementById('myMap');
    const options = {

      // 지도가 처음 보여주는 위치 1개만 내려올경우 그걸 보여주면 되지만 여러개 불러와지면 어떻게 처리할지 고민
      center: new kakao.maps.LatLng(center.latitude, center.longitude),
      level: 9,

    };
    const map = new kakao.maps.Map(container, options);

    // 마커를 지도에 보여주기

    storeLocation.forEach(location => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
        image: markerImage,
      });

      // Custom overlay
      const content = (
        <CustomOverlayWrapperDiv
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
        yAnchor: 1.8,
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        if (customOverlay.getMap()) {
          customOverlay.setMap(null);
        } else {
          customOverlay.setMap(map);
        }
      });

      marker.setMap(map);
    });

    return map; // map 객체 반환
  };

  useEffect(() => {
    loadMap(currentLocation.center);
  }, []);

  const getCurrentLocation = () => {
    if (!isCurrent) return; // isCurrent가 false이면 함수 실행하지 않음

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const center = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // 내 위치
          console.log(center);
          setCurrentLocation(prev => ({
            ...prev,
            center,
            isLoading: false,
          }));
          const map = loadMap(center); // loadMap 호출 후 반환된 map 변수를 받음

          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(center.latitude, center.longitude),
            image: markerImage,
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
    loadMap(currentLocation.center);
    getCurrentLocation(); // isCurrent prop이 변경될 때마다 getCurrentLocation 함수 호출
  }, [isCurrent]); // isCurrent prop을 의존성 배열에 추가

  return (
    <BackgroundDiv>
      <MapDiv id="myMap">지도를 불러오고 있습니다.</MapDiv>
    </BackgroundDiv>
  );
};

export default MapApi;

const BackgroundDiv = styled.div`
  position: relative;
`;
const Button = styled.button`
  position: absolute;
  top: 0;
  z-index: 1;
`;

const MapDiv = styled.div`
  width: 580px;
  height: 710px;
`;
const CustomOverlayWrapperDiv = styled.div`
  background-image: url(${bubble});
  background-size: 130px 47px;
  width: 100px;
  height: 42px;
  position: relatitudeive;
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
