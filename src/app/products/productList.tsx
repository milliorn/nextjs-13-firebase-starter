import React from 'react';
import { Flex, UnorderedList, ListItem } from '@chakra-ui/react';

const ProductList = ({products}:any) => {
  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <UnorderedList>
          {products.map((product : any) => (
            <ListItem key={product.id}>
              {product.name}
            </ListItem>
          ))}
        </UnorderedList>  
      </Flex>    
    </>
  );
};

export default ProductList;