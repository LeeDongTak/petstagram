import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import PostDetail from './PostDetail'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:postId' element={<PostDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
