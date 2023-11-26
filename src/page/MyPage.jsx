import React, { useState } from 'react';
import Tabs from '../components/mypage/Tabs';
import OwnerProfile from '../components/mypage/OwnerProfile';
import PetProfile from '../components/mypage/PetProfile';
import MyPosts from '../components/mypage/MyPosts';
import { useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../fireBase';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import authStorage from '../util/authUser';

function MyPage() {
  // localStorage의 사용자 email, UID를 가져오는 것
  const authHandler = new authStorage();

  // URL 파라미터
  const { id } = useParams();

  const navi = useNavigate();

  // STATES
  const [post, setPost] = useState([]);
  const [userName, setUserName] = useState('');
  const [pets, setPets] = useState([]);

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
        setPost(initialPosts?.filter((el) => el.uid === id));
        console.log(initialPosts); // [{}, {}, {}, {}]
      } catch (err) {
        console.log(err);
      }
    };
    const user = async () => {
      try {
        const q = query(collection(db, 'myPet'));
        const querySnapshot = await getDocs(q);
        const initialPets = [];
        querySnapshot.forEach((pet) => {
          const data = { id: pet.id, ...pet.data() };
          initialPets.push(data);
        });
        let resultPet = initialPets?.filter((el) => el.masterId === id)

        console.log(initialPets)
        setPets(resultPet);
      } catch (error) {
        console.log(error);
      }
    };
    user();
    fetchData();
  }, []);
console.log(pets)
  // 현재 사용자의 게시물 필터
  const filteredData = post.filter((post) => post.uid === id);

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

      {activeTab === '프로필' ? (
        <ProfileContainer>
          <OwnerProfile></OwnerProfile>
          <PetProfileContainer>
            {pets.map((item) => {
              return <PetProfile key={item.id} petData={item}></PetProfile>;
            })}
          </PetProfileContainer>
        </ProfileContainer>
      ) : (
        filteredData.map((item) => {
          return (
            <MyPosts
              key={item.id}
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

const MyPageContainer = styled.div`
  font-size: 1.25rem;
  width: 100%;
  max-width: 1800px;
  height: 100%;
  padding: 1rem 21rem 9rem 21rem;
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
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 9px;
`;
