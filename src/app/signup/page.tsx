'use client'
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import {Input, InputGroup } from '@chakra-ui/react'
import { Flex, Box, Heading, ButtonGroup, Button } from '@chakra-ui/react'

function Page(): JSX.Element {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const router = useRouter();

  // Handle form submission
  const handleForm = async ( event: { preventDefault: () => void } ) => {
    event.preventDefault();

    // Attempt to sign up with provided email and password
    const { result, error } = await signUp( email, password );

    if ( error ) {
      // Display and log any sign-up errors
      console.log( error );
      return;
    }

    // Sign up successful
    console.log( result );

    // Redirect to the admin page
    router.push( "/admin" );
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading mb={4}>Registrarse en MenuAt</Heading>
      <InputGroup>
        <Input               
          onChange={( e ) => setEmail( e.target.value )}
          type="text" placeholder="Corre electronico" />
      </InputGroup>
      <InputGroup mt={4}>
        <Input placeholder="Telefono" />
      </InputGroup>
      <InputGroup mt={4}>
        <Input 
          onChange={( e ) => setPassword( e.target.value )}
          type="password" placeholder="Contraseña" />
      </InputGroup>
      <InputGroup mt={4}>
        <Input type="password" placeholder="Confirmar contraseña" />
      </InputGroup>
      <ButtonGroup mt={8} spacing={4}>
        <Button onClick={handleForm} colorScheme='orange'>Registrarse</Button>
      </ButtonGroup>
    </Box>
  </Flex>
  );
}

export default Page;
