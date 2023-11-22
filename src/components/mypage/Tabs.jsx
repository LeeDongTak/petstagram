import React, { useState } from 'react';
import styled, { css } from 'styled-components';

function Tabs({ onClickTab, activeTab }) {
  return (
    <TabContainer onClick={onClickTab}>
      <TabList $activeTab={activeTab}>프로필</TabList>
      <TabList $activeTab={activeTab}>내 게시글</TabList>
    </TabContainer>
  );
}

export default Tabs;

const TabContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 120px;
  color: #ff5036;
`;

const TabList = styled.li`
  ${(props) => {
    if (props.$activeTab === props.children) {
      return css`
        font-weight: 700;
        border-bottom: 2px solid #ff5036;
      `;
    }
  }}

  padding: 5px 10px;
  cursor: pointer;
`;
