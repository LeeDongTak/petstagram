import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Tabs from '../components/mypage/Tabs';
import OwnerProfile from '../components/mypage/OwnerProfile';
import PetProfile from '../components/mypage/PetProfile';
import MyPosts from '../components/mypage/MyPosts';
import { useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../fireBase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function MyPage() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [username, setUserName] = useState(''); // 프로필 사용자 이름

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

  const filteredData = post.filter((post) => post.uid === id);

  //사용자의 정보를 받는 useEffect
  useEffect(() => {
    const fetchUserInfo = async () => {
      const userData = auth.currentUser;
      const email = userData.email;
      setUserName(email);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {/* navbar 공통컴포넌트 */}
      <Navbar></Navbar>
      <Tabs onClickTab={onActiveTab} activeTab={activeTab}></Tabs>

      {activeTab === '프로필' ? (
        <ProfileContainer>
          <OwnerProfile username={username}></OwnerProfile>
          <PetProfileContainer>
            <PetProfile></PetProfile>
            <PetProfile></PetProfile>
            <PetProfile></PetProfile>
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

// ! 목욜, 금욜 투두
// ✅ 게시물 삭제
// 게시물 수정
// 프로필 사진 업로드 및 내용 수정
// redux로 리펙토링
// UI 수정 - 폰트, 색상, 쉐도우 등드으드으으