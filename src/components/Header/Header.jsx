import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const Logo = styled.div`
  width: fit-content;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.6rem;

  @media screen and (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem 3rem;
    gap: 0;
  }
`;

const MenuItem = styled.div`
  position: relative;
  width: fit-content;
  padding: 0.3rem 0;
  font-weight: 600;
  color: var(--primary-color);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  &::after {
    position: absolute;
    bottom: -6px;
    left: 0;
    content: '';
    width: 0%;
    height: 2px;
    background-color: var(--primary-color);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Button = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: 90px;
  height: fit-content;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid var(--primary-color)' : '1px solid white')};

  background-color: ${(props) => (props.$bgColor === 'Log in' ? 'transparent' : 'var(--primary-color)')};

  color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'white')};

  &:hover {
    background-color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'transparent')};
    color: ${(props) => (props.$bgColor === 'Log in' ? 'white' : 'var(--primary-color)')};
    border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid white' : '1px solid var(--primary-color)')};
  }
`;

const menu = ['Features', 'Pricing', 'Community', 'Support'];
const buttons = ['Log in', 'Register'];

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <h1>petstagram</h1>
      </Logo>
      <MenuContainer>
        {menu.map((menu) => (
          <MenuItem key={menu}>{menu}</MenuItem>
        ))}
      </MenuContainer>
      <ButtonContainer>
        {buttons.map((text) => (
          <Button key={text} $bgColor={text}>
            {text}
          </Button>
        ))}
      </ButtonContainer>
    </HeaderContainer>
  );
}
