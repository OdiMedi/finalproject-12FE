import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ForeignPharmacyList from './ForeignPharmacyList';
import MapApi from '../mainPage/MapApi';
import * as CSS from '../globalStyle';
import { storeFilterList } from '../../api/storeList';

import locationIcon from '../../assets/locationIcon.png';
import polygon from '../../assets/Polygon.png';
import searchIcon from '../../assets/icon _search_.png';
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

// const gu = [
//   'gangnam-gu',
//   'gangdong-gu',
//   'gangbuk-gu',
//   'gangseo-gu',
//   'gwanak-gu',
//   'gwangjin-gu',
//   'guro-gu',
//   'geumcheon-gu',
//   'nowon-gu',
//   'dobong-gu',
//   'dongdaemun-gu',
//   'dongjak-gu',
//   'Mapo-gu',
//   'seodaemun-gu',
//   'seocho-gu',
//   'seongdong-gu',
//   'seongbuk-gu',
//   'songpa-gu',
//   'yeongdeungpo-gu',
//   'yangcheon-gu',
//   'yongsan-gu',
//   'eunpyeong-gu',
//   'jongno-gu',
//   'jung-gu',
//   'jungnang-gu',
// ];
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
const ForeignMainPage = () => {
  const [name, setName] = useState('');
  const [storeList, setStoreList] = useState(null);
  const [selectedButton, setSelectedButton] = useState('');
  const [languageSelectedButton, setLanguageSelectedButton] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const navigate = useNavigate();

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

  // 언어 안내아이콘 버튼 토클
  const infoToggleHandler = () => {
    setIsInfo(!isInfo);
  };
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
  };

  useEffect(() => {
    mutation.mutate(searchData);
  }, []);
  return (
    <MainContainer>
      {storeList && (
        <MapApi
          storeLocation={storeList}
          isCurrent={isCurrent}
          navigate={navigate}
        />
      )}
      <TestColor>
        <TitleBox>
          <LocationIcon src={locationIcon} alt="" />
          <MainTitle>WHERE IS THE PHARMACY?</MainTitle>
        </TitleBox>
        <SearchBox>
          <SearchInput
            value={name}
            onChange={onChangeNameSearchHandler}
            placeholder="Search For a Pharmacy Name or Select a Filter"
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
              <CSS.CurrentIconDiv active={isCurrent === true} />
              GPS
            </CSS.FilterButton>
          </SearchButtonBoxDiv>
          <FilterBoxDiv>
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
          </FilterBoxDiv>
        </AllSearchButtonBoxDiv>
        <AllLanguageSearchButtonBoxDiv>
          {isInfo && <CSS.InfoDiv>Languages spoken by pharmacists</CSS.InfoDiv>}
          <LanguageInfoIconButton onClick={infoToggleHandler} />
          <LanguageButtonBoxDiv>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('ENG')}
              active={languageSelectedButton === 'ENG'}
            >
              ENG
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('JP')}
              active={languageSelectedButton === 'JP'}
            >
              JP
            </CSS.FilterButton>
            <CSS.FilterButton
              onClick={() => filterLanguageButtonClickHandler('CN')}
              active={languageSelectedButton === 'CN'}
            >
              CN
            </CSS.FilterButton>
          </LanguageButtonBoxDiv>
        </AllLanguageSearchButtonBoxDiv>
        {storeList && <ForeignPharmacyList data={storeList} />}
      </TestColor>
    </MainContainer>
  );
};

export default ForeignMainPage;

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
  font-weight: 800;
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
  align-items: center;
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

// 필터 버튼
const FilterBoxDiv = styled.div`
  width: 340px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
