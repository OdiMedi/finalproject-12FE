import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useState } from 'react';
import api from '../api/axios';
import offBookmark from '../assets/offBookMark.png';
import onBookmark from '../assets/onBookMark.png';

const BookMark = ({ storeId, isCheck }) => {
  const [bookMarkCheck, setBookMarkCheck] = useState(isCheck);

  const bookmarkMutation = useMutation(
    () => api.post(`/api/bookmark/${storeId}`),
    {
      onSuccess: () => {
        setBookMarkCheck(prev => !prev);
      },
    }
  );
  const onClickBookMarkHandler = async e => {
    e.stopPropagation();
    bookmarkMutation.mutate();
  };

  return (
    <div>
      {bookMarkCheck ? (
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
