import React from 'react';
import { Flex, UnorderedList, ListItem } from '@chakra-ui/react';

const ProductList: React.FC = () => {
  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <UnorderedList>
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </UnorderedList>  
      </Flex>    
    </>
  );
};

export default ProductList;