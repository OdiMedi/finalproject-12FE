import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../api/axios';

import offBookmark from '../assets/offBookMark.png';
import onBookmark from '../assets/onBookMark.png';
import SnackBar from './SnackBar';

const BookMark = ({ storeId, isCheck, miniSize }) => {
  const [bookMarkCheck, setBookMarkCheck] = useState(isCheck);
  const [isLogin, setIsLogin] = useState(true);

  const loginUser = Cookies.get('accesstoken');

  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation(
    () => api.post(`/api/bookmark/${storeId}`),
    {
      onSuccess: () => {
        setBookMarkCheck(prev => !prev);
        queryClient.invalidateQueries('inquiryStoreDetail');
        queryClient.invalidateQueries('ForeignStoreDetail');
      },
    }
  );

  useEffect(() => {
    setBookMarkCheck(isCheck);
  }, [isCheck]);

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
          <OnBookMarkIconButton
            type={miniSize}
            onClick={onClickBookMarkHandler}
          />
        ) : (
          <OffBookMarkIconButton
            type={miniSize}
            onClick={onClickBookMarkHandler}
          />
        )}
      </div>
      {!isLogin && <SnackBar type="login" />}
    </>
  );
};

export default BookMark;

const OnBookMarkIconButton = styled.button`
  background-image: url(${onBookmark});
  background-size: ${props =>
    props.type === 'detail' ? '18px 18px' : '30px 30px'};
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  width: ${props => (props.type === 'detail' ? '18px' : '30px')};
  height: ${props => (props.type === 'detail' ? '18px' : '30px')};
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
const OffBookMarkIconButton = styled.button`
  background-image: url(${offBookmark});
  background-size: ${props =>
    props.type === 'detail' ? '18px 18px' : '30px 30px'};
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  width: ${props => (props.type === 'detail' ? '18px' : '30px')};
  height: ${props => (props.type === 'detail' ? '18px' : '30px')};
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
