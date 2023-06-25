import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ForeignStoreFilterList } from '../../api/foreignList';
import languageInfoIcon from '../../assets/languageInfoIcon.png';
import locationIcon from '../../assets/locationIcon.png';
import polygon from '../../assets/Polygon.png';
import ForeignStoreFilterAtom from '../../recoil/ForeignStoreFilterAtom';
import ModalPortal from '../../shared/ModalPortal';
import * as CSS from '../../style/globalStyle';
import LoadingSpinner from '../LoadingSpinner';
import MapApi from '../MapApi';
import ForeignPharmacyList from './ForeignPharmacyList';

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

const options = [
  { value: 'gangnam-gu', label: 'gangnam-gu' },
  { value: 'gangdong-gu', label: 'gangdong-gu' },
  { value: 'gangbuk-gu', label: 'gangbuk-gu' },
  { value: 'gangseo-gu', label: 'gangseo-gu' },
  { value: 'gwanak-gu', label: 'gwanak-gu' },
  { value: 'gwangjin-gu', label: 'gwangjin-gu' },
  { value: 'guro-gu', label: 'guro-gu' },
  { value: 'geumcheon-gu', label: 'geumcheon-gu' },
  { value: 'nowon-gu', label: 'nowon-gu' },
  { value: 'dobong-gu', label: 'dobong-gu' },
  { value: 'dongdaemun-gu', label: 'dongdaemun-gu' },
  { value: 'dongjak-gu', label: 'dongjak-gu' },
  { value: 'Mapo-gu', label: 'Mapo-gu' },
  { value: 'seodaemun-gu', label: 'seodaemun-gu' },
  { value: 'seocho-gu', label: 'seocho-gu' },
  { value: 'seongdong-gu', label: 'seongdong-gu' },
  { value: 'seongbuk-gu', label: 'seongbuk-gu' },
  { value: 'songpa-gu', label: 'songpa-gu' },
  { value: 'yeongdeungpo-gu', label: 'yeongdeungpo-gu' },
  { value: 'yangcheon-gu', label: 'yangcheon-gu' },
  { value: 'yongsan-gu', label: 'yongsan-gu' },
  { value: 'eunpyeong-gu', label: 'eunpyeong-gu' },
  { value: 'jongno-gu', label: 'jongno-gu' },
  { value: 'jung-gu', label: 'jung-gu' },
  { value: 'jungnang-gu', label: 'jungnang-gu' },
];

