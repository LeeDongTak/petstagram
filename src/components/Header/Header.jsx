import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tokenStorage from '../../util/storage';
import { useDispatch, useSelector } from 'react-redux';
import { remove_user } from '../../redux/modules/users';
import bcrypt, { hash } from 'bcryptjs';

// Styled-Components
const HeaderContainer = styled.div`
  width: 100%;
  padding: 1rem 21rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  @media screen and (max-width: 1400px) {
    padding: 1rem 4rem;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
  }
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

  // 768px 이하 반응형
  @media screen and (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem 1.65rem;
    gap: 1rem;
    background-color: #f6f6f6;
    z-index: 1;
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

  // 768px 이하 반응형
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

  // props에 따른 border, bg-color, color 변경
  border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid var(--primary-color)' : '1px solid white')};

  background-color: ${(props) => (props.$bgColor === 'Log in' ? 'transparent' : 'var(--primary-color)')};

  color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'white')};

  // hover 시 props에 따른 border, bg-color, color 변경
  &:hover {
    background-color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'transparent')};
    color: ${(props) => (props.$bgColor === 'Log in' ? 'white' : 'var(--primary-color)')};
    border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid white' : '1px solid var(--primary-color)')};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  background-color: #5b5b5b;
  color: white;
  cursor: pointer;
  position: relative;
`;

const UserName = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: larger;
`;

// Main Component
export default function Header() {
  // Redux States
  const reduxUser = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // 현재 로그인 유저 email, uid
  const curUserInfo = useRef('');

  // Navigate Hook
  const navi = useNavigate();

  // Token을 가졌나 안 가졌나 확인
  const [hasToken, setHasToken] = useState(false);

  // Styled-Components 반복 생성 시 사용하는 변수
  const menu = ['Features', 'Pricing', 'Community', 'Support'];
  const buttons = ['Log in', 'Register'];
  const loginedButton = ['Log Out'];

  // 초기 렌더 시 localStoragedp user데이터를 ref에 담아 로그인 유저 정보 유지
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      curUserInfo.current = JSON.parse(localStorage.getItem('user'));
      setHasToken(true);
    }
  }, [reduxUser]);
  console.log(curUserInfo);

  // 로그인 페이지로~
  const goLogin = (e) => {
    e.target.innerText === 'Log in' && navi('/login');
    e.target.innerText === 'Register' && navi('/signup');
  };

  // 로그아웃_localStorage의 정보를 비우고, 페이지를 새로고침 합니다.
  const logOut = () => {
    new tokenStorage().clearToken();
    setHasToken(false);
    localStorage.removeItem('user');
    dispatch(remove_user());
    navi('/', { replace: true });
  };

  // 마이페이지로~
  const goMyPage = () => {
    const compared = bcrypt.compareSync(curUserInfo.current.uid, '');
    navi(`/mypage/${compared}`);
  };

  // 홈으로~
  const goHome = () => {
    navi('/');
  };

  // user email을 받아와 반환합니다
  const returnUserName = () => {
    return curUserInfo.current.email;
  };

  // curUserEmail이 비어있지 않다면 Header의 UI가 나옵니다

  return (
    <HeaderContainer>
      <Logo onClick={() => goHome()}>
        <img width="100px" src="/assets/images/logo.png" alt="" />
      </Logo>
      <MenuContainer>
        {menu.map((menu) => (
          <MenuItem key={menu}>{menu}</MenuItem>
        ))}
      </MenuContainer>
      <ButtonContainer>
        {hasToken === true
          ? loginedButton.map((text, i) => (
              <UserContainer key={i}>
                <Button onClick={() => logOut()} key={text} $bgColor={text}>
                  {text}
                </Button>
                <UserIcon onClick={() => goMyPage()}>
                  <UserName>{returnUserName().charAt(0)}</UserName>
                </UserIcon>
              </UserContainer>
            ))
          : buttons.map((text) => (
              <Button onClick={(e) => goLogin(e)} key={text} $bgColor={text}>
                {text}
              </Button>
            ))}
      </ButtonContainer>
    </HeaderContainer>
  );
}
