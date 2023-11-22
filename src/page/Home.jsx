import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* 로그인 페이지 완료후 mypage/${uid}로 바꾸기 */}
      <button onClick={() => navigate(`mypage/66323nGIDZcMPPtJcin5JpQf7M02`)}>로그인</button>
    </>
  );
}

export default Home;
