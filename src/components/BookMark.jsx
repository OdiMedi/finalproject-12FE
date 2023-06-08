import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useState } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';

import offBookmark from '../assets/offBookMark.png';
import onBookmark from '../assets/onBookMark.png';
import SnackBar from './SnackBar';

const BookMark = ({ storeId, isCheck }) => {
  const [bookMarkCheck, setBookMarkCheck] = useState(isCheck);
  const [isLogin, setIsLogin] = useState(true);

  const loginUser = Cookies.get('accesstoken');

  const bookmarkMutation = useMutation(
    () => api.post(`/api/bookmark/${storeId}`),
    {
      onSuccess: () => {
        setBookMarkCheck(prev => !prev);
      },
    }
  );
  const onClickBookMarkHandler = async e => {
    if (loginUser) {
      bookmarkMutation.mutate();
    } else {
      setIsLogin(!isLogin);
    }
    e.stopPropagation();
  };

  return (
    <>
      <div>
        {bookMarkCheck ? (
          <OnBookMarkIconButton onClick={onClickBookMarkHandler} />
        ) : (
          <OffBookMarkIconButton onClick={onClickBookMarkHandler} />
        )}
      </div>
      {!isLogin && <SnackBar />}
    </>
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