const ForeignMainPage = () => {
  const [storeFilter, setStoreFilter] = useRecoilState(ForeignStoreFilterAtom);
  const [currentPage, setCurrentPage] = useState(storeFilter.page);
  const [name, setName] = useState(storeFilter.name);
  const [storeList, setStoreList] = useState(null);
  const [selectedButton, setSelectedButton] = useState(
    storeFilter.selectedButton
  );
  const [languageSelectedButton, setLanguageSelectedButton] = useState(
    storeFilter.languageSelectedButton
  );
  const [isCurrent, setIsCurrent] = useState(false);
  const [isLocationInfo, setIsLocationInfo] = useState(false);
  const [isLanguageInfo, setIsLanguageInfo] = useState(false);
  const [languageInfo, setLanguageInfo] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState(
    storeFilter.currentLatitude
  );
  const [currentLongitude, setCurrentLongitude] = useState(
    storeFilter.currentLongitude
  );
  const [selectedOption, setSelectedOption] = useState(
    storeFilter.selectedOption
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const currentLocation = useLocation();
  const currentPageLocation = currentLocation.pathname;

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  // 전체리스트 api로직
  const mutation = useMutation(ForeignStoreFilterList, {
    onSuccess: data => {
      setStoreList(data);
    },
    onError: error => {
      console.log(error.message);
    },
  });
  useEffect(() => {
    mutation.mutate(storeFilter);
  }, [storeFilter]);
  const currentLocationButtonHandler = () => {
    setSelectedOption('');
    setIsCurrent(!isCurrent);
    if (!isCurrent) {
      setIsLoading(true); // 로딩 시작
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const { latitude, longitude } = coords;
            setCurrentLatitude(latitude);
            setCurrentLongitude(longitude);
            setIsLoading(false); // 로딩 완료
          },
          error => {
            console.error('위치 정보를 가져오는데 실패했습니다:', error);
            setIsLoading(false);
          }
        );
      } else {
        console.error('Geolocation이 지원되지 않는 환경입니다.');
        setIsLoading(false);
      }
    }
  };

  const onChangeNameSearchHandler = e => {
    setName(e.target.value);
  };

  // searchData 객체의 변화 감지를 위해 새로운 상태로 업데이트
  const updateStoreFilter = () => {
    const updatedStoreFilter = {
      ...storeFilter,
      name,
      gu:
        selectedOption && selectedOption.value === 'part-gu'
          ? ''
          : selectedOption && selectedOption.value,
      open: selectedButton === 'open',
      holidayBusiness: selectedButton === 'holidayBusiness',
      nightBusiness: selectedButton === 'nightBusiness',
      currentLatitude: isCurrent === false ? '' : currentLatitude,
      currentLongitude: isCurrent === false ? '' : currentLongitude,
      english: languageSelectedButton === 'english',
      chinese: languageSelectedButton === 'chinese',
      japanese: languageSelectedButton === 'japanese',
      selectedButton,
      languageSelectedButton,
      selectedOption:
        selectedOption && selectedOption.value === 'part-gu'
          ? ''
          : selectedOption,
      page: currentPage !== 0 ? currentPage - 1 : currentPage,
    };
    setStoreFilter(updatedStoreFilter);
  };

  // 언어 안내아이콘 버튼 hover 이벤트
  const languageHandleMouseEnter = active => {
    setIsLanguageInfo(true);
    if (active === 'english') {
      setLanguageInfo(
        'We provide information about pharmacies where English communication is possible.'
      );
    }
    if (active === 'chinese') {
      setLanguageInfo('我们提供关于能够进行中文交流的药店信息。');
    }
    if (active === 'japanese') {
      setLanguageInfo('日本語が可能な薬局をご案内いたします。');
    }
    if (active === '') {
      setLanguageInfo(
        'We provide information on pharmacies that are capable of communication in foreign languages.'
      );
    }
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

  // 검색 조건이 변경될 때마다 searchData 업데이트
  useEffect(() => {
    updateStoreFilter();
  }, [
    selectedButton,
    currentLatitude,
    currentLongitude,
    languageSelectedButton,
    currentPage,
    selectedOption,
  ]);
  useEffect(() => {
    if (isCurrent && selectedOption !== '') {
      setCurrentLatitude('');
      setCurrentLongitude('');
      setIsCurrent(!isCurrent);
    } else if (!isCurrent && selectedOption === '') {
      updateStoreFilter();
    } else if (!isCurrent && selectedOption !== '') {
      updateStoreFilter();
    } else if (isCurrent && selectedOption === '') {
      updateStoreFilter();
    }
  }, [selectedOption]);
  const onClickSearchButtonHandler = () => {
    updateStoreFilter();
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
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      onClickSearchButtonHandler(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <CSS.MainContainer>
      {storeList && (
        <MapApi
          storeLocation={storeList.content}
          isCurrent={isCurrent}
          navigate={navigate}
          currentPageLocation={currentPageLocation}
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
            onKeyPress={handleOnKeyPress}
          />
          <CSS.SearchButton onClick={onClickSearchButtonHandler} />
        </CSS.SearchBox>
        <CSS.AllSearchButtonBoxDiv>
          <CSS.SearchButtonBoxDiv>
            <StyledSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              components={customComponents}
              styles={customStyles}
              value={selectedOption}
              placeholder="part-gu"
              isSearchable={false}
              isDisabled={false}
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
              {isLoading && (
                <ModalPortal>
                  <LoadingSpinner />
                </ModalPortal>
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
          {isLanguageInfo && <CSS.InfoDiv>{languageInfo}</CSS.InfoDiv>}
          <LanguageInfoIconButton
            onMouseEnter={languageHandleMouseEnter}
            onMouseLeave={languageHandleMouseLeave}
          />
          <LanguageButtonBoxDiv>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('english')}
              active={languageSelectedButton === 'english'}
              onMouseEnter={() => languageHandleMouseEnter('english')}
              onMouseLeave={() => languageHandleMouseLeave('english')}
            >
              ENG
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('japanese')}
              active={languageSelectedButton === 'japanese'}
              onMouseEnter={() => languageHandleMouseEnter('japanese')}
              onMouseLeave={() => languageHandleMouseLeave('japanese')}
            >
              JP
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('chinese')}
              active={languageSelectedButton === 'chinese'}
              onMouseEnter={() => languageHandleMouseEnter('chinese')}
              onMouseLeave={() => languageHandleMouseLeave('chinese')}
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
        {storeList?.content.length > 0 && (
          <CSS.PaginationBoxDiv>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={20}
              totalItemsCount={storeList.totalElements}
              pageRangeDisplayed={5}
              initialPage={0}
              prevPageText="<"
              nextPageText=">"
              onChange={handlePageChange}
            />
          </CSS.PaginationBoxDiv>
        )}
      </div>
    </CSS.MainContainer>
  );
};

export default ForeignMainPage;

const InformationMessageDiv = styled.div`
  height: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: #5f5e5e;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
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
    text-align: center;
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
    text-align: center;
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
  .react-select__placeholder {
    color: white;
    font-weight: 500;
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
