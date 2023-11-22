import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import MyPage from './MyPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
