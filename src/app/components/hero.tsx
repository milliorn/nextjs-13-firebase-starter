import React from 'react';

import { Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';


const Hero = () => {


    return (
        <>
          <Flex gap={5} height={"100%"}  flexDirection={'column'} justify="center" align={'center' }>
        <Stack  width={"70%"}>
          <Heading as='h1' size={['xl','4xl']} noOfLines={1} textAlign='center'>
            Crea el menu QR
          </Heading>
          <Heading as='h1' size={['xl','4xl']} noOfLines={1} textAlign='center'>
            para tu negocio
          </Heading>
          <Text textAlign={"center"} fontSize={['xl','4xl']} color={'grey'}>Suscribite por mes y manejalo vos mismo</Text>
        </Stack>
        <Flex gap={2}>
          <a href={'/restaurants'}>
            <Button size={'lg'} colorScheme='orange' variant='solid'>
              Crear menu
            </Button>
          </a>
          <a href={'/menus'}>
            <Button size={'lg'} colorScheme='orange' variant='outline'>
              Editar mi menu
            </Button>
          </a>
        </Flex>
        </Flex>  
        </>
    );
};

export default Hero;