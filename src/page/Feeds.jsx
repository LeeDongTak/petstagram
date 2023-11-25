import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { FadeAni } from './MyPage';
import { fetchData } from '../fireBase';
import { addPost } from '../redux/modules/posts';
import parse from 'html-react-parser';

// 이미지를 따로 가져올 수 있는가

const FeedContainer = styled.div`
  width: 100%;
  padding: 0 18rem;
  @media screen and (max-width: 1400px) {
    padding: 0 7rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  animation: ${FadeAni} 0.5s forwards;
`;

const FeedButtonBox = styled.div`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  width: 80px;
  padding: 0.6rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        font-weight: 600;
        border-bottom: 2px solid black;
      `;
    }
  }}
`;

const GridSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PostCard = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostImg = styled.div`
  width: 100%;
  display: block;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 200px;
  padding: 1rem;
  background-image: ${(props) => `url(${props.$img})`};
  background-position: center;
  background-size: cover;
`;

const PostContentSection = styled.div`
  width: 100%;
  height: 100px;
  overflow: scroll;
  padding: 1rem;
`;

const PostTitle = styled.h3`
  width: 100%;
  margin-block: 0.5rem;
  font-size: 1.25rem;
`;

const PostContent = styled.div`
  width: 100%;
  overflow-y: hidden;
  word-break: break-all;
  margin-block: 0.5rem;
`;

const PostDate = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #7d7d7d50;
  padding: 1rem;
`;

const UserInfo = styled.h5`
  width: fit-content;
`;

const LikeIcon = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Feeds() {
  const buttons = ['트렌드', '최신'];
  const [currentTarget, setCurrentTarget] = useState('트렌드');

  const reduxData = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData().then((data) => dispatch(addPost(data)));
  }, []);

  const handleCurrent = (e) => {
    setCurrentTarget(e.target.innerText);
  };
  console.log(reduxData);

  return (
    <FeedContainer>
      <FeedButtonBox>
        {buttons.map((el, i) => (
          <FilterButton key={i} onClick={handleCurrent} $current={currentTarget}>
            {el}
          </FilterButton>
        ))}
      </FeedButtonBox>
      <GridSection>
        {reduxData[0]?.map((post, i) => {
          return (
            <PostCard key={i}>
              <div>
                {post.img === null ? null : <PostImg $img={'https://placehold.co/400'}></PostImg>}
                <PostContentSection>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{parse(post.content)}</PostContent>
                </PostContentSection>
                <PostDate>2023년 11월 25일 － 7개의 댓글</PostDate>
              </div>

              <PostInfo>
                <UserInfo>유저이미지 by 유저 아이디</UserInfo>
                <LikeIcon>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>48</p>
                </LikeIcon>
              </PostInfo>
            </PostCard>
          );
        })}
      </GridSection>
    </FeedContainer>
  );
}
