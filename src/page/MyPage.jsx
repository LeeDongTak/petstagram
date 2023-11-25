import React, { useState, useEffect } from 'react';
import Tabs from '../components/Mypage/Tabs';
import OwnerProfile from '../components/Mypage/OwnerProfile';
import PetProfile from '../components/Mypage/PetProfile';
import MyPosts from '../components/Mypage/MyPosts';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../fireBase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function MyPage() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  // Tab 변하는 부분
  const [activeTab, setActiveTab] = useState('프로필');
  const onActiveTab = (e) => {
    if (e.target === e.currentTarget) return;
    setActiveTab(e.target.textContent);
  };

  // 사용자의 게시물을 받는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const initialPosts = [];
      querySnapshot.forEach((post) => {
        const data = { id: post.id, ...post.data() };
        initialPosts.push(data);
      });
      setPost(initialPosts);
    };
    fetchData();
  }, []);

  // 현재 사용자의 게시물 필터
  const filteredData = post.filter((post) => post.uid === id);

  return (
    <>
      <Tabs onClickTab={onActiveTab} activeTab={activeTab}></Tabs>

      {activeTab === '프로필' ? (
        <ProfileContainer>
          <OwnerProfile></OwnerProfile>
          <PetProfileContainer>
            <PetProfile></PetProfile>
          </PetProfileContainer>
        </ProfileContainer>
      ) : (
        filteredData.map((item) => {
          return (
            <MyPosts
              title={item.title}
              content={item.content}
              uid={item.uid}
              postId={item.id}
              post={post}
              setPost={setPost}
            ></MyPosts>
          );
        })
      )}
    </>
  );
}

export default MyPage;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const PetProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;
