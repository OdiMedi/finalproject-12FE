import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import PharmacyList from './PharmacyList';
import { storeFilterList } from '../../api/storeList';
import searchIcon from '../../assets/icon _search_.png';
import locationIcon from '../../assets/locationIcon.png';
import polygon from '../../assets/Polygon.png';
import * as CSS from '../../style/globalStyle';
import MapApi from '../MapApi';

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
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '영등포구',
  '양천구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

const StoreMain = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [name, setName] = useState('');
  const [storeList, setStoreList] = useState(null);
  const [selectedButton, setSelectedButton] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [isLocationInfo, setIsLocationInfo] = useState(false);
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
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
      console.log(data);
    },
    onError: error => {
      alert(error.message);
    },
  });

  // 내위치 가져오는 로직
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
  const statusGuOptions = gu.map(location => ({
    value: location,
    label: location,
  }));

  const [selectGuStatus, setSelectGuStatus] = useState(statusGuOptions[0]);

  const [searchData, setSearchData] = useState({
    name,
    gu: currentLatitude === '' ? selectGuStatus.value : '',
    open: selectedButton === 'open',
    holidayBusiness: selectedButton === 'holidayBusiness',
    nightBusiness: selectedButton === 'nightBusiness',
    currentLatitude,
    currentLongitude,
    page: currentPage !== 0 ? currentPage - 1 : currentPage,
  });

  useEffect(() => {
    mutation.mutate(searchData);
  }, [searchData]);

  // searchData 객체의 변화 감지를 위해 새로운 상태로 업데이트
  const updateSearchData = () => {
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      name,
      gu: currentLatitude === '' ? selectGuStatus.value : '',
      open: selectedButton === 'open',
      holidayBusiness: selectedButton === 'holidayBusiness',
      nightBusiness: selectedButton === 'nightBusiness',
      currentLatitude,
      currentLongitude,
      page: currentPage !== 0 ? currentPage - 1 : currentPage,
    }));
  };

  // 검색 조건이 변경될 때마다 searchData 업데이트
  useEffect(() => {
    updateSearchData();
  }, [selectedButton, currentLatitude, currentLongitude, currentPage]);

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
  // useEffect(() => {
  //   // storeList?.numberOfElements 값이 변경될 때마다 keyboard 배열 업데이트
  //   if (storeList?.totalPages !== undefined) {
  //     const newKeyboard = Array.from(
  //       { length: storeList.totalPages },
  //       (v, i) => i
  //     );
  //     setKeyboard(newKeyboard);
  //   }
  // }, [storeList?.numberOfElements]);
  // const handlePageClick = pageNumber => {
  //   setCurrentPage(pageNumber);
  // };
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
          />
          <SearchButton onClick={onClickSearchButtonHandler} />
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
              <CSS.CurrentIconDiv active={isCurrent === true} />내 위치
              {isLocationInfo && (
                <CSS.LocationInfoIconDiv>
                  <CSS.InfoP>내 주변 약국이 거리순으로 표시됩니다.</CSS.InfoP>
                </CSS.LocationInfoIconDiv>
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
        {storeList && storeList.content.length < 0 ? (
          <InformationMessageDiv>찾는 약국이 없습니다.</InformationMessageDiv>
        ) : (
          <PharmacyList data={storeList} />
        )}
        {/* <CSS.ListNumberBoxDiv>
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
        </CSS.ListNumberBoxDiv> */}
        {storeList && (
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
`;
