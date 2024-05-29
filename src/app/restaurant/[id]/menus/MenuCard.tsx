import React from 'react';
import { Box, Card, CardBody, Stack, Heading, Text, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
const MenuCard = ({menu}:any) => {
  const router = useRouter();

  const handleEdit = () => {
    console.log('Edit');
  }

  const handleMenu = () => {
    console.log('Menu');
    router.push( "/menu" );
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
                <Heading size='sm'>{menu.name}</Heading>
                <Text size='xs'>
                  {menu.description}
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
                  asd
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
    </>
  );
};

export default MenuCard;