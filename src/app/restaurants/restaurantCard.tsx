import React from 'react';
import { CloseButton, Flex, Spacer, Box, Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { CloseIcon } from '@chakra-ui/icons';
const RestaurantCard = ({restaurant, openModalForEdit, deleteRestaurant}) => {
  const router = useRouter();

  const handleEdit = () => {
    openModalForEdit(restaurant.id) 
  }

  const handleMenu = () => {
    router.push( `/restaurant/${restaurant.id}/menus` );
  }

  const hanldeDeleteRestaurant = () => {
    deleteRestaurant(restaurant.id);
  }

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
              <Flex direction={'row'}>
                <Heading size='sm'>{restaurant.name}</Heading>
                <Spacer/>
                <CloseButton onClick={hanldeDeleteRestaurant} size="sm"/>
              </Flex>
                <Text size='xs'>
                  {restaurant.description}
                </Text> 
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button 
                  onClick={handleEdit}
                  variant='ghost' colorScheme='orange'>
                  Editar
                </Button>
                <Button 
                  onClick={handleMenu}
                  variant='ghost' colorScheme='orange'>
                  Menus
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
    </>
  );
};

export default RestaurantCard;
