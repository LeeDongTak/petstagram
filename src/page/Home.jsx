import React from 'react'

import GlobalStyle from '../styled/GlobalStyle';
import Editor from './Editor'
function Home() {
  return (
    <div >
      <GlobalStyle/>
      <Editor></Editor>
    </div>
  )
}

export default Home