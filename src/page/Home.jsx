import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import MainBanner from '../components/MainBanner/MainBanner';
import Recommend from '../components/Recommend/Recommend';

const HomeContainer = styled.div`
  width: 100%;
`;

function Home() {
  useEffect(() => {}, []);

  return (
    <HomeContainer>
      <MainBanner />
      <Recommend />
    </HomeContainer>
  );
}

export default Home;
