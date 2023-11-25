import React, { useEffect } from 'react';
import styled from 'styled-components';
import { db, storage } from '../../fireBase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import PostEdit from './PostEdit';
import { useState } from 'react';
import { v4 } from 'uuid';

function MyPosts({ title, content, uid, postId, setPost, post }) {
  const [showEdit, setShowEdit] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${postId + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('imageupload');
    });
  };

  const showEditPostHandler = () => {
    setShowEdit(true);
  };

  const cancelEditPostHandler = () => {
    setShowEdit(false);
  };

  const IMAGE_LIST = ref(storage, 'images/');

  useEffect(() => {
    listAll(IMAGE_LIST).then((res) => {
      res.items.forEach((image) => {
        getDownloadURL(image).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // 게시물 삭제
  const deletePostHandler = async () => {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);

    setPost((prev) => {
      return prev.filter((el) => el.id !== postId);
    });
  };

  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  const onChangeEditTitle = (e) => {
    setEditingTitle(e.target.value);
  };

  const onChangeEditContent = (e) => {
    setEditingContent(e.target.value);
  };

  // 게시물 수정
  const editPostHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, { title: editingTitle, content: editingContent });

    setPost((prev) => {
      return prev.map((post) => {
        if (post.id === postId) {
          return { ...post, title: editingTitle, content: editingContent };
        } else {
          return post;
        }
      });
    });
  };

  return (
    <MyPostsContainer>
      {showEdit ? (
        <PostEdit
          showEdit={showEdit}
          showEditPostHandler={showEditPostHandler}
          cancelEditPostHandler={cancelEditPostHandler}
          onChangeEditTitle={onChangeEditTitle}
          onChangeEditContent={onChangeEditContent}
          editPostHandler={editPostHandler}
          postId={postId}
          title={title}
          content={content}
          post={post}
          setPost={setPost}
          uploadImage={uploadImage}
          setImageUpload={setImageUpload}
        ></PostEdit>
      ) : null}
      <MyPostCard>
        <PostContainer>
          <PostInfo>
            <p>uid: {uid}</p>
            {imageList.map((url) => {
              return <img src={url} width="100px" />;
            })}
            <PostTitle>{title}</PostTitle>
            <PostContent>{content}</PostContent>
          </PostInfo>
          <ButtonWrapper>
            <button onClick={showEditPostHandler}>수정</button>
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
