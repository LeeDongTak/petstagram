import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { db, storage } from '../../fireBase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import PostImages from './PostImages';

function MyPosts({ title, content, postId, setPost, post }) {
  const [isEditing, setIsEditig] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  // 게시물 수정
  const editPostHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', postId);

    // 새로운 제목 또는 내용만 업데이트
    const updatedData = {};
    if (editingTitle) {
      updatedData.title = editingTitle;
    }
    if (editingContent) {
      updatedData.content = editingContent;
    }

    // Firestore에서 업데이트
    await updateDoc(docRef, updatedData);

    setPost((prev) => {
      return prev.map((p) => {
        if (p.id === postId) {
          return { ...p, updatedData }; // 기존 포스트와 업데이트된 데이터 병합
        } else {
          return p;
        }
      });
    });

    // 이미지 업로드
    uploadImage();
    setIsEditig(false);
  };

  // 이미지 업로드 함수
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${postId}/${v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('이미지가 성공적으로 업로드 되었습니다.');
    });
  };

  const showEditPostHandler = () => {
    setIsEditig(true);
  };

  const cancelEditPostHandler = () => {
    setIsEditig(false);
  };

  const IMAGE_FOLDER = ref(storage, `${postId}`);

  useEffect(() => {
    listAll(IMAGE_FOLDER).then((res) => {
      res.items.forEach((image) => {
        getDownloadURL(image).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // 이미지 삭제
  //gs://album-6d914.appspot.com/NRPxRcnLzup3up9tR0hI/2cdb0b77-c066-4004-8c01-f4c804f5781f
  //gs://album-6d914.appspot.com/NRPxRcnLzup3up9tR0hI/b5c5ee7d-0cd0-430c-8c34-317b38f09cf8
  //'NRPxRcnLzup3up9tR0hI/04194320-15a4-42ca-af78-c1ed972e03d6'

  const deleteImage = () => {
    listAll(IMAGE_FOLDER).then((res) => {
      res.items.forEach((image) => {
        const desertRef = ref(storage, image.fullPath);

        console.log(desertRef);
        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            alert('이미지가 삭제되었습니다.');
          })
          .catch((error) => {
            alert('다시 시도해 주세요.');
          });
      });
    });
  };

function MyPosts({ title, content, uid, postId, setPost }) {
  // FUNCTIONS
  // 게시물 삭제
  const deletePostHandler = async () => {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
    setPost((prev) => {
      return prev.filter((el) => el.id !== postId);
    });
  };

  const onChangeEditTitle = (e) => {
    setEditingTitle(e.target.value);
  };

  const onChangeEditContent = (e) => {
    setEditingContent(e.target.value);
  };

  return (
    <MyPostsContainer>

      {!isEditing ? (
        <MyPostCard>
          <PostContainer>
            <PostInfo>
              <h3>{title}</h3>
              <p>{content}</p>
              <PostImageContainer>
                <PostImages imageList={imageList} deleteImage={deleteImage} isEditing={isEditing}></PostImages>
              </PostImageContainer>
            </PostInfo>
            <ButtonWrapper>
              <button onClick={showEditPostHandler}>수정</button>
              <button onClick={deletePostHandler}>삭제</button>
            </ButtonWrapper>
          </PostContainer>
        </MyPostCard>
      ) : (
        <MyPostCard>
          <PostContainer>
            <PostInfo>
              <input type="text" defaultValue={title} onChange={onChangeEditTitle} />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                defaultValue={content}
                onChange={onChangeEditContent}
              ></textarea>
              <input type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} />
              <PostImageContainer>
                <PostImages imageList={imageList} deleteImage={deleteImage} isEditing={isEditing}></PostImages>
              </PostImageContainer>
            </PostInfo>
            <ButtonWrapper>
              <button onClick={editPostHandler}>수정완료</button>
              <button onClick={cancelEditPostHandler}>수정취소</button>
            </ButtonWrapper>
          </PostContainer>
        </MyPostCard>
      )}

    </MyPostsContainer>
  );
}

export default MyPosts;

// STYLED-COMPONENTS
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

const PostImageContainer = styled.div`
  display: flex;
  gap: 20px;

  & img {
    width: 100px;
    height: 100px;
  }
`;
