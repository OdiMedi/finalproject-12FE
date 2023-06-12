import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import mainIcon from '../assets/headerIcon.png';
import api from '../api/axios';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const accesstoken = Cookies.get('accesstoken');

  useEffect(() => {
    if (accesstoken) {
      setIsLogin(() => true);
    }
  }, [accesstoken]);

  const logoutHandle = async () => {
    try {
      const authorizationCookie = Cookies.get('authorization');
      await api.post('/user/logout', {
        headers: {
          authorization: authorizationCookie,
        },
      });
      Cookies.remove('accesstoken');
      Cookies.remove('refreshtoken');
      Cookies.remove('authorization');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');

      setIsLogin(prev => !prev);
      navigate('/');
    } catch (error) {
      console.log('error::::', error);
    }
  };

  const noticeListMoveButtonHandler = () => {
    navigate('/noticeList');
  };
  return (
    <HeaderContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MainIconDiv onClick={() => navigate('/')} />
        <div style={{ marginLeft: '45vw' }}>
          <HeaderBtn onClick={noticeListMoveButtonHandler}>공지사항</HeaderBtn>
          {isLogin ? (
            <>
              <HeaderBtn onClick={() => navigate('/mypage')}>
                마이페이지
              </HeaderBtn>
              <HeaderBtn onClick={logoutHandle}>로그아웃</HeaderBtn>
            </>
          ) : (
            <HeaderBtn onClick={() => navigate('/login')}>로그인</HeaderBtn>
          )}
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 90px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 98%;
    border-bottom: 1px solid #d9d9d9;
  }
`;
const MainIconDiv = styled.div`
  width: 133px;
  height: 40px;
  background-image: url(${mainIcon});
  background-size: 133px 40px;
  cursor: pointer;
`;
const HeaderBtn = styled.button`
  height: 27px;
  font-weight: 800;
  border: 0;
  background-color: transparent;
  margin-right: 30px;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.05em;
  cursor: pointer;
`;
