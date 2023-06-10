import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoAuthRedirect from '../components/login/KakaoAuthRedirect';
import Home from '../page/Home';
import Login from '../page/Login';
import MainPage from '../page/MainPage';
import MyPage from '../page/MyPage';
import SignUp from '../page/SignUp';
import Layout from './Layout';
import DetailPage from '../page/DetailPage';
import ForeignPage from '../page/ForeignPage';
import ForeignDetailPage from '../page/ForeignDetailPage';
import Notice from '../page/Notice';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/signin/kakao" element={<KakaoAuthRedirect />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/mainPage/:id" element={<DetailPage />} />
          <Route path="/foreignPage" element={<ForeignPage />} />
          <Route path="/foreignPage/:id" element={<ForeignDetailPage />} />
          <Route path="/notice" element={<Notice />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
