import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <Footerstyle>
      <div>
        <Logo src="/assets/img/logo.png" alt="logo" />
        <p>주식회사 펫스타그램</p>
        <ul>
          <li>서울 서대문구 연희동</li>
          <li>사업자등록번호: 123-45-00123</li>
          <li>통신판매업신고: 2023-서울마포-12345</li>
          <li>대표: B5조 | 개인정보책임자: B5조 </li>
          <li>TEL: 1500-1234 | Email:hello@petstagram.co</li>
        </ul>
      </div>
    </Footerstyle>
  );
}

// 로고
const Logo = styled.img`
  width: 150px;
  margin-left: -8px;
`;
export default Footer;

//푸터
const Footerstyle = styled.footer`
  width: 100%;
  border-top: 1px solid #c4c4c4;
  padding: 0.9rem 1rem;
  color: #808080;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.1rem;
`;
