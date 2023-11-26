import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RecommendGrid from '../RecommendGrid/RecommendGrid';

// STYLED-COMPONENTS
const RecommendSection = styled.div`
  width: 100%;
  padding: 3rem 9rem 3rem 15rem;

  @media screen and (max-width: 960px) {
    padding: 1.25rem;
  }
`;

const RecommendContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const RcommendSectionTitle = styled.h1`
  width: fit-content;
  height: 100%;
  font-weight: 600;
  font-size: 2rem;
  margin-block: 1rem;
  padding: 1rem;
  color: var(--primary-color);
  border-radius: 5px;
  background: #eeeeee;

  @media screen and (max-width: 960px) {
    margin: 2rem auto;
    padding-block: 0.5rem;
  }
`;

// MAIN COMPONENTS
export default function Recommend() {
  // Redux State
  const reduxData = useSelector((state) => state.posts);

  // Variables
  // - RecommendGrid 컴포넌트로 전달해줍니다.
  // - 데이터의 categoryCode 값에 따라 filter가 됩니다.
  // - (예. 산책 관련, 애견동반 관련)
  const filteredByWalk = reduxData[0]?.filter((post) => post.categoryCode === '0001');
  const filteredByPlace = reduxData[0]?.filter((post) => post.categoryCode === '0002');

  // UI 생성 시 필요한 데이터를 추가하기 위함 (사용 안 함)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'posts'));
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <RecommendSection>
      <RcommendSectionTitle>산책 추천 SPOT!</RcommendSectionTitle>
      <RecommendContainer $section={'산책'}>
        <RecommendGrid filteredData={filteredByWalk} />
      </RecommendContainer>
      <RcommendSectionTitle>애견 동반 SPOT!</RcommendSectionTitle>
      <RecommendContainer>
        <RecommendGrid filteredData={filteredByPlace} />
      </RecommendContainer>
    </RecommendSection>
  );
}
