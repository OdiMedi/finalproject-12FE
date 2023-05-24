import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailPage from '../page/DetailPage';
import Home from '../page/Home';
import Login from '../page/Login';
import MainPage from '../page/MainPage';
import MyPage from '../page/MyPage';
import SingUp from '../page/SingUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="myPage" element={<MyPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="singUp" element={<SingUp />} />
        <Route path="mainPage" element={<MainPage />} />
        <Route path="detailPage" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
