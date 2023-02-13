import styled from 'styled-components';
import { categories } from '../data';
import CategoriyItem from './CategoriyItem';

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Container>
      { categories.map(item =>(
        <CategoriyItem item={ item } />
      )) }
    </Container>
  )
}

export default Categories