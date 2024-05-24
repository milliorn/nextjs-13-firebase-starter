import React from 'react';
import { Flex, List, ListItem, Card } from '@chakra-ui/react';

const SectionList= () => {

  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <List>
          <ListItem>
          <Card>
          Lorem ipsum dolor sit amet
          </Card>
            </ListItem>
          <ListItem>Consectetur adipiscing elit</ListItem>
          <ListItem>Integer molestie lorem at massa</ListItem>
          <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </List>  
      </Flex>    
    </>
  );
};

export default SectionList;