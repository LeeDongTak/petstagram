import React from 'react';
import styled from 'styled-components';

function OwnerProfile() {
  return (
    <ProfileContainer>
      <OwnerProfileContainer>
        <img
          src="https://images.unsplash.com/photo-1557053908-4793c484d06f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <OwnerInfo>
          <h3>유저이름</h3>
          <p>
            강아지 2마리와 고양이 1마리와 살아요.강아지 2마리와 고양이 1마리와 살아요.강아지 2마리와 고양이 1마리와
            살아요.
          </p>
        </OwnerInfo>
      </OwnerProfileContainer>

      <InterestedInWrapper>
        <h3>관심사</h3>
        <InterestedIn>
          <span>#간식</span>
          <span>#산책</span>
        </InterestedIn>
      </InterestedInWrapper>
    </ProfileContainer>
  );
}

export default OwnerProfile;

// STYLED-COMPONENTS
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-right: 1px solid #c6c6c6;
  width: 300px;
  padding: 55px;
  gap: 30px;
  border-right: 1px solid #ffb4a9;
  width: 55%;
  padding: 4rem 1.25rem 0 1.25rem;
  gap: 2rem;

  & button {
    padding: 10px 0;
    border: 1px solid #ff5036;
    background-color: #ff5036;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ffb4a9;
    padding: 1.25rem;
  }
`;

const OwnerProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & img {
    width: 200px;
    height: 200px;
    border-radius: 150px;
    margin-bottom: 8px;
    object-fit: cover;
  }
`;

const OwnerInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  gap: 10px;
  word-wrap: break-word;

  & h3 {
    font-size: 18px;
    font-weight: bold;
  }

  & p {
    background-color: #eee;
    width: 300px;
    height: fit-content;
    max-height: 90px;
    overflow-y: scroll;
    font-size: 14px;
    padding: 1rem;
    border-radius: 9px;
    line-height: 1.3rem;
  }
`;

const InterestedInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & h3 {
    font-weight: bold;
  }
`;

const InterestedIn = styled.div`
  display: flex;
  gap: 10px;

  & span {
    color: #ff5036;
    border: 1px solid #ff5036;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bolder;
    border-radius: 50px;
  }
`;
