import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ForeignPharmacyList from './ForeignPharmacyList';
import MapApi from '../MapApi';
import * as CSS from '../../style/globalStyle';
import { ForeignStoreFilterList } from '../../api/foreignList';

import locationIcon from '../../assets/locationIcon.png';
import polygon from '../../assets/Polygon.png';
import languageInfoIcon from '../../assets/languageInfoIcon.png';

const IndicatorSeparator = null;
const DropdownIndicator = () => <PolygonIcon />;
const customComponents = { IndicatorSeparator, DropdownIndicator };

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'transparent' : provided.borderColor,
    boxShadow: state.isFocused ? 'none' : provided.boxShadow,
  }),
};

const gu = [
  'gangnam-gu',
  'gangdong-gu',
  'gangbuk-gu',
  'gangseo-gu',
  'gwanak-gu',
  'gwangjin-gu',
  'guro-gu',
  'geumcheon-gu',
  'nowon-gu',
  'dobong-gu',
  'dongdaemun-gu',
  'dongjak-gu',
  'Mapo-gu',
  'seodaemun-gu',
  'seocho-gu',
  'seongdong-gu',
  'seongbuk-gu',
  'songpa-gu',
  'yeongdeungpo-gu',
  'yangcheon-gu',
  'yongsan-gu',
  'eunpyeong-gu',
  'jongno-gu',
  'jung-gu',
  'jungnang-gu',
];

const ForeignMainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');
  const [storeList, setStoreList] = useState(null);
  const [selectedButton, setSelectedButton] = useState('');
  const [languageSelectedButton, setLanguageSelectedButton] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [isLocationInfo, setIsLocationInfo] = useState(false);
  const [isLanguageInfo, setIsLanguageInfo] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [keyboard, setKeyboard] = useState([]);
  const navigate = useNavigate();

  // 전체리스트 api로직
  const mutation = useMutation(ForeignStoreFilterList, {
    onSuccess: data => {
      setStoreList(data);
    },
    onError: error => {
      alert(error.message);
    },
  });
  const statusGuOptions = gu.map(location => ({
    value: location,
    label: location,
  }));

  const [selectGuStatus, setSelectGuStatus] = useState(statusGuOptions[0]);
  const onChangeNameSearchHandler = e => {
    setName(e.target.value);
  };

  const [searchData, setSearchData] = useState({
    name,
    gu: currentLatitude === '' ? selectGuStatus.value : '',
    open: selectedButton === 'open',
    holidayBusiness: selectedButton === 'holidayBusiness',
    nightBusiness: selectedButton === 'nightBusiness',
    currentLatitude: currentLatitude === undefined ? '' : currentLatitude,
    currentLongitude: currentLongitude === undefined ? '' : currentLongitude,
    english: languageSelectedButton === 'english',
    chinese: languageSelectedButton === 'chinese',
    japanese: languageSelectedButton === 'japanese',
  });

  useEffect(() => {
    mutation.mutate(searchData);
  }, [searchData]);

  // 언어 안내아이콘 버튼 hover 이벤트
  const languageHandleMouseEnter = () => {
    setIsLanguageInfo(true);
  };

  const languageHandleMouseLeave = () => {
    setIsLanguageInfo(false);
  };

  // 내위치 버튼 hover 이벤트
  const LocationHandleMouseEnter = () => {
    setIsLocationInfo(true);
  };

  const LocationHandleMouseLeave = () => {
    setIsLocationInfo(false);
  };
  // searchData 객체의 변화 감지를 위해 새로운 상태로 업데이트
  const updateSearchData = () => {
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      name,
      gu: currentLatitude === '' ? selectGuStatus.value : '',
      open: selectedButton === 'open',
      holidayBusiness: selectedButton === 'holidayBusiness',
      nightBusiness: selectedButton === 'nightBusiness',
      currentLatitude: currentLatitude === undefined ? '' : currentLatitude,
      currentLongitude: currentLongitude === undefined ? '' : currentLongitude,
      english: languageSelectedButton === 'english',
      chinese: languageSelectedButton === 'chinese',
      japanese: languageSelectedButton === 'japanese',
    }));
  };

  // 검색 조건이 변경될 때마다 searchData 업데이트
  useEffect(() => {
    updateSearchData();
  }, [
    selectedButton,
    currentLatitude,
    currentLongitude,
    languageSelectedButton,
  ]);
  useEffect(() => {
    if (isCurrent) {
      setCurrentLatitude('');
      setCurrentLongitude('');
      setIsCurrent(!isCurrent);
    } else {
      updateSearchData();
    }
  }, [selectGuStatus]);
  const onClickSearchButtonHandler = () => {
    updateSearchData();
  };
  const filterButtonClickHandler = button => {
    setSelectedButton(prevSelectedButton => {
      if (prevSelectedButton === button) {
        return ''; // 이미 선택된 버튼을 다시 클릭한 경우 선택 해제
      }
      return button; // 새로운 버튼 선택
    });
  };
  const filterLanguageButtonClickHandler = button => {
    setLanguageSelectedButton(prevLanguageSelectedButton => {
      if (prevLanguageSelectedButton === button) {
        return ''; // 이미 선택된 버튼을 다시 클릭한 경우 선택 해제
      }
      return button; // 새로운 버튼 선택
    });
  };

  const currentLocationButtonHandler = () => {
    setIsCurrent(!isCurrent);
    if (!isCurrent) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude, longitude } = coords;
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);
          },
          error => {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
          }
        );
      } else {
        console.error('Geolocation이 지원되지 않는 환경입니다.');
      }
    }
  };
  useEffect(() => {
    // storeList?.numberOfElements 값이 변경될 때마다 keyboard 배열 업데이트
    if (storeList?.totalPages !== undefined) {
      const newKeyboard = Array.from(
        { length: storeList.totalPages },
        (v, i) => i
      );
      setKeyboard(newKeyboard);
    }
  }, [storeList?.numberOfElements]);
  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };
  return (
    <CSS.MainContainer>
      {storeList && (
        <MapApi
          storeLocation={storeList.content}
          isCurrent={isCurrent}
          navigate={navigate}
        />
      )}
      <div>
        <CSS.TitleBox>
          <CSS.LocationIcon src={locationIcon} alt="" />
          <MainTitle>WHERE IS THE PHARMACY?</MainTitle>
        </CSS.TitleBox>
        <CSS.SearchBox>
          <CSS.SearchInput
            value={name}
            onChange={onChangeNameSearchHandler}
            placeholder="Search For a Pharmacy Name or Select a Filter"
          />
          <CSS.SearchButton onClick={onClickSearchButtonHandler} />
        </CSS.SearchBox>
        <CSS.AllSearchButtonBoxDiv>
          <CSS.SearchButtonBoxDiv>
            <StyledSelect
              defaultValue={selectGuStatus}
              onChange={setSelectGuStatus}
              options={statusGuOptions}
              components={customComponents}
              styles={customStyles}
            />
            <CSS.FilterButton
              onClick={() => currentLocationButtonHandler('currentLocation')}
              active={isCurrent === true}
              onMouseEnter={LocationHandleMouseEnter}
              onMouseLeave={LocationHandleMouseLeave}
            >
              <CSS.CurrentIconDiv active={isCurrent === true} />
              GPS
              {isLocationInfo && (
                <CSS.LocationInfoIconDiv>
                  <CSS.InfoP>
                    Indicate nearby pharmacies in street order.
                  </CSS.InfoP>
                </CSS.LocationInfoIconDiv>
              )}
            </CSS.FilterButton>
          </CSS.SearchButtonBoxDiv>
          <CSS.FilterBoxDiv>
            <CSS.FilterButton
              onClick={() => filterButtonClickHandler('open')}
              active={selectedButton === 'open'}
            >
              OPEN
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterButtonClickHandler('holidayBusiness')}
              active={selectedButton === 'holidayBusiness'}
            >
              HOLIDAYS
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterButtonClickHandler('nightBusiness')}
              active={selectedButton === 'nightBusiness'}
            >
              NIGHT
            </CSS.FilterButton>
          </CSS.FilterBoxDiv>
        </CSS.AllSearchButtonBoxDiv>
        <AllLanguageSearchButtonBoxDiv>
          {isLanguageInfo && (
            <CSS.InfoDiv>Languages spoken by pharmacists</CSS.InfoDiv>
          )}
          <LanguageInfoIconButton
            onMouseEnter={languageHandleMouseEnter}
            onMouseLeave={languageHandleMouseLeave}
          />
          <LanguageButtonBoxDiv>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('english')}
              active={languageSelectedButton === 'english'}
            >
              ENG
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('japanese')}
              active={languageSelectedButton === 'japanese'}
            >
              JP
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('chinese')}
              active={languageSelectedButton === 'chinese'}
            >
              CN
            </CSS.FilterButton>
          </LanguageButtonBoxDiv>
        </AllLanguageSearchButtonBoxDiv>
        {storeList && storeList.content.length < 1 ? (
          <InformationMessageDiv>No pharmacies found</InformationMessageDiv>
        ) : (
          <ForeignPharmacyList data={storeList} />
        )}
        <CSS.ListNumberBoxDiv>
          {keyboard.map((item, index) => {
            return (
              <>
                {index !== 0 && <span>|</span>}
                <CSS.ListNumberButton
                  isActive={currentPage === item}
                  onClick={() => handlePageClick(item)}
                >
                  {item}
                </CSS.ListNumberButton>
              </>
            );
          })}
        </CSS.ListNumberBoxDiv>
      </div>
    </CSS.MainContainer>
  );
};

