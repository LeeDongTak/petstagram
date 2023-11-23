import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { saveData, fetchData,uploadImage, } from '../fireBase';



const StyledEditorContainer = styled.div`
/* ck에디터 입력부분 스타일 */
.ck.ck-editor__editable:not(.ck-editor__nested-editable) {
  min-height: 400px;
  margin-bottom: 20px;
}
`;
const PostingTitle = styled.div`
/* 상단 제목 입력부분 스타일 */
    input{
    display: block;
    width: 100%;
    height: 56px;
    border: none;
    font-size: 30px;
    color: #202020;
    resize: none;
    outline: 0 none;
    line-height: 40px;
    overflow: hidden;
    letter-spacing: -0.4px;
}
  input:focus{
    border : 2px solid #FF2E00;
  }

`;
const EditContainer = styled.div`
/* 에디터 부분 전부 감싸는 박스 */
  padding: 10px;
  margin: auto;
  width: 500px;
  height: 500px;
  i{
    font-style: italic;
  }
  strong{
    font-weight: bold;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
  h2{
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
`;



// 게시글 툴바 목록
const toolbar =[ 'heading', '|',
'bold', 'italic', 'underline', 'strikethrough', '|',
'link', '','|',
'bulletedList', 'numberedList', '|',
'outdent', 'indent', '|',
'blockQuote','|',
'undo', 'redo',]

function Editor() {
    const [editTitle, editSetTitle] = useState('');
    const [editorData, setEditorData] = useState('');
  const save= async()=>{
    const postId= await saveData(editTitle,editorData);
  }
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    console.log('내용변경중', { event, editor, data });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // 파일을 읽어서 Base64로 변환
    const reader = new FileReader();
    reader.onload = async(e) => {
      const imageUrl = e.target.result;
     
      const postimg=await uploadImage(imageUrl);
      console.log('이미지업로드',postimg)
    }
    reader.readAsDataURL(file);
  };
  return ( 
    <EditContainer>
    <StyledEditorContainer >

        <PostingTitle>
        <input
          type="text"
          placeholder='제목 입력 주세용'
          value={editTitle}
          onChange={(e) => {editSetTitle(e.target.value)
         console.log(editTitle)}}
        />
  
      </PostingTitle>
    <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
        config={{
        placeholder:'내용 입력 주세용',
        toolbar,
        }}
        onReady={ editor => {
            //에디터가 준비되면 호출되는 콜백            
            console.log( '에디터 준비 완료', editor );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
            editor.ui.view.editable.element.style.border = 'none';
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
            editor.ui.view.editable.element.style.border = '2px solid #FF2E00';
        } }
    />

</StyledEditorContainer>
<input type="file" accept='image/*' onChange={handleImageUpload} />
<button onClick={save}> 게시</button>
</EditContainer>
  );
}

export default Editor
