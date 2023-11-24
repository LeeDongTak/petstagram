
import React from 'react';
import { useParams } from 'react-router-dom';
import ContentsViewer from './Viewer';
import styled from 'styled-components';

const Container = styled.div`
/* 에디터 부분 전부 감싸는 박스 */
  padding: 10px;
  margin: auto;
  margin-top: 30px;
  width: 500px;
  height: 700px;
  text-align: center;
  border: 2px solid #FF2E00;
  `

function PostDetail() {
  const { postId } = useParams();

  console.log(postId)


  return (
    <Container>
      <h2>게시글 상세 내용</h2>

      <ContentsViewer postId={postId} />
    </Container>
  );
}

export default PostDetail