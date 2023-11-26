import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import MyPage from '../page/MyPage';
import LoginPage from '../page/LoginPage';
import Header from '../components/Header/Header';
import Shop from '../page/Shop';
import Footer from '../components/Footer';
import Signup from '../page/Signup';
import AddProfile from '../page/AddProfile';
import WritePage from '../page/WritePage';
import Feeds from '../page/Feeds';
import GlobalStyle from '../styled/GlobalStyle';
import EditProfile from '../components/EditProfile/EditProfile';
import Post from '../page/Post';

function Router() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addprofile/:id" element={<AddProfile />} />
        <Route path="/write" element={<WritePage />} />
        {/* <Route path="/shop/:productid" element={<Shop />} /> */}
        <Route path="/posts" element={<Feeds />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
