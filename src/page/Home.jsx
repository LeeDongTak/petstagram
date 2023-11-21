import React from 'react'
import Editor from './Editor'
import GlobalStyle from '../styled/GlobalStyle';
function Home() {
  return (
    <div>
      <GlobalStyle/>
      <Editor></Editor>
    </div>
  )
}

export default Home