import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { FadeAni } from './MyPage';

function Shop() {
  const navi = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/data/products.json').then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);
  console.log(products);

  return (
    <Wrap>
      <Title>STORE</Title>
      <ShopWrap>
        {products.map((product) => (
          <div key={product.id}>
            <div>
              <ProductImage src={product.image} alt={product.name} />
            </div>
            <ProductTitle>{product.name}</ProductTitle>
            <PriceWrap>
              <Price>{product.price}</Price>
              <PriceRate>{product.discountRate}</PriceRate>
            </PriceWrap>
            <RegularPrice>{product.RatePrice}</RegularPrice>
          </div>
        ))}
      </ShopWrap>
      <Footer />
    </Wrap>
  );
}

//---------------------------------
//스타일

//전체랩
const Wrap = styled.div`
  padding: 10px;
  margin-top: 10px;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${FadeAni} 0.4s forwards;
`;

//타이틀
const Title = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 40px;
  font-weight: bold;
  color: #ff5036;
`;

//프로덕트 랩
const ShopWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 30px;
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 90%;
    padding: 10px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

//프로덕트 이미지
const ProductImage = styled.img`
  max-width: 100%; /* 이미지가 컨테이너를 벗어나지 않도록 설정 */
  height: auto;
  border-radius: 20px;
`;

//프로덕트 이름
const ProductTitle = styled.div`
  padding: 0 10px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  height: 30px;
  line-height: 1.13;
`;

//가격 랩
const PriceWrap = styled.div`
  display: flex;
  space-between: 10px;
`;

//할인 가격
const Price = styled.div`
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
  margin: 4px 0px 0px;
`;
//할인율
const PriceRate = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff5036;
  margin: 2px 0px 0px -5px;
`;
//정상가
const RegularPrice = styled.div`
  color: #aaa;
  text-decoration: line-through;
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.5;
`;

export default Shop;
