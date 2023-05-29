import { useState } from 'react';
import styled from 'styled-components';
import api from '../api/axios';
import offBookmark from '../assets/offBookMark.png';
import onBookmark from '../assets/onBookMark.png';

const BookMark = () => {
  const [bookMark, setBookMark] = useState(false);

  const onClickBookMarkHandler = () => {
    setBookMark(!bookMark);
  };

  return (
    <div>
      {bookMark ? (
        <OnBookMarkIconButton onClick={onClickBookMarkHandler} />
      ) : (
        <OffBookMarkIconButton onClick={onClickBookMarkHandler} />
      )}
    </div>
  );
};

export default BookMark;

const OnBookMarkIconButton = styled.button`
  background-image: url(${onBookmark});
  background-size: 30px 30px;
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
`;
const OffBookMarkIconButton = styled.button`
  background-image: url(${offBookmark});
  background-size: 30px 30px;
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
`;
