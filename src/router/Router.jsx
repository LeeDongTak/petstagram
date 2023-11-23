import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import MyPage from '../page/MyPage';
import LoginPage from '../page/LoginPage';
import Header from '../components/Header/Header';
import Shop from '../page/Shop';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/shop/:productid" element={<Shop />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
