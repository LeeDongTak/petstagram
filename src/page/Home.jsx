import React from 'react';
import { useNavigate } from 'react-router-dom';

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
