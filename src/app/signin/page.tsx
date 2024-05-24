'use client'
import signIn from "@/firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import {Grid, GridItem, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import { Flex, Spacer, Box, Heading, ButtonGroup, Button, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from "@chakra-ui/next-js";

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const router = useRouter();

  // Handle form submission
  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn( email, password );

    if ( error ) {
      // Display and log any sign-in errors
      console.log( error );
      return;
    }

    // Sign in successful
    console.log( result );

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or 
    // create a new page for admin
    router.push( "/admin" );
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={4}>Ingresar en MenuAt</Heading>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input 
            onChange={( e ) => setEmail( e.target.value )}
            type="text" placeholder="Corre electronico" />
      </InputGroup>
      <InputGroup mt={4}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input 
            onChange={( e ) => setPassword( e.target.value )}
            type="password" placeholder="Contraseña" />
      </InputGroup>
      <ButtonGroup mt={8} spacing={4}>
        <Button onClick={handleForm} colorScheme='orange'>Ingresar</Button>
        <Button colorScheme='orange' variant='outline'>Te olvidaste la contraseña?</Button>
      </ButtonGroup>
      <Text mt={4} textAlign="center">
        Nuevo en givemethemenu? <Link href="/" color="blue.500">Crear cuenta</Link>
      </Text>
    </Box>
  </Flex>
  );
}

export default Page;
