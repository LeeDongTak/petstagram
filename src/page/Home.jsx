import React, { useEffect } from 'react';
import { app } from '../fireBase';
import styled from 'styled-components';
import MainBanner from '../components/MainBanner/MainBanner';

const HomeContainer = styled.div`
  width: 100%;
`;

function Home() {
  useEffect(() => {}, []);

  return (
    <HomeContainer>
      <MainBanner />
    </HomeContainer>
  );
}

export default Home;
