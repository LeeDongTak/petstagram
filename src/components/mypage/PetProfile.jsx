import React from 'react';
import styled from 'styled-components';

function PetProfile() {
  return (
    <PetProfileContainer>
      <img
        src="https://images.unsplash.com/photo-1530041539828-114de669390e?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />

      <PetInfo>
        <PetNameAgeGender>호두 / 3세 / 암컷</PetNameAgeGender>
        <PetIntro>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis ipsam esse, deleniti est totam maxime enim
          quae porro, sed eos sapiente. Alias voluptatem sequi ratione! Architecto amet atque itaque id?
        </PetIntro>
        <PetLike>좋아하는 것: 산책, 간식</PetLike>
        <PetUnlike>싫어하는 것: 가만히 있기, 배고픔</PetUnlike>
        <PetCharaterastic>성격: 활발</PetCharaterastic>
      </PetInfo>
    </PetProfileContainer>
  );
}

export default PetProfile;

// STYLED-COMPONENTS
const PetProfileContainer = styled.div`
  border: 1px solid #000;
  display: flex;
  margin: auto;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 900px;
  border-radius: 10px;
  border: 1px solid black;

  & img {
    width: 120px;
    height: 135px;
    border-radius: 50%;
    flex-basis: 20%;
  }
  @media screen and (max-width: 768px) {
    padding: 0.25rem 0.65rem;
  }
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 1rem;
`;

const PetNameAgeGender = styled.h3`
  font-size: 18px;
  font-weight: bolder;
`;

const PetIntro = styled.p`
  font-size: 18px;
`;

const PetLike = styled.p`
  font-size: 14px;
`;

const PetUnlike = styled.p`
  font-size: 14px;
`;

const PetCharaterastic = styled.p`
  font-size: 14px;
`;
