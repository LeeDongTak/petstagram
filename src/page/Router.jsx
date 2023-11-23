import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import Shop from './Shop';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/shop/:productid" element={<Shop />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
