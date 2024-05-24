'use client'
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import 'firebase/auth'

const Navbar = () => {

    const logout = async () => {
      console.log("logout")
      //await auth.signOut()
    }

    return (

        <div>
        <Flex alignItems='center' gap='1' margin={5}>
          <Box p='2'>
            <Heading size='md'>GoMenu</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap='1'>
          { (!true) ?
            <a href={'/singup'}>
              <Button  colorScheme='orange' variant='solid'>
              Registrarse
            </Button> 
          </a> : null }
          <a href={'/login'}>
            { (false) ? 
              <Button  onClick={logout} colorScheme='orange' variant='outline'>Salir</Button> : 
              <Button  colorScheme='orange' variant='outline'>Ingresar</Button>
            }
          </a>
          </ButtonGroup>
        </Flex>
        </div>
    );
};

export default Navbar;