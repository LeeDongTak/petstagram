import React from 'react';
import styled from 'styled-components';
import { db } from '../../fireBase';
import { doc, deleteDoc } from 'firebase/firestore';

function MyPosts({ title, content, uid, postId, setPost }) {
  // 게시물 삭제
  const deletePostHandler = async () => {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);

    setPost((prev) => {
      return prev.filter((el) => el.id !== postId);
    });
  };

  return (
    <MyPostsContainer>
      <MyPostCard>
        <PostContainer>
          <PostInfo>
            <p>uid: {uid}</p>

            <PostTitle>{title}</PostTitle>
            <PostContent>{content}</PostContent>
          </PostInfo>
          <ButtonWrapper>
            <button>수정</button>
            <button onClick={deletePostHandler}>삭제</button>
          </ButtonWrapper>
        </PostContainer>
      </MyPostCard>
    </MyPostsContainer>
  );
}

export default MyPosts;

const MyPostsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const MyPostCard = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 30px 0;
  width: 900px;
  border: 1px solid #c7c7c7a2;
  border-radius: 10px;
`;

const PostContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 720px;
`;

const PostTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const PostContent = styled.p``;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & button {
    background-color: #ff5036;
    border: 1px solid #ff5036;
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bolder;
    border-radius: 3px;
    cursor: pointer;
  }
`;
