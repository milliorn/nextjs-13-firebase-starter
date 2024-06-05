import React from 'react';
import { Flex, List, ListItem, Card } from '@chakra-ui/react';

const SectionList= ({sections}:any) => {

  return (
    <>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <List>
          {sections.map((section : any) => (
            <ListItem key={section.id}>
              <Card>
                {section.name}
              </Card>
            </ListItem>
          ))}
        </List>  
      </Flex>    
    </>
  );
};

export default SectionList;