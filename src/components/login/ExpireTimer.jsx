import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ExpireTimer = () => {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 3);

  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const remainingTime = expirationTime - now;

      const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;

      setTimeRemaining(formattedTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeRemaining('00:00');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <AlertTextP>만료시간: {timeRemaining}</AlertTextP>
    </div>
  );
};

export default ExpireTimer;

const AlertTextP = styled.p`
  margin-left: 130px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: #afaeb7;
`;
