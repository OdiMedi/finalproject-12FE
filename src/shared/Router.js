import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import Login from '../page/Login';
import MainPage from '../page/MainPage';
import MyPage from '../page/MyPage';
import SingUp from '../page/SingUp';

const Router = () => {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="myPage" element={<MyPage />} />
      <Route path="Login" element={<Login />} />
      <Route path="singUp" element={<SingUp />} />
      <Route path="mainPage" element={<MainPage />} />
    </Routes>
  </BrowserRouter>;
};

export default Router;
