import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import mainIcon from '../assets/headerIcon.png';

const Header = () => {
  const navigate = useNavigate();
  const accesstoken = Cookies.get('accesstoken');

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
          <HeaderBtn>고객센터</HeaderBtn>
          {accesstoken ? (
            <>
              <HeaderBtn>마이페이지</HeaderBtn>
              <HeaderBtn>로그아웃</HeaderBtn>
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
  width: 100vw;
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
