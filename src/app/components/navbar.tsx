'use client'
import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import 'firebase/auth'
import { useAuthContext } from '@/context/AuthContext';

const Navbar = () => {
  const context = useAuthContext();
  const user = (context as any).user;
  console.log("user",user)


    const logout = async () => {
      console.log("logout")
      await user.signOut()
    }

    return (

        <div>
        <Flex alignItems='center' gap='1' margin={5}>
          <Box p='2'>
            <Heading size='md'>GoMenu</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap='1'>
          { (!user) ?
          <>
            <a href={'/singup'}>
              <Button  colorScheme='orange' variant='solid'>
                Registrarse
              </Button> 
            </a>
            <a href={'/login'}>
              <Button  colorScheme='orange' variant='outline'>Ingresar</Button>
             </a>
            </>
          : 
          <Button  onClick={logout} colorScheme='orange' variant='outline'>Salir</Button>
          }
          
          </ButtonGroup>
        </Flex>
        </div>
    );
};

export default Navbar;