import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import locationIcon from '../../assets/locationIcon.png';
import searchIcon from '../../assets/icon _search_.png';
import polygon from '../../assets/Polygon.png';
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

const MAPapi = () => {
  const [search, useSearch] = useState('');

  const sido = [
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
  const emd = [
    '은천동',
    '성현동',
    '청룡동',
    '보라매',
    '청림동',
    '행운동',
    '낙성대동',
    '중앙동',
    '인현동',
    '남현동',
    '서원동',
    '신원동',
    '서림동',
    '난곡동',
    '신사동',
    '신림동',
    '삼성동',
    '난향동',
    '조원동',
    '대학동',
    '미성동',
  ];
  const statusSidoOptions = sido.map(location => ({
    value: location,
    label: location,
  }));

  const statusEmdOptions = emd.map(location => ({
    value: location,
    label: location,
  }));

  const [selectSidoStatus, setSelectSidoStatus] = useState(
    statusSidoOptions[0]
  );
  const [selectEmdStatus, setSelectEmdStatus] = useState(statusEmdOptions[0]);

  const onChangeSearchHandler = e => {
    useSearch(e.target.value);
  };
  return (
    <MainContainer>
      <Map>여기에는 지도가 들어올꺼임</Map>
      <TestColor>
        <TitleBox>
          <LocationIcon src={locationIcon} alt="" />
          <MainTitle>찾는 약국 오디약 ?</MainTitle>
        </TitleBox>
        <SearchBox>
          <SearchInput
            value={search}
            onChange={onChangeSearchHandler}
            placeholder="약국명 검색 또는 하단의 필터 선택"
          />
          <SearchButton />
        </SearchBox>
        <AllSearchButtonBoxDiv>
          <SearchButtonBoxDiv>
            <RegionSearchButton>
              <StyledSelect
                defaultValue={selectSidoStatus}
                onChange={setSelectSidoStatus}
                options={statusSidoOptions}
                components={customComponents}
                styles={customStyles}
              />
            </RegionSearchButton>
            <RegionSearchButton>
              <StyledSelect
                defaultValue={selectEmdStatus}
                onChange={setSelectEmdStatus}
                options={statusEmdOptions}
                components={customComponents}
                styles={customStyles}
              />
            </RegionSearchButton>
          </SearchButtonBoxDiv>
          <FilterBoxDiv>
            <FilterButton type="open">영업중</FilterButton>
            <FilterButton>공휴일 영업</FilterButton>
            <FilterButton>야간 영업</FilterButton>
          </FilterBoxDiv>
        </AllSearchButtonBoxDiv>
        <PharmacyList />
      </TestColor>
    </MainContainer>
  );
};

export default MAPapi;

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 27px;
  margin-top: 120px;
`;

const Map = styled.div`
  background-color: green;
  width: 580px;
  height: 710px;
`;

// 타이틀박스
const TestColor = styled.div`
  background-color: red;
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
const TextSpan = styled.span`
  font-size: 16px;
  height: 40px;
  width: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
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
const FilterButton = styled.button`
  background-color: ${props => (props.type === 'open' ? '#fa5938' : '#F5F5F5')};
  color: ${props => (props.type === 'open' ? '#ffffff' : '#AFAEB7')};
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
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
    background-color: #93230c; /* 클릭된 option 배경색 */
    color: white; /* 클릭된 option 텍스트 색상 */
  }
  .react-select__option--is-focused {
    background-color: #fa5938; /* hover 상태의 option 배경색 */
    color: white; /* hover 상태의 option 텍스트 색상 */
  }
`;
