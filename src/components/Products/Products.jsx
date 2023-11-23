import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductSection = styled.div`
  width: 100%;
  background-color: #eee;
`;

const ProductContainer = styled.div`
  padding: 1.5rem 15rem;
  @media screen and (max-width: 960px) {
    padding: 1.5rem 2rem;
  }
`;

const ProductTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  width: fit-content;
  font-size: 2rem;
`;

const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  margin-block: 2.25rem;
  row-gap: 2.25rem;
  column-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    height: 500px;
    overflow-y: scroll;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProductItemContainer = styled.div`
  width: fit-content;
  padding: 1rem;
  border-radius: 9px;
  background-color: white;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.02);
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ProductItemImg = styled.div`
  width: 250px;
  height: 250px;
  background-image: url('https://placehold.co/200');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 9px;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.65rem;
`;

const ItemPrice = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 600;
`;

const ToShop = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: fit-content;
  height: fit-content;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    color: var(--primary-color);
    outline: none;
    border: none;
  }
`;

export default function Products() {
  // Hook
  const navi = useNavigate();

  // 컴포넌트 반복생성을 위한 임의의 배열
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  // FUNCTIONS
  const goShop = () => {
    navi('/shop');
    window.scrollTo({ top: true });
  };
  return (
    <>
      <ProductSection>
        <ProductContainer>
          <ProductTitle>
            Products
            <ToShop onClick={() => goShop()}>제품 더 보기</ToShop>
          </ProductTitle>
          <ProductGrid>
            {arr.map((el, i) => {
              return (
                <ProductItemContainer key={i}>
                  <ProductItemImg />
                  <ItemTitle>{`제품 ${el}`}</ItemTitle>
                  <ItemPrice>20,000 ￦</ItemPrice>
                </ProductItemContainer>
              );
            })}
          </ProductGrid>
        </ProductContainer>
      </ProductSection>
    </>
  );
}
