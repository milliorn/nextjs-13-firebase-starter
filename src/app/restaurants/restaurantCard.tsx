import React from 'react';
import { Box, Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
const RestaurantCard = ({restaurant}) => {
  return (
    <>
      <Box bg='' >
          <Card maxW='xs' margin={3}>
            <CardBody>
              {/* <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              /> */}
              <Stack spacing='1'>
                <Heading size='sm'>{restaurant.name}</Heading>
                <Text size='xs'>
                  {restaurant.description}
                </Text> 
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='ghost' colorScheme='orange'>
                  Editar
                </Button>
                <Button variant='ghost' colorScheme='orange'>
                  Menu
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
    </>
  );
};

export default RestaurantCard;