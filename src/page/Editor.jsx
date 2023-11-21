import React, { useState } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor() {
    const [editorData,setEditorData] =useState('');
  return ( 
    <div className="App">
    <CKEditor
        editor={ ClassicEditor }
        data="<p>내용 입력해주세요!</p>"
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
</div>
  )
}

export default Editor