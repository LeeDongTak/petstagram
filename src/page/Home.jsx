import React from 'react'
import GlobalStyle from '../styled/GlobalStyle';
import EditorBox from './Editor'
import ContentsViewer from './Viewer'
function Home() {
  return (
    <div >
      {/* <GlobalStyle/> */}
      <EditorBox></EditorBox>
      <ContentsViewer></ContentsViewer>
    </div>
  )
}

export default Home