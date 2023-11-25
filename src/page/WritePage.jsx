import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../fireBase';
import EditorBox from './Editor';
import { Link } from 'react-router-dom';

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

// Main Comp
export default function WritePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await fetchData();
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <EditorBox></EditorBox>
    </div>
  );
}
