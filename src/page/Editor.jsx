import React, { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import styled from 'styled-components';


const StyledEditorContainer = styled.div`
/* ck에디터 입력부분 */
.ck.ck-editor__editable:not(.ck-editor__nested-editable) {
  min-height: 400px;
  margin-bottom: 20px;
}
`;
const PostingTitle = styled.div`
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
`;


// 게시글 툴바 목록
const toolbar =[ 'heading', '|',
'bold', 'italic', 'underline', 'strikethrough', '|',
'link', '|',
'bulletedList', 'numberedList', '|',
'outdent', 'indent', '|',
'blockQuote', '|',
'undo', 'redo']
function Editor() {
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState('');
  return ( 
    <StyledEditorContainer>
        <PostingTitle>

        <input
          type="text"
          placeholder='제목 입력 주세용'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </PostingTitle>
    <CKEditor
        editor={ ClassicEditor }

        data="<p></p>"
        config={{
        placeholder:'내용 입력 주세용',
        toolbar,}}
        onReady={ editor => {
            //에디터가 준비되면 호출되는 콜백
            console.log( '에디터 준비 완료', editor );
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( '내용변경중',{ event, editor, data } );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }

    />
</StyledEditorContainer>
  );
}

export default Editor

