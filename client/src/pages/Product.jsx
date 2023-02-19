import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${ mobile({ padding: "10px", flexDirection: "column" }) }

`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${ mobile({ height: "60vh" }) }
`;
const InfoContainer = styled.div`
  margin-top: 20px;
  flex: 1;
  padding: 0 50px;
  ${ mobile({ padding: "10px" }) }
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${ mobile({ width: "100%" }) }

`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${ props => props.color };
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid gray;
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${ mobile({ width: "100%" }) }
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  `;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  
  &:hover{
    background-color: #f8f4f4;
  }
`;
const FilterSizeOption = styled.option``;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await publicRequest.get('/products/find/'+id)
        setProduct(res.data);
      }catch(err){}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if(type === 'dec'){
      quantity > 1 && setQuantity(quantity-1);
    }else if(type === 'inc'){
      setQuantity(quantity+1);
    }
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map(e => (
                <FilterColor color={e} key={e} onClick={e => setColor(e)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={e => setSize(e.target.value)}>
                {product.size?.map(s => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button>ADD TO CARD</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Product