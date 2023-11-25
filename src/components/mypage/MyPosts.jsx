import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { db, storage } from '../../fireBase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import PostImages from './PostImages';

function MyPosts({ title, content, postId, setPost }) {
  const [isEditing, setIsEditig] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  // 이미지 랜더
  useEffect(() => {
    listAll(imageFolder).then((res) => {
      res.items.forEach((image) => {
        getDownloadURL(image).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const showEditPostHandler = () => {
    setIsEditig(true);
  };

  const cancelEditPostHandler = () => {
    setIsEditig(false);
  };

  const onChangeEditTitle = (e) => {
    setEditingTitle(e.target.value);
  };

  const onChangeEditContent = (e) => {
    setEditingContent(e.target.value);
  };

  // 게시물 삭제 핸들러
  const deletePostHandler = async () => {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);

    setPost((prev) => {
      return prev.filter((el) => el.id !== postId);
    });
  };

  // 게시물 수정 핸들러
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

    try {
      await updateDoc(docRef, updatedData);
      setPost((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updatedData } : p)));
      setIsEditig(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 게시물 수정할 때 이미지 업로드 핸들러
  const imageFolder = ref(storage, `${postId}`);

  const uploadImage = async (e) => {
    e.preventDefault();
    if (imageUpload === null) {
      return alert('이미지를 추가해주세요.');
    } else {
      try {
        const imageRef = ref(storage, `${postId}/${v4()}`);
        await uploadBytes(imageRef, imageUpload);

        await getImages();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getImages = async () => {
    try {
      const res = await listAll(imageFolder);
      res.items.forEach(async (image) => {
        const url = await getDownloadURL(image);
        setImageList((prev) => [...prev, url]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async () => {
    try {
      const res = await listAll(imageFolder);

      // Create an array to store promises for all delete operations
      const deletePromises = res.items.map((image) => {
        const desertRef = ref(storage, image.fullPath);

        // Delete the file
        return deleteObject(desertRef);
      });

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // After all images are deleted, update the image list in the state
      await getImagesDelete();
      alert('이미지가 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting images:', error);
      alert('다시 시도해 주세요.');
    }
  };

  const getImagesDelete = async () => {
    try {
      const res = await listAll(imageFolder);
      const urls = await Promise.all(res.items.map((image) => getDownloadURL(image)));

      // Update the state with the new image list
      setImageList(urls);
    } catch (err) {
      console.error('Error getting images:', err);
    }
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
              <InputAndButtonWrapper>
                <input type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} />
                <button onClick={uploadImage}>업로드 이미지</button>
              </InputAndButtonWrapper>
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

const InputAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
