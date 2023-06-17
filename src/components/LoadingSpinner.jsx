import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/Spinner.gif';

function LoadingSpinner() {
  return (
    <BackgroundOverlay>
      <BackgroundDiv>
        <SpinnerImg src={Spinner} alt="loading-spinner" />
      </BackgroundDiv>
    </BackgroundOverlay>
  );
}

export const BackgroundOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: relative;
`;
const BackgroundDiv = styled.div`
  width: 150px;
  height: 150px;
  background-color: #ffffff;
  opacity: 0.8;
  border-radius: 20px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
export const SpinnerImg = styled.img`
  width: 300px;
  height: 200px;
`;

export default LoadingSpinner;
