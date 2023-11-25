import React from 'react';
import styled from 'styled-components';

function PetProfile() {
  return (
    <PetProfileContainer>
      <PetImageContainer>
        <img
          src="https://images.unsplash.com/photo-1530041539828-114de669390e?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <PetNameAgeGender>호두 / 3세 / 암컷</PetNameAgeGender>
      </PetImageContainer>

      <PetInfo>
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

const PetProfileContainer = styled.div`
  border: 1px solid #c6c6c6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 25px;
  width: 800px;
  border-radius: 10px;

  & img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const PetImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PetNameAgeGender = styled.h3`
  font-size: 15px;
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
