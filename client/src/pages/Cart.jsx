import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${ mobile({ padding: "10px" }) }
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${ props => props.type === 'filled' ? 'none' : '1px solid gray' };
  background-color: ${ props => props.type === 'filled' ? 'black' : 'transparent' };
  color: ${ props => props.type === 'filled' && 'white' };
  transition: box-shadow 0.25s;

  &:hover{
    box-shadow:  ${ props => props.type === 'filled' ? '0 0 5px 2px rgba(0, 0, 0, .17)' : 'none' };
  }
`;
const TopTexts = styled.div`
  ${ mobile({ display: "none" }) }
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${ mobile({ flexDirection: "column" }) }

`;
const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: max-content;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${ mobile({ flexDirection: "column" }) }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${ props => props.color };
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${ mobile({ margin: "5px 15px" }) }
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${ mobile({ marginBottom: "20px" }) }
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${ props => props.type === 'total' && "500"};
  font-size: ${ props => props.type === 'total' && "24px"};

`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: box-shadow .25s;

  &:hover{
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .17);
  }
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  }

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: cart.total*100,
        });
        navigate('/success', 
        {
          state: res.data,
          products: cart, 
        });
        console.log(res.data);
      }catch(err){}
    }
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart, navigate])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your wishlist</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>

        </Top>
        <Bottom>

          <Info>
            {cart.products.map(product => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName><strong>Product:</strong> {product.title}</ProductName>
                    <ProductId><strong>ID:</strong> {product._id}</ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize><strong>Size:</strong> {product.size}</ProductSize>

                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout 
              name="Aura."
              image="https://avatars.githubusercontent.com/u/68453992?s=400&u=f961681e6d1ef85724c8bc0e5e228d1e88759318&v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total*100}
              token={onToken}
              stripeKey={KEY}
            > 
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart