import React, { useEffect, useState } from 'react'
import GlobalStyle from '../styled/GlobalStyle';
import EditorBox from './Editor'
import { fetchData } from '../fireBase';
import { Link } from 'react-router-dom';



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

    <div >
      <EditorBox></EditorBox>

      <h1>게시글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home