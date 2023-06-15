import React, { useEffect, useState } from 'react';

const Timer = ({ timeLimit, key }) => {
  const [count, setCount] = useState(timeLimit);

  useEffect(() => {
    setCount(timeLimit); // 타이머를 초기화

    const id = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
    }

    return () => clearInterval(id);
  }, [timeLimit, key]); // timeLimit과 key를 의존성 배열에 추가

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return <p>{formatTime(count)}</p>;
};

export default Timer;
