<<<<<<< HEAD
import React, { useEffect } from 'react';
import { app } from '../fireBase';
=======
import React from 'react';
>>>>>>> 3d1ccb52d517f797c4d4f3b366eaea73576180eb
import styled from 'styled-components';
import { useEffect } from 'react';
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
  return (
    <HomeContainer>
      <MainBanner />
      <Recommend />
      <Products />
    </HomeContainer>
  );
}

export default Home;
