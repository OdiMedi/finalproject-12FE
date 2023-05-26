import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 27px;
  margin-top: 120px;
`;
export const FilterButton = styled.button`
  background-color: ${props => (props.active ? '#fa5938' : '#F5F5F5')};
  color: ${props => (props.active ? '#ffffff' : '#AFAEB7')};
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
`;
export const TitleBox = styled.div`
  width: 317px;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  gap: 9px;
`;
export const LocationIcon = styled.img`
  width: 46px;
  height: 46px;
  margin-left: 10px;
`;
export const MainTitle = styled.h1`
  font-size: 32px;
`;
