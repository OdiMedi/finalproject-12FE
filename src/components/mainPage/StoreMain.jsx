import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useMutation } from 'react-query';

import locationIcon from '../../assets/locationIcon.png';
import searchIcon from '../../assets/icon _search_.png';
import polygon from '../../assets/Polygon.png';
import PharmacyList from './PharmacyList';
import MapApi from './MapApi';
import * as CSS from '../globalStyle';
import { storeFilterList } from '../../api/storeList';

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
  '양천구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

const StoreMain = () => {
  const [name, setName] = useState('');
  const [storeList, setStoreList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  // 전체리스트 api로직
  const mutation = useMutation(storeFilterList, {
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
    gu: selectGuStatus.value,
    open: selectedButton === 'open',
    holidayBusiness: selectedButton === 'holidayBusiness',
    nightBusiness: selectedButton === 'nightBusiness',
  });

  useEffect(() => {
    mutation.mutate(searchData);
  }, [searchData]);

  // searchData 객체의 변화 감지를 위해 새로운 상태로 업데이트
  const updateSearchData = () => {
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      name,
      gu: selectGuStatus.value,
      open: selectedButton === 'open',
      holidayBusiness: selectedButton === 'holidayBusiness',
      nightBusiness: selectedButton === 'nightBusiness',
    }));
  };

  // 검색 조건이 변경될 때마다 searchData 업데이트
  useEffect(() => {
    updateSearchData();
  }, [selectGuStatus, selectedButton]);
  // useEffect(() => {
  //   mutation.mutate(searchData);
  // }, []);
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
  const currentLocationButtonHandler = () => {
    setIsCurrent(!isCurrent);
  };

  useEffect(() => {
    mutation.mutate(searchData);
  }, []);
  return (
    <MainContainer>
      {storeList && <MapApi storeLocation={storeList} isCurrent={isCurrent} />}
      <TestColor>
        <TitleBox>
          <LocationIcon src={locationIcon} alt="" />
          <MainTitle>찾는 약국 오디약 ?</MainTitle>
        </TitleBox>
        <SearchBox>
          <SearchInput
            value={name}
            onChange={onChangeNameSearchHandler}
            placeholder="약국명 검색 또는 하단의 필터 선택"
          />
          <SearchButton onClick={onClickSearchButtonHandler} />
        </SearchBox>
        <AllSearchButtonBoxDiv>
          <SearchButtonBoxDiv>
            <RegionSearchButton>
              <StyledSelect
                defaultValue={selectGuStatus}
                onChange={setSelectGuStatus}
                options={statusGuOptions}
                components={customComponents}
                styles={customStyles}
              />
            </RegionSearchButton>
            <CSS.FilterButton
              onClick={() => currentLocationButtonHandler('currentLocation')}
              active={isCurrent === true}
            >
              <CSS.CurrentIconDiv active={isCurrent === true} />내 위치
            </CSS.FilterButton>
          </SearchButtonBoxDiv>
          <FilterBoxDiv>
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
          </FilterBoxDiv>
        </AllSearchButtonBoxDiv>
        {storeList && <PharmacyList data={storeList} />}
      </TestColor>
    </MainContainer>
  );
};

export default StoreMain;

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 27px;
  margin-top: 120px;
`;

// 타이틀박스
const TestColor = styled.div`
  width: 640px;
  height: 710px;
`;
const TitleBox = styled.div`
  width: 317px;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 9px;
`;
const LocationIcon = styled.img`
  width: 46px;
  height: 46px;
  margin-left: 10px;
`;
const MainTitle = styled.h1`
  font-size: 32px;
`;

// 검색 박스
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 26px;
`;
const SearchInput = styled.input`
  width: 530px;
  height: 54px;
  font-size: 20px;
  background-color: #f5f5f5;
  border: none;
  padding-left: 30px;
  border-radius: 10px;
  margin-left: 13px;
  &:focus {
    outline: none;
  }
  input::placeholder {
    color: #afaeb7;
  }
  input::-webkit-input-placeholder {
    color: #afaeb7;
  }
  input:-ms-input-placeholder {
    color: #afaeb7;
  }
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
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
// 검색버튼 전체 박스
const AllSearchButtonBoxDiv = styled.div`
  display: flex;
  flex: row;
  gap: 68px;
  margin-top: 19px;
  margin-left: 13px;
  margin-bottom: 20px;
`;

// 검색버튼 박스
const SearchButtonBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 220px;
`;
const RegionSearchButton = styled.button`
  background-color: #fa5938;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  position: relative;
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

// 필터 버튼
const FilterBoxDiv = styled.div`
  width: 340px;
  display: flex;
  justify-content: space-between;
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
  }
  .react-select__single-value {
    color: #ffffff; /* 텍스트 색상 지정 */
    font-size: 16px;
  }
  .react-select__menu {
    background-color: #ffffff;
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
