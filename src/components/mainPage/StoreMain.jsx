import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { storeFilterList } from '../../api/storeList';
import searchIcon from '../../assets/icon _search_.png';
import locationIcon from '../../assets/locationIcon.png';
import polygon from '../../assets/Polygon.png';
import storeFilterAtom from '../../recoil/storeFilterAtom';
import ModalPortal from '../../shared/ModalPortal';
import * as CSS from '../../style/globalStyle';
import LoadingSpinner from '../LoadingSpinner';
import MapApi from '../MapApi';
import PharmacyList from './PharmacyList';

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
  { value: '강남구', label: '강남구' },
  { value: '강동구', label: '강동구' },
  { value: '강북구', label: '강북구' },
  { value: '강서구', label: '강서구' },
  { value: '관악구', label: '관악구' },
  { value: '광진구', label: '광진구' },
  { value: '구로구', label: '구로구' },
  { value: '금천구', label: '금천구' },
  { value: '노원구', label: '노원구' },
  { value: '도봉구', label: '도봉구' },
  { value: '동대문구', label: '동대문구' },
  { value: '동작구', label: '동작구' },
  { value: '마포구', label: '마포구' },
  { value: '서대문구', label: '서대문구' },
  { value: '서초구', label: '서초구' },
  { value: '성동구', label: '성동구' },
  { value: '성북구', label: '성북구' },
  { value: '송파구', label: '송파구' },
  { value: '영등포구', label: '영등포구' },
  { value: '양천구', label: '양천구' },
  { value: '용산구', label: '용산구' },
  { value: '은평구', label: '은평구' },
  { value: '종로구', label: '종로구' },
  { value: '중구', label: '중구' },
  { value: '중랑구', label: '중랑구' },
];
const StoreMain = () => {
  const [storeFilter, setStoreFilter] = useRecoilState(storeFilterAtom);
  const [currentPage, setCurrentPage] = useState(storeFilter.page);
  const [name, setName] = useState(storeFilter.name);
  const [storeList, setStoreList] = useState(null);
  const [selectedButton, setSelectedButton] = useState(
    storeFilter.selectedButton
  );
  const [isCurrent, setIsCurrent] = useState(false);
  const [isLocationInfo, setIsLocationInfo] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState(
    storeFilter.currentLatitude
  );
  const [currentLongitude, setCurrentLongitude] = useState(
    storeFilter.currentLongitude
  );
  // const [selectedOption, setSelectedOption] = useState(storeFilter.gu);
  const [selectedOption, setSelectedOption] = useState(
    storeFilter.selectedOption
  );

  const [isLoading, setIsLoading] = useState(false);

  // const [keyboard, setKeyboard] = useState([]);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const currentPageLocation = currentLocation.pathname;
  // const [page, setPage] = useState(0);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  // 전체리스트 api로직
  const mutation = useMutation(storeFilterList, {
    onSuccess: data => {
      setStoreList(data);
    },
    onError: error => {
      console.log(error.message);
    },
  });

  // 내위치 가져오는 로직
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
            setIsLoading(false); // 로딩 완료
          }
        );
      } else {
        console.error('Geolocation이 지원되지 않는 환경입니다.');
        setIsLoading(false); // 로딩 완료
      }
    }
  };

  useEffect(() => {
    setStoreFilter(prev => ({
      ...prev,
      selectedButton,
      selectedOption,
    }));
  }, [setStoreFilter, selectedButton, selectedOption]);

  const updateStoreFilter = () => {
    const updatedStoreFilter = {
      ...storeFilter,
      name,
      gu:
        selectedOption && selectedOption.value === '지역구'
          ? ''
          : selectedOption && selectedOption.value,
      open: selectedButton === 'open',
      holidayBusiness: selectedButton === 'holidayBusiness',
      nightBusiness: selectedButton === 'nightBusiness',
      currentLatitude: isCurrent === false ? '' : currentLatitude,
      currentLongitude: isCurrent === false ? '' : currentLongitude,
      page: currentPage !== 0 ? currentPage - 1 : currentPage,
      selectedButton,
      selectedOption:
        selectedOption && selectedOption.value === '지역구'
          ? ''
          : selectedOption,
    };
    setStoreFilter(updatedStoreFilter);
  };

  useEffect(() => {
    updateStoreFilter();
  }, [
    selectedButton,
    currentLatitude,
    currentLongitude,
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

  useEffect(() => {
    mutation.mutate(storeFilter);
  }, [storeFilter]);

  const onClickSearchButtonHandler = () => {
    updateStoreFilter();
  };
  const onChangeNameSearchHandler = e => {
    setName(e.target.value);
  };
  // 필터 버튼
  const filterButtonClickHandler = button => {
    setSelectedButton(prevSelectedButton => {
      if (prevSelectedButton === button) {
        return ''; // 이미 선택된 버튼을 다시 클릭한 경우 선택 해제
      }
      return button; // 새로운 버튼 선택
    });
  };
  // 내위치 버튼 hover 이벤트
  const LocationHandleMouseEnter = () => {
    setIsLocationInfo(true);
  };

  const LocationHandleMouseLeave = () => {
    setIsLocationInfo(false);
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
          <CSS.MainTitle>찾는 약국 오디약 ?</CSS.MainTitle>
        </CSS.TitleBox>
        <CSS.SearchBox>
          <CSS.SearchInput
            value={name}
            onChange={onChangeNameSearchHandler}
            placeholder="약국명 검색 또는 하단의 필터 선택"
            onKeyPress={handleOnKeyPress}
          />
          <SearchButton onClick={onClickSearchButtonHandler} />
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
              placeholder="지역구"
              isSearchable={false}
              isDisabled={false}
            />

            <CSS.FilterButton
              onClick={() => currentLocationButtonHandler('currentLocation')}
              active={isCurrent === true}
              onMouseEnter={LocationHandleMouseEnter}
              onMouseLeave={LocationHandleMouseLeave}
            >
              <CSS.CurrentIconDiv active={isCurrent === true} />내 위치
              {isLocationInfo && (
                <CSS.LocationInfoIconDiv>
                  <CSS.InfoP>내 주변 약국이 거리순으로 표시됩니다.</CSS.InfoP>
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
              영업중
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterButtonClickHandler('holidayBusiness')}
              active={selectedButton === 'holidayBusiness'}
            >
              공휴일 영업
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterButtonClickHandler('nightBusiness')}
              active={selectedButton === 'nightBusiness'}
            >
              야간 영업
            </CSS.FilterButton>
          </CSS.FilterBoxDiv>
        </CSS.AllSearchButtonBoxDiv>
        {storeList && storeList.content.length === 0 ? (
          <InformationMessageDiv>찾는 약국이 없습니다.</InformationMessageDiv>
        ) : (
          <PharmacyList data={storeList} />
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

export default StoreMain;

const InformationMessageDiv = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: #5f5e5e;
`;
const SearchButton = styled.button`
  width: 54px;
  height: 54px;
  background-color: #fa5938;
  border-radius: 10px;
  border: none;
  background-image: url(${searchIcon});
  background-size: 26px 26px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;

  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
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
    display: flex;
    text-align: center;
    cursor: pointer;
  }
  .react-select__single-value {
    color: #ffffff; /* 텍스트 색상 지정 */
    font-size: 16px;
    font-weight: 700;
  }
  .react-select__menu {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-weight: 600;
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
    font-weight: 600;
  }
`;
