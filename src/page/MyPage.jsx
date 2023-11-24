import React, { useState } from 'react';
import Tabs from '../components/mypage/Tabs';
import OwnerProfile from '../components/mypage/OwnerProfile';
import PetProfile from '../components/mypage/PetProfile';
import MyPosts from '../components/mypage/MyPosts';
import { useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../fireBase';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import authStorage from '../util/authUser';

function MyPage() {
  // localStorage의 사용자 email, UID를 가져오는 것
  const authHandler = new authStorage();

  // URL 파라미터
  const { id } = useParams();

  // STATES
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
      try {
        const q = query(collection(db, 'posts'));
        const querySnapshot = await getDocs(q);

        const initialPosts = [];
        querySnapshot.forEach((post) => {
          const data = { id: post.id, ...post.data() };
          initialPosts.push(data);
        });
        setPost(initialPosts.filter((el) => el.id === id));
        console.log(initialPosts); // [{}, {}, {}, {}]
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(post);

  // 게시물을 현재 사용자의 id와 같은 것들로 보여주기 위한 filter
  const filteredData = post?.filter((post) => post.uid === id);
  console.log(filteredData); // []
  //사용자의 정보를 받는 useEffect
  useEffect(() => {
    const fetchUserInfo = async () => {
      const email = authHandler.getEmail();
      setUserName(email);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Tabs onClickTab={onActiveTab} activeTab={activeTab}></Tabs>
      <MyPageContainer>
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
          filteredData?.map((item) => {
            return (
              <MyPosts item={item}></MyPosts>
              // <MyPosts
              //   title={item.title}
              //   content={item.content}
              //   uid={item.uid}
              //   postId={item.id}
              //   setPost={setPost}
              // ></MyPosts>
            );
          })
        )}
      </MyPageContainer>
    </>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  font-size: 1.25rem;
  width: 100%;
  padding: 0 15rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1400px) {
    padding: 0 6rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0 1.25rem;
  }
`;

export const FadeAni = keyframes`
  from {
    transform: translateY(10%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: ${FadeAni} 0.5s forwards;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;

const PetProfileContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: scroll;
`;

// ! 목욜, 금욜 투두
// ✅ 게시물 삭제
// 게시물 수정
// 프로필 사진 업로드 및 내용 수정
// redux로 리펙토링
// UI 수정 - 폰트, 색상, 쉐도우 등드으드으으
