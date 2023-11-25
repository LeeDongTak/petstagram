import React from 'react';
import styled from 'styled-components';

function PostEdit({
  cancelEditPostHandler,
  onChangeEditTitle,
  onChangeEditContent,
  editPostHandler,
  title,
  content,
  uploadImage,
  setImageUpload
}) {
  return (
    <EditPostContainer onSubmit={editPostHandler}>
      <input type="text" defaultValue={title} onChange={onChangeEditTitle} />
      <textarea name="" id="" cols="30" rows="10" defaultValue={content} onChange={onChangeEditContent}></textarea>
      <input type="file" accept="image/*" multiple onChange={(e) => setImageUpload(e.target.files[0])} />
      <ButtonWrapper>
        <button onClick={uploadImage}>업로드</button>
        <button type="submit">수정</button>
        <button onClick={cancelEditPostHandler}>취소</button>
      </ButtonWrapper>
    </EditPostContainer>
  );
}

export default PostEdit;

const EditPostContainer = styled.form`
  position: absolute;
  background-color: #afafafd6;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & input {
    width: 500px;
    height: 35px;
    border-radius: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  & button {
    padding: 5px 10px;
  }
`;
