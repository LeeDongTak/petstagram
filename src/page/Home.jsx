import React, { useEffect, useState } from 'react';
import GlobalStyle from '../styled/GlobalStyle';
import EditorBox from './Editor';
import { fetchData } from '../fireBase';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostList = styled.div`
  padding: 10px;
  margin: auto;
  margin-top: 150px;
  max-width: 700px;
  border: 2px solid #ff2e00;
  border-radius: 5px;
  h1 {
    text-align: center;
  }
  ul {
    list-style: none;
    padding: 0px;
  }
  li {
    margin-bottom: 10px;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    border-radius: 5px;
  }
  li a {
    text-decoration: none;
  }
  li a:hover {
    color: #ff2e00;
  }
  span {
    padding-right: 10px;
    font-weight: 1000;
  }
`;

import React from 'react';
import styled from 'styled-components';
import MainBanner from '../components/MainBanner/MainBanner';
import Recommend from '../components/Recommend/Recommend';
import Products from '../components/Products/Products';
import { FadeAni } from './MyPage';

const HomeContainer = styled.div`
  width: 100%;
  animation: ${FadeAni} 0.5s forwards;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await fetchData();
      setPosts(postsData);
    };

    fetchPosts();
  }, [posts]);
  return (
    //   <div >
    //     <PostList>
    //   <h1>게시글 목록</h1>
    //   <ul>
    //     {posts.map((post,i) => (

    //       <li  key={post.id}>
    //         <span>{i+1}.</span>
    //         <Link to={`/post/${post.id}`}>
    //           {post.title} </Link>
    //       </li>
    //     ))}
    //   </ul>
    //   </PostList>
    //     <EditorBox></EditorBox>

    //   </div>
    // )
    <HomeContainer>
      <MainBanner />
      <Recommend />
      <Products />
    </HomeContainer>
  );
}

export default Home;