export default ForeignMainPage;

const InformationMessageDiv = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: #5f5e5e;
`;
const LanguageInfoIconButton = styled.button`
  background-color: transparent;
  background-image: url(${languageInfoIcon});
  background-size: 19px 19px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 22px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

const PolygonIcon = styled.span`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 14px;
  right: 7px;
  background-image: url(${polygon});
  background-size: 8px 8px;
  background-repeat: no-repeat;
  background-position: center;
`;

// 셀렉트박스
const StyledSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
  .react-select__control {
    background-color: #fa5938;
    width: 100px;
    height: 40px;
    padding-right: 15px;
    border: none;
    border-radius: 20px;
    line-height: 1.3;
    cursor: pointer;
  }
  .react-select__single-value {
    color: #ffffff; /* 텍스트 색상 지정 */
    font-size: 10px;
    font-weight: 700;
  }
  .react-select__menu {
    background-color: #ffffff;
    width: 110px;
    font-size: 11px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .react-select__option {
    background-color: transparent; /* option 배경색 */
    color: black; /* option 텍스트 색상 */
  }
  .react-select__option--is-selected {
    background-color: #fa5938; /* 클릭된 option 배경색 */
    color: white; /* 클릭된 option 텍스트 색상 */
  }
  .react-select__option--is-focused {
    border: 1px solid #afaeb7;
    color: black; /* hover 상태의 option 텍스트 색상 */
  }
`;
// 검색버튼 전체 박스
const AllLanguageSearchButtonBoxDiv = styled.div`
  display: flex;
  flex: row;
  margin-top: 19px;
  margin-left: 13px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: flex-end;
`;
// 검색버튼 전체 박스
const LanguageButtonBoxDiv = styled.div`
  width: 340px;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
