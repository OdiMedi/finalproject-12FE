import React from 'react';
import styled from 'styled-components';
import Spinner from '../assets/Spinner.gif';

function LoadingSpinner() {
  return (
    <Background>
      <SpinnerImg src={Spinner} alt="loading-spinner"></SpinnerImg>
    </Background>
  );
}

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  position: relative;
`;

export const SpinnerImg = styled.img`
  width: 400px;
  height: 400px;
`;

export default LoadingSpinner;
